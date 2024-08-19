import ProfileDetails from "@/app/(dashboard)/(routes)/profile/components/ProfileDetails";
import UserResumes from "@/app/(dashboard)/(routes)/profile/components/UserResumes";
import UserAppliedJobs from "@/app/(dashboard)/(routes)/profile/components/UserAppliedJobs";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import prismaDB from "@/lib/prismaDB";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";

export default async function ProfilePage() {
    const {userId} = auth()

    if (!userId) return redirect("/")

    let profile = await prismaDB.userProfile.findUnique({
        where: {
            userId
        }
    })

    return (
        <div className="w-full h-full bg-white space-y-8 sm:space-y-11 lg:space-y-14">
            <CustomBreadCrumb breadCrumbPage="My Profile"/>
            <ProfileDetails userId={userId} initialData={profile}/>
            <UserResumes userId={userId} initialData={profile}/>
            <UserAppliedJobs/>
        </div>
    );
}
