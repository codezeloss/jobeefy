"use client"

import {DataTable} from "@/components/DataTable";
import {AppliedJobs, appliedJobsTableColumns} from "@/app/(dashboard)/(routes)/profile/components/AppliedJobsColumns";

export default function UserAppliedJobs({data}: { data: AppliedJobs[] }) {
    return (
        <div>
            <h2 className="font-semibold text-base mb-2">Applied Jobs</h2>

            <DataTable
                searchKey="company"
                columns={appliedJobsTableColumns}
                data={data}
            />
        </div>
    );
}
