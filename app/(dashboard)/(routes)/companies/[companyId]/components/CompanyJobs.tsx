import {Job} from "@prisma/client";
import JobsContent from "@/app/(dashboard)/(routes)/browse/components/JobsContent";

interface Props {
    jobs: Job[]
    userId: string
}

export default async function CompanyJobs({jobs, userId}: Props) {
    return (
        <div className="w-full h-full">
            <JobsContent jobs={jobs} userId={userId}/>
        </div>
    );
}
