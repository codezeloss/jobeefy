"use client"

import {AppliedJob, Company, Job, UserProfile} from "@prisma/client";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import axios from "axios";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import Link from "next/link";
import ReactQuillPreview from "@/components/ReactQuillPreview";
import {File} from "lucide-react";
import {ApplyConfirmation} from "@/app/(dashboard)/(routes)/browse/[jobId]/components/ApplyConfirmation";
import AlertBanner from "@/components/AlertBanner";

interface Props {
    job: Job & {
        company: Company | null,
    }
    jobId: string
    userProfile: UserProfile & {
        appliedJobs: AppliedJob[]
    }
}

export default function JobDetailContent({jobId, job, userProfile}: Props) {
    const {toast} = useToast()
    const router = useRouter()
    const [applyLoading, setApplyLoading] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)

    const haveUserApplied = jobId && userProfile?.appliedJobs?.some(appliedJob => appliedJob.jobId === jobId)

    const handleClickApply = async () => {
        setOpenDialog(true)
    }

    const ApplyToJobConfirmed = async () => {
        try {
            setApplyLoading(true)
            await axios.patch(`/api/users/${userProfile.userId}/appliedJobs`, {jobId})

            // ** Send Mail to the user
            await axios.post("/api/thankyou", {
                fullName: userProfile?.fullName,
                email: userProfile?.email
            })

            toast({
                variant: "default",
                title: "✅ Applied successfully",
                description: "You have applied to this job successfully."
            })

            router.refresh()
        } catch (e) {
            toast({
                variant: "destructive",
                title: "❌ Something went wrong!",
                description: "Cannot apply to this job, please try again."
            })
        } finally {
            setOpenDialog(false)
            setApplyLoading(false)
        }
    }

    return (
        <>
            <ApplyConfirmation
                open={openDialog}
                setOpen={setOpenDialog}
                userProfile={userProfile}
                onConfirm={ApplyToJobConfirmed}
                loading={applyLoading}
            />

            <div className="space-y-11">
                <div className="space-y-2">
                    {userProfile.appliedJobs.some(job => job.jobId === jobId) &&
                        <AlertBanner
                            className="bg-green-100/50"
                            title="You've already applied to this Job"
                            description="Thank you for applying! Your application has been received, and we're reviewing it carefully. We'll be in touch soon with an update."
                            variant="success"
                        />
                    }

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
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold text-neutral-600">{job?.title}</h2>
                        <div className="flex items-center gap-x-1.5">
                            <Image className="text-xs size-7 rounded-full border object-contain p-1"
                                   src={job?.company?.logo ?? ""}
                                   alt="Company logo"
                                   width={50} height={50}
                                   loading="eager"
                            />
                            <Link href={`/companies/${job.companyId}`}
                                  className="font-medium text-blue-500 text-xs">
                                {job?.company?.name}
                            </Link>
                        </div>
                    </div>

                    {haveUserApplied ?
                        <Button
                            disabled={true}
                            type="button"
                            variant="outline"
                            className="rounded shadow-2xl"
                        >
                            Already Applied
                        </Button>
                        :
                        <Button
                            disabled={applyLoading}
                            type="button"
                            onClick={handleClickApply}
                            variant="default"
                            className="rounded shadow-2xl"
                        >
                            Apply
                        </Button>
                    }
                </div>

                <div className="space-y-2">
                    <h3 className="font-semibold font-sans">Description:</h3>
                    <p className="font-sans">{job.short_description}</p>
                </div>

                <div className="space-y-2 font-sans">
                    <h3 className="font-semibold">About the Job:</h3>
                    {job?.description &&
                        <ReactQuillPreview value={job.description}/>
                    }
                </div>

                {(Array.isArray(job?.attachments) && job?.attachments.length > 0) &&
                    <div className="space-y-2 font-sans">
                        <h3 className="font-semibold">Job&apos;s Attachments:</h3>
                        <p className="text-sm text-muted-foreground">Download the attachments to know more about the
                            job</p>
                        <div className="space-y-1">
                            {job.attachments.map((item: any, index: number) => (
                                <Link href={item.url} key={index} target="_blank" download
                                      className="text-blue-500 font-medium text-sm flex items-center gap-x-1.5"
                                >
                                    <File className="size-4"/>
                                    <p>{item.name}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </>
    );
}
