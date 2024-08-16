"use client"

import {JobCardItem} from "@/app/(dashboard)/(routes)/browse/components/JobCardItem";
import {Job} from "@prisma/client";
import Image from "next/image";
import {AnimatePresence, motion} from "framer-motion";
import {fadeInOut} from "@/animations";

interface Props {
    jobs: Job[]
    userId: string | null
}

export default function JobsContent({jobs, userId}: Props) {
    if (jobs.length === 0) {
        return <div className="w-full relative h-[60vh] flex flex-col items-center justify-center">
            <div className="flex flex-col items-center">
                <Image
                    className="w-[200px] h-[200px] object-contain"
                    src="/no-data.svg"
                    alt="No data illustration"
                    width={200}
                    height={200}
                />
                <p className="font-medium text-slate-300 text-sm -mt-3">No Job Found</p>
            </div>
        </div>
    }

    return (
        <AnimatePresence>
            <motion.div
                {...fadeInOut}
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
            >
                {jobs.map((item, index) => (
                    <JobCardItem key={index} job={item} userId={userId}/>
                ))}
            </motion.div>
        </AnimatePresence>
    );
}
