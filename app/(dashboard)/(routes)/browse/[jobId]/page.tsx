import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import {redirect} from "next/navigation";
import prismaDB from "@/lib/prismaDB";
import JobDetailContent from "@/app/(dashboard)/(routes)/browse/[jobId]/components/JobDetailContent";
import {auth} from "@clerk/nextjs/server";
import {Separator} from "@/components/ui/separator";
import RelatedJobs from "@/app/(dashboard)/(routes)/browse/[jobId]/components/RelatedJobs";
import {getJobs} from "@/actions/getJobs";

export default async function JobDetailsPage({params}: { params: { jobId: string } }) {
    const {userId} = auth()
    const {jobId} = params

    // ** Verify the mongoDB ID
    const validateObjectIdRegex = /^[0-9a-fA-F]{24}$/

    if (!userId) redirect("/sign-in")

    const job = await prismaDB.job.findUnique({
        where: {
            id: jobId,
        },
        include: {
            company: true
        }
    })

    const profile = await prismaDB.userProfile.findUnique({
        where: {
            userId: userId as string,
        },
        include: {
            appliedJobs: true
        }
    })

    if (!validateObjectIdRegex.test(jobId) || !job || !profile) return redirect("/browse")

    const jobs = await getJobs({})

    const filteredJobs = jobs.filter(j => j.id !== job?.id && j.categoryId === job?.categoryId)

    return (
        <div className="w-full h-full bg-white">
            <CustomBreadCrumb breadCrumbPage={job.title} breadCrumbItems={[{label: "Search", link: "/browse"}]}/>

            <div className="py-6 space-y-8">
                <JobDetailContent job={job} jobId={jobId} userProfile={profile}/>
                <Separator/>
                {filteredJobs.length > 0 && <RelatedJobs filteredJobs={filteredJobs}/>}
            </div>
        </div>
    );
}
