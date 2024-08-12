import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import prismaDB from "@/lib/prismaDB";

export async function POST(req: Request) {
    try {
        const {userId} = auth()
        const {name} = await req.json()

        if (!userId) return new NextResponse("Unauthorized", {status: 401})

        if (!name) return new NextResponse("Name is missing!", {status: 401})

        const job = await prismaDB.company.create({
            data: {
                userId,
                name
            }
        })

        return NextResponse.json(job)
    } catch (e) {
        console.log("[COMPANIES_POST]", e);
        return new NextResponse("Internal error, cannot create the Company!", {status: 500});
    }
}