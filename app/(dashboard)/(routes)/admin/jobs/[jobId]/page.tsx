import {redirect} from "next/navigation";
import {auth} from "@clerk/nextjs/server";
import prismaDB from "@/lib/prismaDB";
import {Button} from "@/components/ui/button";
import {ArrowLeft, Trash2Icon} from "lucide-react";
import JobPublishActions from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/components/JobPublishActions";

export default async function JobDetailsPage({params}: { params: { jobId: string } }) {
    // ** Verify the mongoDB ID
    const validateObjectIdRegex = /^[0-9a-fA-F]{24}$/
    if(!validateObjectIdRegex.test(params.jobId)) {
        return redirect("/admin/jobs")
    }

    const {userId} = auth()

    if(!userId) return redirect("/")

    const job = await prismaDB.job.findUnique({
        where: {
            id: params.jobId,
            userId
        }
    })

    if(!job) return redirect("/admin/jobs")

    const requiredFields = [
        job?.title, job?.description, job?.imageURL
    ]

    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length
    const completionText = `(${completedFields}/${totalFields})`
    const isComplete = requiredFields.every(Boolean)

    return (
        <div>
            <div className="flex items-center gap-x-4 text-neutral-500 text-sm mb-4">
                <ArrowLeft className="size-4" />
                <p className="font-semibold">Back</p>
            </div>

            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="font-semibold text-2xl">Job Setup</h1>
                    <p className="font-medium text-sm text-neutral-500">Complete all fields {completionText}</p>
                </div>

                <JobPublishActions
                    jobId={params.jobId}
                    isPublished={job.isPublished}
                    disabled={!isComplete}
                />
            </div>
        </div>
    );
}
