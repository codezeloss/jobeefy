import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import prismaDB from "@/lib/prismaDB";

export async function PATCH(req: Request, {params}: {params: {jobId: string}}) {
    try {
        const {userId} = auth()
        const {jobId} = params;
        const updatedValues = await req.json()

        if (!userId) return new NextResponse("Unauthorized", {status: 401})

        if (!jobId) return new NextResponse("ID is missing", {status: 401})

        const job = await prismaDB.job.update({
            where: {
                id: jobId,
                userId
            },
            data: {
                ...updatedValues
            }
        })

        return NextResponse.json(job)
    } catch (e) {
        console.log("[JOBS_PATCH]", e);
        return new NextResponse("Internal error, cannot create the Job!", {status: 500});
    }
}