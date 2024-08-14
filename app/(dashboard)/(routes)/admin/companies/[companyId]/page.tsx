import Link from "next/link";
import {ArrowLeft, LayoutDashboard, LinkIcon} from "lucide-react";
import React from "react";
import {redirect} from "next/navigation";
import {auth} from "@clerk/nextjs/server";
import prismaDB from "@/lib/prismaDB";
import CompanyDetailTitle from "@/app/(dashboard)/(routes)/admin/companies/[companyId]/components/CompanyDetailTitle";
import CompanyNameForm from "@/app/(dashboard)/(routes)/admin/companies/[companyId]/components/CompanyNameForm";
import CompanyDescriptionForm
    from "@/app/(dashboard)/(routes)/admin/companies/[companyId]/components/CompanyDescriptionForm";
import CompanyLogoForm from "@/app/(dashboard)/(routes)/admin/companies/[companyId]/components/CompanyLogoForm";
import CompanyCoverImage from "@/app/(dashboard)/(routes)/admin/companies/[companyId]/components/CompanyCoverImage";
import CompanySocialsForm from "@/app/(dashboard)/(routes)/admin/companies/[companyId]/components/CompanySocialsForm";
import CompanyOverviewForm from "@/app/(dashboard)/(routes)/admin/companies/[companyId]/components/CompanyOverviewForm";
import CompanyWhyForm from "@/app/(dashboard)/(routes)/admin/companies/[companyId]/components/CompanyWhyForm";
import CompanyActions from "@/app/(dashboard)/(routes)/admin/companies/[companyId]/components/CompanyActions";

export default async function CompanyDetailsPage({params}: { params: { companyId: string } }) {
    // ** Verify the mongoDB ID
    const validateObjectIdRegex = /^[0-9a-fA-F]{24}$/
    if (!validateObjectIdRegex.test(params.companyId)) {
        return redirect("/admin/companies")
    }

    const {userId} = auth()

    if (!userId) return redirect("/")

    const company = await prismaDB.company.findUnique({
        where: {
            id: params.companyId,
            userId
        }
    })

    if (!company) return redirect("/admin/companies")

    const requiredFields = [
        company?.name,
        company?.description,
        company?.logo,
        company?.coverImage,
        company?.mail,
        company?.website,
        company?.linkedin,
        company?.address_line_1,
        company?.city,
        company?.state,
        company?.overview,
        company?.whyJoinUs,
    ]

    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length
    const completionText = `(${completedFields}/${totalFields})`
    const isComplete = requiredFields.every(Boolean)

    return (
        <div>
            <Link href="/admin/companies">
                <div className="flex items-center gap-x-4 text-neutral-500 text-sm mb-5 cursor-pointer">
                    <ArrowLeft className="size-4"/>
                    <p className="font-semibold">Back</p>
                </div>
            </Link>

            <div className="w-full flex items-center justify-between mb-4">
                <div className="flex flex-col gap-y-2">
                    <h1 className="font-semibold text-2xl">Company Setup</h1>
                    <p className="font-medium text-sm text-neutral-500">Complete all fields {completionText}</p>
                </div>


                <CompanyActions
                    company={company}
                    companyId={params.companyId}
                    disabled={false}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16">
                <div className="space-y-6">
                    <CompanyDetailTitle
                        title="Customize your Company"
                        icon={LayoutDashboard}
                    />
                    <CompanyNameForm initialData={company} companyId={company.id}/>
                    <CompanyDescriptionForm initialData={company} companyId={company.id}/>
                    <CompanyLogoForm initialData={company} companyId={company.id}/>
                </div>

                <div className="space-y-6">
                    <CompanyDetailTitle
                        title="Company Social Contacts"
                        icon={LinkIcon}
                    />
                    <CompanySocialsForm initialData={company} companyId={company.id}/>
                    <CompanyCoverImage initialData={company} companyId={company.id}/>
                </div>

                <div className="col-span-2 space-y-6">
                    <CompanyOverviewForm initialData={company} companyId={company.id}/>
                    <CompanyWhyForm initialData={company} companyId={company.id}/>
                </div>
            </div>
        </div>
    );
}
