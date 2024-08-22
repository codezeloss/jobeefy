import {Job} from "@prisma/client";
import {auth} from "@clerk/nextjs/server";
import JobsContent from "@/app/(dashboard)/(routes)/browse/components/JobsContent";

interface Props {
    filteredJobs: Job[]
}

export default function RelatedJobs({filteredJobs}: Props) {
    const {userId} = auth()

    return (
        <div>
            <h2 className="font-semibold mb-4 text-xl">Related Jobs</h2>
            <JobsContent jobs={filteredJobs} userId={userId}/>
        </div>
    );
}
