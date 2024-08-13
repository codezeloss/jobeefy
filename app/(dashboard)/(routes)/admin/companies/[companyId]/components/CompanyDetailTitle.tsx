import React from "react";
import {Icon, LucideIcon} from "lucide-react";

interface Props {
    icon: LucideIcon
    title: string
}

export default function CompanyDetailTitle({icon: Icon, title}: Props) {
    return (
        <div className="flex items-center gap-x-2.5 mb-3">
            <div className="bg-slate-200 p-2 rounded-full">
                <Icon className="size-5"/>
            </div>
            <h2 className="font-medium">{title}</h2>
        </div>
    );
}
