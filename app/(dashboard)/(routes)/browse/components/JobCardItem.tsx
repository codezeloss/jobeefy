"use client"

import * as React from "react"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Banknote, Bookmark, BriefcaseBusiness, MapPin, User} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
    job: any
    userId: string | null
}

export function JobCardItem({job, userId}: Props) {
    return (
        <Card className="w-full shadow-none rounded">
            <CardHeader>
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xs text-muted-foreground font-medium">2 months ago</p>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-auto h-auto p-0 m-0 bg-transparent"
                        type="button"
                    >
                        <Bookmark className="size-4"/>
                    </Button>
                </div>

                <div className="flex items-start gap-x-2">
                    <Image className="w-[50px] h-[50px] rounded border p-2"
                           src={job?.company?.logo}
                           alt="Company logo"
                           width={100}
                           height={100}/>

                    <div className="flex flex-col">
                        <CardTitle className="text-sm">Web Developer</CardTitle>
                        <Link href="#">
                            <CardDescription
                                className="text-xs hover:font-medium text-blue-500">Netflix</CardDescription>
                        </Link>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="grid grid-cols-4 gap-1 text-xs font-medium text-muted-foreground">
                    <div className="flex items-center gap-x-1">
                        <BriefcaseBusiness className="size-3"/>
                        <p className="">Full Time</p>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <MapPin className="size-3"/>
                        <p className="">Office</p>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <Banknote className="size-3"/>
                        <p className="">22 $/hrs</p>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <User className="size-3"/>
                        <p className="">Fresher</p>
                    </div>
                </div>

                <div className="">
                    <p className="text-muted-foreground font-medium text-xs text-justify">
                        {job.short_description}
                    </p>
                </div>

                <div className="w-full flex items-center gap-1.5 flex-wrap">
                    {job.tags.map((item: string, index: number) => (
                        <p
                            key={index}
                            className="text-xs bg-slate-100 rounded font-medium px-2 py-1"
                        >
                            {item}
                        </p>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="grid grid-cols-2 gap-x-2">
                <Button type="button" className="" variant="outline" size="sm">Details</Button>
                <Button type="button" size="sm">Saved</Button>
            </CardFooter>
        </Card>
    )
}

