import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {DataTable} from "@/components/DataTable";
import {companiesTableColumns} from "@/app/(dashboard)/(routes)/admin/companies/components/CompaniesTableColumns";
import {redirect} from "next/navigation";
import prismaDB from "@/lib/prismaDB";
import {format} from "date-fns";
import {auth} from "@clerk/nextjs/server";

export default async function CompaniesPage() {
    const {userId} = auth()

    if (!userId) return redirect("/admin/companies")

    const companies = await prismaDB.company.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedCompaniesData = companies.map(company => ({
        id: company.id,
        name: company.name ?? "--",
        logo: company?.logo ?? "",
        createdAt: company?.createdAt ? format(company.createdAt.toLocaleDateString(), "MMMM do, yyyy") : "--/--/----"
    }))

    return (
        <div className="w-full h-full bg-white rounded">
            <div className="w-full flex items-center justify-between mb-4">
                <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">Companies</h1>

                <Link href="/admin/companies/create">
                    <Button className="gap-x-1.5">
                        <Plus size={18}/>
                        New Company
                    </Button>
                </Link>
            </div>

            <DataTable
                searchKey="name"
                columns={companiesTableColumns}
                data={formattedCompaniesData}
            />
        </div>
    );
}
