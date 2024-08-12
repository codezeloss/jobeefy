import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import prismaDB from "@/lib/prismaDB";

export async function PATCH(req: Request, {params}: { params: { companyId: string } }) {
    try {
        const {userId} = auth()
        const {companyId} = params;
        const updatedValues = await req.json()

        if (!userId) return new NextResponse("Unauthorized", {status: 401})

        if (!companyId) return new NextResponse("ID is missing", {status: 401})

        const job = await prismaDB.company.update({
            where: {
                id: companyId,
                userId
            },
            data: {
                ...updatedValues
            }
        })

        return NextResponse.json(job)
    } catch (e) {
        console.log("[COMPANIES_PATCH]", e);
        return new NextResponse("Internal error, cannot update the Company!", {status: 500});
    }
}