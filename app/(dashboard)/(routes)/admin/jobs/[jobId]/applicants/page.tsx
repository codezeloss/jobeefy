import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import prismaDB from "@/lib/prismaDB";
import {DataTable} from "@/components/DataTable";
import {format} from "date-fns";
import {
    ApplicantsColumns,
    applicantsTableColumns
} from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/applicants/components/ApplicantsTableColumns";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";

export default async function JobApplicantsPage({params}: { params: { jobId: string } }) {
    const {userId} = auth()

    const job = await prismaDB.job.findUnique({
        where: {
            id: params.jobId,
            userId: userId as string
        }
    })

    if (!userId || !job) redirect("/admin/jobs")

    const applicants = await prismaDB.appliedJob.findMany({
        where: {
            jobId: params.jobId,
        },
        include: {
            UserProfile: true
        },
        orderBy: {
            appliedAt: "desc"
        }
    })


    const formattedApplicantsData: ApplicantsColumns[] = applicants.map((applicant, index) => ({
        id: index,
        fullName: applicant?.UserProfile?.fullName ?? "",
        email: applicant?.UserProfile?.email ?? "",
        contact: applicant?.UserProfile?.contact ?? "",
        resume: Array.isArray(applicant?.UserProfile?.resumes) && applicant?.UserProfile?.resumes?.length > 0 ? applicant.UserProfile.resumes.find((item: any) => item.active) : null,
        appliedAt: applicant?.appliedAt ? format(applicant.appliedAt, "MMMM do, yyyy") : "--/--/----"
    }))

    return (
        <div className="space-y-4">
            <CustomBreadCrumb
                breadCrumbPage="Applicants"
                breadCrumbItems={[{label: job.title, link: `/admin/jobs/${job.id}`}]}
            />

            <DataTable
                searchKey="fullName"
                columns={applicantsTableColumns}
                data={formattedApplicantsData}
            />
        </div>
    );
}
