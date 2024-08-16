"use client"

import * as React from "react"
import {useState} from "react"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Banknote, Bookmark, BookmarkCheck, BriefcaseBusiness, MapPin, User} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {formatDistanceToNow} from "date-fns";
import {motion} from "framer-motion"
import {formattedString} from "@/lib/utils";
import {truncate} from "lodash";

interface Props {
    job: any
    userId: string | null
}

export function JobCardItem({job, userId}: Props) {
    const [isBookmarkedLoading, setIsBookmarkedLoading] = useState(false)

    return (
        <motion.div layout>
            <Card className="w-full h-full flex flex-col  shadow-none rounded">
                <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xs text-muted-foreground font-medium">{formatDistanceToNow(new Date(job.createdAt), {
                            addSuffix: true
                        })}</p>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-auto h-auto p-0 m-0 bg-transparent"
                            type="button"
                        >
                            {isBookmarkedLoading ? <Bookmark className="size-4"/> : <BookmarkCheck className="size-4"/>}
                        </Button>
                    </div>

                    <div className="flex items-start gap-x-2">
                        <Image className="w-[50px] h-[50px] rounded border p-2"
                               src={job?.company?.logo}
                               alt="Company logo"
                               width={100}
                               height={100}/>

                        <div className="flex flex-col">
                            <CardTitle className="text-sm">{job?.title}</CardTitle>
                            <Link href={`/companies/${job?.company?.id}`}>
                                <CardDescription
                                    className="text-xs hover:font-medium text-blue-500">{job?.company?.name}</CardDescription>
                            </Link>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="w-full space-y-4">
                    <div
                        className="w-full flex items-center justify-between gap-1 text-xs font-medium text-muted-foreground">
                        {job?.shiftTimings && <div className="flex items-center gap-x-1">
                            <BriefcaseBusiness className="size-3"/>
                            <p className="">{formattedString(job.shiftTimings)}</p>
                        </div>}
                        {job?.workMode && <div className="flex items-center gap-x-1">
                            <MapPin className="size-3"/>
                            <p className="">{formattedString(job.workMode)}</p>
                        </div>}
                        {job?.hourlyRate && <div className="flex items-center gap-x-1">
                            <Banknote className="size-3"/>
                            <p className="">{job.hourlyRate}$/hrs</p>
                        </div>}
                        {job?.yearsOfExperience && <div className="flex items-center gap-x-1">
                            <User className="size-3"/>
                            <p className="">{job?.yearsOfExperience === "0" ? "Fresher" : job.yearsOfExperience === "2" ? "0-2y" : job.yearsOfExperience === "3" ? "2-4y" : "+5y"}</p>
                        </div>}
                    </div>

                    <div className="">
                        <p className="text-muted-foreground font-medium text-xs">
                            {truncate(job?.short_description, {
                                length: 180,
                                omission: "..."
                            })}
                        </p>
                    </div>

                    {job?.tags?.length > 0 && <div className="w-full flex items-center gap-1.5 flex-wrap">
                        {job.tags.slice(0, 6).map((item: string, index: number) => (
                            <p
                                key={index}
                                className="text-xs bg-slate-100 rounded font-medium px-2 py-1"
                            >
                                {item}
                            </p>
                        ))}
                    </div>}
                </CardContent>

                <CardFooter className="grid grid-cols-2 gap-x-2 mt-auto">
                    <Link href={`/browse/${job.id}`}><Button type="button" className="" variant="outline"
                                                             size="sm">Details</Button></Link>
                    <Button type="button" size="sm">Saved</Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

