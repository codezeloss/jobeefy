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

        const publishJob = await prismaDB.job.update({
            where: {
                id: jobId
            },
            data: {
                isPublished: true
            }
        })

        return NextResponse.json(publishJob)
    } catch (e) {
        console.log("[JOB_PUBLISH_PATCH]", e);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}