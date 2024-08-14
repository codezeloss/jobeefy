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

        const company = await prismaDB.company.update({
            where: {
                id: companyId,
                userId
            },
            data: {
                ...updatedValues
            }
        })

        return NextResponse.json(company)
    } catch (e) {
        console.log("[COMPANY_PATCH]", e);
        return new NextResponse("Internal error, cannot update the Company!", {status: 500});
    }
}

export async function DELETE(req: Request, {params}: { params: { companyId: string } }) {
    try {
        const {userId} = auth()
        const {companyId} = params

        if (!userId) return new NextResponse("Unauthorized", {status: 401})

        if (!companyId) return new NextResponse("Company ID is missing!", {status: 401})

        const company = await prismaDB.company.findUnique({
            where: {
                id: companyId,
                userId
            }
        })

        if (!company) return new NextResponse("Company Not Found", {status: 404})

        const deletedCompany = await prismaDB.company.delete({
            where: {
                id: companyId,
                userId
            }
        })

        return NextResponse.json(deletedCompany)
    } catch (e) {
        console.log("[COMPANY_DELETE]", e);
        return new NextResponse("Internal error, cannot delete the Company!", {status: 500});
    }
}