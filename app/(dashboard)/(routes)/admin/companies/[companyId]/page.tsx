import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import React from "react";

export default function CompanyDetailsPage() {
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
                    <p className="font-medium text-sm text-neutral-500">Complete all fields (4/4)</p>
                </div>


                <div></div>
            </div>
        </div>
    );
}
