"use client"

import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown, MoreHorizontal, Pencil, Users2Icon} from "lucide-react"
import {Button} from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import Link from "next/link";

export type JobsColumns = {
    id: string
    title: string
    company: string
    category: string
    createdAt: string
    isPublished: boolean
}

export const jobsTableColumns: ColumnDef<JobsColumns>[] = [
    {
        accessorKey: "title",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "isPublished",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const {isPublished} = row.original
            return <div
                className={`w-fit text-xs font-medium text-center border px-2 py-1 rounded ${isPublished ? "text-green-500 bg-green-100/20 border-green-500" : "text-red-500 bg-red-100/20 border-red-500"}`}>
                {isPublished ? "Published" : "Unpublished"}
            </div>
        },
    },
    {
        accessorKey: "category",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "company",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Company
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({row}) => {
            const {id: jobId} = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <Link href={`/admin/jobs/${jobId}`}>
                            <DropdownMenuItem className="text-sm flex flex-row gap-x-2" onClick={() => {
                            }}>
                                <Pencil className="size-3"/>
                                Edit
                            </DropdownMenuItem>
                        </Link>
                        <Link href={`/admin/jobs/${jobId}/applicants`}>
                            <DropdownMenuItem className="text-sm flex flex-row gap-x-2" onClick={() => {
                            }}>
                                <Users2Icon className="size-3"/>
                                Applicants
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]