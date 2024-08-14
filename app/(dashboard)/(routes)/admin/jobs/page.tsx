import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {JobsColumns, jobsTableColumns} from "@/app/(dashboard)/(routes)/admin/jobs/components/JobsTableColumns";
import {DataTable} from "@/components/DataTable";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import prismaDB from "@/lib/prismaDB";
import {format} from "date-fns";

export default async function JobsPage() {
    const {userId} = auth()

    if (!userId) return redirect("/admin/jobs")

    const jobs = await prismaDB.job.findMany({
        where: {
            userId
        },
        include: {
            category: true,
            company: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedJobsData: JobsColumns[] = jobs.map(job => ({
        id: job.id,
        title: job.title ?? "--",
        company: job?.company?.name ?? "--",
        category: job?.category?.name ?? "--",
        isPublished: job.isPublished,
        createdAt: job?.createdAt ? format(job.createdAt, "MMMM do, yyyy") : "--/--/----"
    }))

    return (
        <div className="w-full h-full bg-white rounded">
            <div className="w-full flex items-center justify-between mb-6">
                <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">Jobs</h1>

                <Link href="/admin/create">
                    <Button className="gap-x-1.5">
                        <Plus size={18}/>
                        New Job
                    </Button>
                </Link>
            </div>

            <DataTable
                searchKey="title"
                columns={jobsTableColumns}
                data={formattedJobsData}
            />
        </div>
    );
}
