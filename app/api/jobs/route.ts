import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import prismaDB from "@/lib/prismaDB";

export async function POST(req: Request) {
    try {
        const {userId} = auth()
        const {title} = await req.json()

        if (!userId) return new NextResponse("Unauthorized", {status: 401})

        if (!title) return new NextResponse("Title is missing!", {status: 401})

        const job = await prismaDB.job.create({
            data: {
                userId,
                title
            }
        })

        return NextResponse.json(job)
    } catch (e) {
        console.log("[JOBS_POST]", e);
        return new NextResponse("Internal error, cannot create the Job!", {status: 500});
    }
}
