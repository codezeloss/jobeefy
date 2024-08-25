import {auth} from "@clerk/nextjs/server";
import prismaDB from "@/lib/prismaDB";
import {redirect} from "next/navigation";
import CompanyHeader from "@/app/(dashboard)/(routes)/companies/[companyId]/components/CompanyHeader";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import CompanyOverview from "@/app/(dashboard)/(routes)/companies/[companyId]/components/CompanyOverview";
import CompanyJoinUs from "@/app/(dashboard)/(routes)/companies/[companyId]/components/CompanyJoinUs";
import CompanyJobs from "@/app/(dashboard)/(routes)/companies/[companyId]/components/CompanyJobs";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";

export default async function CompanyDetailsPage({params}: { params: { companyId: string } }) {
    const {userId} = auth()

    const company = await prismaDB.company.findUnique({
        where: {
            id: params.companyId,
        }
    })

    if (!userId || !company) redirect("/browse")

    const jobs = await prismaDB.job.findMany({
        where: {
            companyId: params.companyId
        },
        include: {
            company: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div className="bg-white w-full h-full space-y-4">
            <CustomBreadCrumb breadCrumbPage={company.name} breadCrumbItems={[{label: "Search", link: "/browse"}]}/>

            <div className="space-y-8">
                <CompanyHeader company={company} companyId={params.companyId} userId={userId}/>

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="mb-2">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="join-us">Why join Us</TabsTrigger>
                        <TabsTrigger value="jobs">Jobs</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <CompanyOverview company={company}/>
                    </TabsContent>
                    <TabsContent value="join-us">
                        <CompanyJoinUs company={company}/>
                    </TabsContent>
                    <TabsContent value="jobs">
                        <CompanyJobs jobs={jobs} userId={userId}/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
