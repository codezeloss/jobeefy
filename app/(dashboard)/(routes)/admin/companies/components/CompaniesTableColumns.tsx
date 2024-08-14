"use client"

import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown, MoreHorizontal, Pencil, Users2Icon} from "lucide-react"
import {Button} from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import Image from "next/image";

export type CompaniesColumns = {
    id: string
    name: string
    logo: string
    createdAt: string
}

export const companiesTableColumns: ColumnDef<CompaniesColumns>[] = [
    {
        accessorKey: "logo",
        header: "Logo",
        cell: ({row}) => {
            const {logo} = row.original
            return (
                <div className="p-6">
                    <Image
                        className="w-[100px] h-[100px] text-xs text-center p-2"
                        src={logo || "/logo.svg"}
                        alt="Company's logo"
                        width={100}
                        height={100}
                    />
                </div>
            )
        },
    },
    {
        accessorKey: "name",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
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
            const {id: companyId} = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <Link href={`/admin/companies/${companyId}`}>
                            <DropdownMenuItem className="text-sm flex flex-row gap-x-2" onClick={() => {
                            }}>
                                <Pencil className="size-3"/>
                                Edit
                            </DropdownMenuItem>
                        </Link>
                        <Link href={`/admin/companies/${companyId}/applicants`}>
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