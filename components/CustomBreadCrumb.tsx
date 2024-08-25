"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {Home} from "lucide-react";


interface Props {
    breadCrumbPage: string,
    breadCrumbItems?: { link: string, label: string }[],
}

export default function CustomBreadCrumb({breadCrumbPage, breadCrumbItems}: Props) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/browse" className="flex items-center gap-x-2">
                        <Home className="size-3.5"/>
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>


                {breadCrumbItems && breadCrumbItems.map((item, index) => (
                    <>
                        <BreadcrumbSeparator key={index}/>
                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink href={item.link}>{item.label}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                ))}

                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <BreadcrumbLink className="font-medium text-black">
                        {breadCrumbPage}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

    );
}
