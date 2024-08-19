import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
import prismaDB from "@/lib/prismaDB";

export async function PATCH(req: Request) {
    try {
        const {userId} = auth()
        const values = await req.json()

        if (!userId) return new NextResponse("Unauthorized", {status: 401})

        let userResumes = await prismaDB.userProfile.update({
            where: {
                userId
            },
            data: {
                ...values
            }
        })

        return NextResponse.json(userResumes)
    } catch (e) {
        console.log("[USER_RESUME_PATCH]", e);
        return new NextResponse("Internal error, cannot update the Resumes!", {status: 500});
    }
}