import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
import prismaDB from "@/lib/prismaDB";

export async function PATCH(req: Request) {
    try {
        const {userId} = auth()
        const values = await req.json()

        if (!userId) return new NextResponse("Unauthorized", {status: 401})

        let profile = await prismaDB.userProfile.findUnique({
            where: {
                userId
            }
        })

        let userProfile

        if (profile) {
            userProfile = await prismaDB.userProfile.update({
                where: {
                    userId
                },
                data: {
                    ...values
                }
            })
        } else {
            userProfile = await prismaDB.userProfile.create({
                data: {
                    userId,
                    ...values
                }
            })
        }

        return NextResponse.json(userProfile)
    } catch (e) {
        console.log("[USER_PATCH]", e);
        return new NextResponse("Internal error, cannot update the Profile!", {status: 500});
    }
}