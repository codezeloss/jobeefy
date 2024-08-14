import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import prismaDB from "@/lib/prismaDB";

export async function PATCH(req: Request, {params}: { params: { jobId: string } }) {
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
        return new NextResponse("Internal error, cannot update the Job!", {status: 500});
    }
}

export async function DELETE(req: Request, {params}: { params: { jobId: string } }) {
    try {
        const {userId} = auth()
        const {jobId} = params

        if (!userId) return new NextResponse("Unauthorized", {status: 401})

        if (!jobId) return new NextResponse("Job ID is missing!", {status: 401})

        const job = await prismaDB.job.findUnique({
            where: {
                id: jobId,
                userId
            }
        })

        if (!job) return new NextResponse("Job Not Found", {status: 404})

        const deletedJob = await prismaDB.job.delete({
            where: {
                id: jobId,
                userId
            }
        })

        return NextResponse.json(deletedJob)
    } catch (e) {
        console.log("[JOBS_DELETE]", e);
        return new NextResponse("Internal error, cannot delete the Job!", {status: 500});
    }
}