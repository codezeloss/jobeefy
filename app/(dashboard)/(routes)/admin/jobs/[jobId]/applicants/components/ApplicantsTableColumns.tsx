"use client"

import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown, File} from "lucide-react"
import {Button} from "@/components/ui/button"
import Link from "next/link";
import {truncate} from "lodash";
import ApplicantsCellActions
    from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/applicants/components/ApplicantsCellActions";

export type ApplicantsColumns = {
    id: number
    fullName: string
    email: string
    contact: string
    resume: { url: string, name: string, active: boolean } | null | any
    appliedAt: string
}

export const applicantsTableColumns: ColumnDef<ApplicantsColumns>[] = [
    {
        accessorKey: "fullName",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Full Name
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "email",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "contact",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Contact
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "resume",
        cell: ({row}) => {
            const resumeValues: { url: string, name: string, active: boolean } = row.getValue("resume")
            return (
                <Link href={resumeValues.url} className="flex items-center gap-x-1 text-blue-500" target="_blank"
                      download>
                    <File className="size-3.5"/>
                    <p className="text-sm font-medium hover:underline">
                        {truncate(resumeValues.name, {
                            length: 30,
                            omission: "..."
                        })}
                    </p>
                </Link>
            )
        },
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Resume
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
    },
    {
        accessorKey: "appliedAt",
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
            const {id, fullName, email} = row.original
            return (
                <ApplicantsCellActions id={id} fullName={fullName} email={email}/>
            )
        },
    }
]