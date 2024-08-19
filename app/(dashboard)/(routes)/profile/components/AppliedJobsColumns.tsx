"use client"

import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown, Eye} from "lucide-react"
import {Button} from "@/components/ui/button"
import Link from "next/link";

export type AppliedJobs = {
    id: string
    title: string
    category: string
    company: string
    createdAt: string
}

export const appliedJobsTableColumns: ColumnDef<AppliedJobs>[] = [
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
                <Link href={`/admin/jobs/${jobId}`}>
                    <Button type="button" variant="ghost" className="text-sm" onClick={() => {
                    }}>
                        <Eye className="size-4"/>
                    </Button>
                </Link>
            )
        },
    }
]