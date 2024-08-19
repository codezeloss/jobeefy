"use client"

import {Company, Job} from "@prisma/client";
import Image from "next/image";
import {Button} from "@/components/ui/button";

interface Props {
    job: Job & {
        company: Company
    } | null
    userId: string
}

export default function JobDetailContent({userId, job}: Props) {
    return (
        <div className="space-y-11">
            {job?.imageURL &&
                <div className="relative w-full h-80 border rounded overflow-hidden">
                    <Image
                        className="absolute w-full h-80 object-cover"
                        src={job.imageURL}
                        alt={job?.title}
                        fill
                    />
                </div>
            }

            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold">{job?.title}</h2>
                    <div className="flex items-center gap-x-1.5">
                        <Image className="text-xs size-7 rounded-full border object-contain p-1"
                               src={job?.company?.logo ?? ""}
                               alt="Company logo"
                               width={50} height={50}
                               loading="eager"
                        />
                        <p className="font-medium text-muted-foreground text-xs">{job?.company?.name}</p>
                    </div>
                </div>

                <Button
                    type="button"
                    onClick={() => {
                    }}
                    variant="default"
                    className=""
                >
                    Apply
                </Button>
            </div>

            {job?.description && <div dangerouslySetInnerHTML={{__html: job.description}}/>}
        </div>
    );
}
