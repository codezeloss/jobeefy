import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
import prismaDB from "@/lib/prismaDB";

export async function PATCH(req: Request) {
    try {
        const {userId} = auth()
        const {jobId} = await req.json()

        if (!userId) return new NextResponse("Unauthorized", {status: 401})

        if (!jobId) return new NextResponse("Job ID is missing!", {status: 401})

        let profile = await prismaDB.userProfile.findUnique({
            where: {
                userId
            }
        })

        if (!profile) return new NextResponse("User profile not found!", {status: 401})

        const updatedProfile = await prismaDB.userProfile.update({
            where: {
                userId
            },
            data: {
                appliedJobs: {
                    create: {
                        jobId: jobId,
                    }
                }
            },
            include: {
                appliedJobs: true
            }
        })

        return NextResponse.json(updatedProfile)
    } catch (e) {
        console.log("[APPLIED_JOBS_PATCH]", e);
        return new NextResponse("Internal error, cannot apply to this Job!", {status: 500});
    }
}