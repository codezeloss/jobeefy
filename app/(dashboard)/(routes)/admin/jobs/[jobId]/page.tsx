import {redirect} from "next/navigation";
import {auth} from "@clerk/nextjs/server";
import prismaDB from "@/lib/prismaDB";
import {ArrowLeft, Building2Icon, LayoutDashboard, ListChecks, LucidePaperclip} from "lucide-react";
import JobPublishActions from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/components/JobPublishActions";
import AlertBanner from "@/components/AlertBanner";
import JobDetailTile from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/components/JobDetailTile";
import React from "react";
import JobTitleForm from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/components/JobTitleForm";
import JobCategoryForm from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/components/JobCategoryForm";
import JobCoverImageForm from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/components/JobCoverImageForm";
import JobShortDescriptionForm from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/components/JobShortDescriptionForm";
import JobShiftTimingModeForm from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/components/JobShiftTimingModeForm";
import JobHourlyRateForm from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/components/JobHourlyRateForm";
import JobModeForm from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/components/JobModeForm";
import JobWorkExperienceForm from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/components/JobWorkExperienceForm";
import JobDescriptionForm from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/components/JobDescriptionForm";
import JobTagsForm from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/components/JobTagsForm";
import Link from "next/link";
import JobCompanyForm from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/components/JobCompanyForm";
import JobAttachmentsForm from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/components/JobAttachmentsForm";


export default async function JobDetailsPage({params}: { params: { jobId: string } }) {
    // ** Verify the mongoDB ID
    const validateObjectIdRegex = /^[0-9a-fA-F]{24}$/
    if (!validateObjectIdRegex.test(params.jobId)) {
        return redirect("/admin/jobs")
    }

    const {userId} = auth()

    if (!userId) return redirect("/browse")

    const job = await prismaDB.job.findUnique({
        where: {
            id: params.jobId,
            userId
        }
    })

    const categories = await prismaDB.category.findMany({
        orderBy: {name: "asc"}
    })

    const companies = await prismaDB.company.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    if (!job) return redirect("/admin/jobs")

    const requiredFields = [
        job?.title, job?.description, job?.imageURL, job?.categoryId
    ]

    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length
    const completionText = `(${completedFields}/${totalFields})`
    const isComplete = requiredFields.every(Boolean)

    return (
        <div>
            <Link href="/admin/jobs">
                <div className="flex items-center gap-x-4 text-neutral-500 text-sm mb-5 cursor-pointer">
                    <ArrowLeft className="size-4"/>
                    <p className="font-semibold">Back</p>
                </div>
            </Link>

            <div className="w-full flex items-center justify-between mb-4">
                <div className="flex flex-col gap-y-2">
                    <h1 className="font-semibold text-2xl">Job Setup</h1>
                    <p className="font-medium text-sm text-neutral-500">Complete all fields {completionText}</p>
                </div>

                <JobPublishActions
                    job={job}
                    jobId={params.jobId}
                    isPublished={job.isPublished}
                    disabled={!isComplete}
                />
            </div>

            {!job.isPublished &&
                <AlertBanner
                    variant="destructive"
                    title="Warning"
                    description="This job in unpublished. It will not be visible in the jobs list."
                />
            }

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16">
                <div className="space-y-6">
                    <JobDetailTile
                        title="Customize your Job"
                        icon={LayoutDashboard}
                    />
                    <JobTitleForm initialData={job} jobId={job.id}/>
                    <JobCategoryForm
                        options={categories.map(category => ({
                            label: category.name,
                            value: category.id
                        }))}
                        initialData={job}
                        jobId={job.id}
                    />
                    <JobCoverImageForm initialData={job} jobId={job.id}/>
                    <JobShortDescriptionForm initialData={job} jobId={job.id}/>
                    <JobShiftTimingModeForm initialData={job} jobId={job.id}/>
                    <JobHourlyRateForm initialData={job} jobId={job.id}/>
                    <JobModeForm initialData={job} jobId={job.id}/>
                    <JobWorkExperienceForm initialData={job} jobId={job.id}/>
                </div>

                <div className="space-y-6">
                    <JobDetailTile
                        title="Job Requirements"
                        icon={ListChecks}
                    />
                    <JobTagsForm initialData={job} jobId={job.id}/>
                    <JobDetailTile
                        title="Company Details"
                        icon={Building2Icon}
                    />
                    <JobCompanyForm
                        initialData={job} jobId={job.id}
                        options={companies.map(company => ({
                            label: company.name,
                            value: company.id
                        }))}
                    />
                    <JobDetailTile
                        title="Resources & Attachments"
                        icon={LucidePaperclip}
                    />
                    <JobAttachmentsForm initialData={job} jobId={job.id}/>
                </div>

                <div className="col-span-2">
                    <JobDescriptionForm initialData={job} jobId={job.id}/>
                </div>
            </div>


        </div>
    );
}
