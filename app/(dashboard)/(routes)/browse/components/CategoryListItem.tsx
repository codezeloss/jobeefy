"use client"

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import qs from "query-string"

interface Props {
    label: string
    value: string
}

export default function CategoryListItem({label, value}: Props) {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentCategoryId = searchParams.get("categoryId")
    const currentTitle = searchParams.get("title")

    const isSelected = currentCategoryId === value

    const handleClick = () => {
        const url = qs.stringifyUrl({
                url: pathname,
                query: {
                    title: currentTitle,
                    categoryId: isSelected ? null : value
                }
            },
            {
                skipNull: true,
                skipEmptyString: true
            })

        router.push(url)
    }

    return (
        <Button
            className={cn("hover:bg-blue-500 text-muted-foreground transition hover:text-white hover:border-0 rounded whitespace-nowrap",
                isSelected && "bg-blue-500 text-white border-0")}
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClick}
        >
            {label}
        </Button>
    );
}
