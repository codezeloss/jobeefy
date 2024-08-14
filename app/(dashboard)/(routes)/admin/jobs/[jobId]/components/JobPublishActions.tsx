"use client"

import {Button} from "@/components/ui/button";
import {Trash2Icon} from "lucide-react";
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Job} from "@prisma/client";
import {deleteUploadthingURL} from "@/utils/deleteUploadedAssets";

interface JobPublishActionsProps {
    disabled: boolean,
    job: Job,
    jobId: string,
    isPublished: boolean
}

export default function JobPublishActions({disabled, jobId, job, isPublished}: JobPublishActionsProps) {
    const {toast} = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const onPublishClick = async () => {
        try {
            setLoading(true)

            if (isPublished) {
                await axios.patch(`/api/jobs/${jobId}/unpublish`)
                toast({
                    variant: "default",
                    title: "✅ Job unpublished successfully"
                })
                router.refresh()
            } else {
                await axios.patch(`/api/jobs/${jobId}/publish`)
                toast({
                    variant: "default",
                    title: "✅ Job published successfully"
                })
                router.refresh()
            }

            setLoading(false)
        } catch (e) {
            toast({
                variant: "destructive",
                title: "❌ Something went wrong",
                description: `Cannot ${isPublished ? "unpublish" : "publish"} the Job`
            })
        } finally {
            setLoading(false)
        }
    }

    const onDeleteClick = async () => {
        try {
            setLoading(true)
            const reponse = await axios.delete(`/api/jobs/${jobId}`)
            toast({
                variant: "default",
                title: "✅ Job deleted successfully"
            })
            router.refresh()

            if (reponse.data) {
                setLoading(true)
                await axios.delete("/api/uploadthing", {
                    data: {
                        url: job.imageURL,
                    },
                })

                if (Array.isArray(job.attachments) && job.attachments.length > 0) {
                    await Promise.all(
                        job.attachments.map(async (attachment: any) => {
                            await deleteUploadthingURL(attachment.url)
                        })
                    )
                }
                setLoading(false)

                return router.push("/admin/jobs")
            }
        } catch (e) {
            toast({
                variant: "destructive",
                title: "❌ Something went wrong",
                description: "Cannot delete the Job, try again!"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            <Button type="button" size="sm" variant="outline" disabled={disabled || loading} onClick={onPublishClick}>
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button disabled={loading} type="button" size="sm" variant="destructive"
                    onClick={onDeleteClick}>
                <Trash2Icon className="size-4"/>
            </Button>
        </div>
    );
}
