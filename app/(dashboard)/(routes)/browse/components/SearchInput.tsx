"use client"

import {Search, X} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Category} from "@prisma/client";
import CategoryListItem from "@/app/(dashboard)/(routes)/browse/components/CategoryListItem";

interface Props {
    categories: Category[]
}

export default function SearchInput({categories}: Props) {
    const [value, setValue] = useState("")


    return (
        <div className="space-y-4 mb-11">
            <div className="w-fulll flex items-center border border-b-slate-200 gap-x-1 rounded px-4 py-1">
                <Search className="size-4"/>
                <Input
                    type='text'
                    className="outline-none focus-visible:ring-0 border-none shadow-none"
                    placeholder="Search for a Job title"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    className="hover:scale-125 hover:bg-transparent"
                    onClick={() => setValue("")}
                >
                    <X className="size-4"/>
                </Button>
            </div>

            <div className="w-full flex items-center gap-x-2 overflow-x-auto scrollbar-none">
                {categories.map((category, index) => (
                    <CategoryListItem key={index} label={category.name} value={category.id}/>
                ))}
            </div>
        </div>
    );
}
