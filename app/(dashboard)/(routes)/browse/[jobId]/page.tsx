import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import {redirect} from "next/navigation";
import prismaDB from "@/lib/prismaDB";
import JobDetailContent from "@/app/(dashboard)/(routes)/browse/[jobId]/components/JobDetailContent";
import {auth} from "@clerk/nextjs/server";

export default async function JobDetailsPage({params}: { params: { jobId: string } }) {
    const {userId} = auth()

    // ** Verify the mongoDB ID
    const validateObjectIdRegex = /^[0-9a-fA-F]{24}$/

    const job = await prismaDB.job.findUnique({
        where: {
            id: params.jobId,
        },
        include: {
            company: true
        }
    })

    if (!validateObjectIdRegex.test(params.jobId) || !job || !userId) return redirect("/browse")

    return (
        <div className="w-full h-full bg-white">
            <CustomBreadCrumb breadCrumbPage={job.title} breadCrumbItems={[{label: "Search", link: "/browse"}]}/>

            <div className="py-6">
                <JobDetailContent job={job} userId={userId}/>
            </div>
        </div>
    );
}
