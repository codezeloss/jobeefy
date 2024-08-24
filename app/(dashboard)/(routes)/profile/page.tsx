import ProfileDetails from "@/app/(dashboard)/(routes)/profile/components/ProfileDetails";
import UserResumes from "@/app/(dashboard)/(routes)/profile/components/UserResumes";
import UserAppliedJobs from "@/app/(dashboard)/(routes)/profile/components/UserAppliedJobs";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import prismaDB from "@/lib/prismaDB";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {format} from "date-fns";
import {AppliedJobs} from "@/app/(dashboard)/(routes)/profile/components/AppliedJobsColumns";
import FollowedCompanies from "@/app/(dashboard)/(routes)/profile/components/FollowedCompanies";

export default async function ProfilePage() {
    const {userId} = auth()

    if (!userId) return redirect("/")

    let profile = await prismaDB.userProfile.findUnique({
        where: {
            userId
        },
        include: {
            appliedJobs: true
        }
    })

    const jobs = await prismaDB.job.findMany({
        where: {
            userId
        },
        include: {
            company: true,
            category: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const filteredAppliedJobs = profile && profile?.appliedJobs.length > 0 ?
        jobs.filter(job => profile.appliedJobs.some(appliedJob => appliedJob.jobId === job.id)).map((job) => ({
            ...job,
            appliedAt: profile.appliedJobs.find(appliedJob => appliedJob.jobId === job.id)?.appliedAt
        })) : []


    const formattedJobsData: AppliedJobs[] = filteredAppliedJobs.map(job => ({
        id: job.id,
        title: job.title,
        company: job.company ? job.company.name : "",
        category: job.category ? job.category.name : "",
        appliedAt: job.appliedAt ? format(new Date(job.appliedAt), "MMMM do, yyyy") : "--/--/----",
    }))

    const followedCompanies = await prismaDB.company.findMany({
        where: {
            followers: {
                has: userId
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div className="w-full h-full bg-white space-y-6 sm:space-y-8 lg:space-y-11">
            <CustomBreadCrumb breadCrumbPage="My Profile"/>

            <ProfileDetails userId={userId} initialData={profile}/>
            <UserResumes userId={userId} initialData={profile}/>
            <UserAppliedJobs data={formattedJobsData}/>
            <FollowedCompanies data={followedCompanies}/>
        </div>
    );
}
