"use client"

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Category} from "@prisma/client";

interface Props {
    categories: Category[]
}

export default function AppliedFilters({categories}: Props) {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentParams = Object.fromEntries(searchParams.entries())

    const shiftTimingsParams = Object.fromEntries(
        Object.entries(currentParams).filter(([key]) => key === "shiftTimings")
    )

    const workingModesParams = Object.fromEntries(
        Object.entries(currentParams).filter(([key]) => key === "workMode")
    )

    const getCategoryName = (categoryId: string | null) => {
        const category = categories.find(cat => cat.id === categoryId)
        return category ? category.name : ""
    }

    if (searchParams.size === 0) return null

    return (
        <div className="">
            <div className='mb-4 flex items-center gap-2'>
                {Object.entries(shiftTimingsParams).map(([key, value]) => (
                    <>
                        {value.split(",").map(item => (
                            <Button
                                variant="secondary"
                                type='button'
                                size="sm"
                                key={item}
                                className="flex items-center gap-x-2 text-neutral-500 border bg-white px-2 py-1 rounded capitalize"
                            >
                                {item}
                            </Button>
                        ))}
                    </>
                ))}


                {Object.entries(workingModesParams).map(([key, value]) => (
                    <>
                        {value.split(",").map(item => (
                            <Button
                                variant="secondary"
                                type='button'
                                size="sm"
                                key={item}
                                className="flex items-center gap-x-2 text-neutral-500 border bg-white px-2 py-1 rounded capitalize"
                            >
                                {item}
                            </Button>
                        ))}
                    </>
                ))}


                {searchParams.get("categoryId") && (
                    <Button
                        variant="secondary"
                        type="button"
                        size="sm"
                        className="flex items-center gap-x-2 text-neutral-500 border bg-white px-2 py-1 rounded capitalize"
                    >
                        {getCategoryName(searchParams.get("categoryId"))}
                    </Button>
                )}
            </div>

            {searchParams.get("title") && (
                <div className="flex items-center justify-center flex-col my-4">
                    <h2 className="text-base text-muted-foreground">
                        You searched for:
                        <span className="font-bold ml-2 text-neutral-900 capitalize">
                            {searchParams.get("title")}
                        </span>
                    </h2>
                </div>
            )}
        </div>
    );
}
