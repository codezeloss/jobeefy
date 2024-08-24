import {auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";
import prismaDB from "@/lib/prismaDB";

export async function PATCH(req: Request, {params}: { params: { companyId: string } }) {
    try {
        const {userId} = auth()
        const {companyId} = params;

        if (!userId) return new NextResponse("Unauthorized", {status: 401})

        if (!companyId) return new NextResponse("ID is missing", {status: 401})

        const company = await prismaDB.company.findUnique({
            where: {
                id: companyId
            }
        })

        if (!company) return new NextResponse("Company not found!", {status: 401})

        //
        let updatedCompany
        const userIndex = company.followers.indexOf(userId)

        if (userIndex !== -1) {
            updatedCompany = await prismaDB.company.update({
                where: {
                    id: companyId,
                    userId
                },
                data: {
                    followers: {
                        set: company.followers.filter(item => item !== userId)
                    }
                }
            })
        }

        return NextResponse.json(updatedCompany)
    } catch (e) {
        console.log("[COMPANY_FOLLOW_PATCH]", e);
        return new NextResponse("Internal error, cannot follow the Company!", {status: 500});
    }
}