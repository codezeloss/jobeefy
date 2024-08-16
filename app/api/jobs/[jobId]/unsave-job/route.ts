import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import prismaDB from "@/lib/prismaDB";

export const PATCH = async (req: Request, {params}: { params: { jobId: string } }) => {
    try {
        const {userId} = auth()
        const {jobId} = params

        if (!userId) return new NextResponse("Unauthorized", {status: 401})

        if (!jobId) return new NextResponse("Job ID is missing", {status: 404})

        const job = await prismaDB.job.findUnique({
            where: {
                id: jobId,
                userId
            }
        })

        if (!job) return new NextResponse("Job Not Found", {status: 404})

        //
        const userIndex = job.savedUsers.indexOf(userId)
        let updatedJob

        if (userIndex !== -1) {
            updatedJob = await prismaDB.job.update({
                where: {
                    id: jobId,
                    userId
                },
                data: {
                    savedUsers: {
                        set: job.savedUsers.filter((savedUserId) => savedUserId !== userId)
                    }
                }
            })
        }

        return NextResponse.json(updatedJob)
    } catch (e) {
        console.log("[JOB_UNSAVE_PATCH]", e);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}