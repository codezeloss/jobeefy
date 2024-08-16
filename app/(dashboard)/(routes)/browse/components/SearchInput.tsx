"use client"

import {Search, X} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {Category} from "@prisma/client";
import CategoryListItem from "@/app/(dashboard)/(routes)/browse/components/CategoryListItem";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebounce} from "@/hooks/use-debounce";
import qs from "query-string";

interface Props {
    categories: Category[]
}

export default function SearchInput({categories}: Props) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const currentCategoryId = searchParams.get("categoryId")
    const currentTitle = searchParams.get("title")
    const createdAtFilter = searchParams.get("createdAtFilter")
    const currentShiftTimings = searchParams.get("shiftTimings")
    const currentWorkMode = searchParams.get("workMode")

    const [value, setValue] = useState(currentTitle || "")

    const debounceValue = useDebounce(value)

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: debounceValue,
                categoryId: currentCategoryId,
                createdAtFilter: createdAtFilter,
                shiftTimings: currentShiftTimings,
                workMode: currentWorkMode
            }
        }, {
            skipNull: true,
            skipEmptyString: true
        })

        router.push(url)
    }, [debounceValue, router, pathname, currentCategoryId, createdAtFilter, currentShiftTimings, currentWorkMode]);

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
