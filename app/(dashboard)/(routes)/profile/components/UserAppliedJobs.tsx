"use client"

import {DataTable} from "@/components/DataTable";
import {appliedJobsTableColumns} from "@/app/(dashboard)/(routes)/profile/components/AppliedJobsColumns";

export default function UserAppliedJobs() {
    return (
        <div>
            <h2 className="font-semibold text-base mb-4">Applied Jobs</h2>

            <DataTable
                searchKey="company"
                columns={appliedJobsTableColumns}
                data={[]}
            />
        </div>
    );
}
