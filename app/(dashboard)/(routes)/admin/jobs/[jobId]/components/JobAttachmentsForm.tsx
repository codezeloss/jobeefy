"use client"

import {z} from "zod"
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormMessage,} from "@/components/ui/form"
import {Pencil} from "lucide-react";
import {useToast} from "@/components/ui/use-toast";
import axios from "axios";
import {UploadthingDropzone} from "@/utils/uploadthing";
import {Job} from "@prisma/client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import UploadedFile from "@/app/(dashboard)/(routes)/admin/jobs/[jobId]/components/UploadedFile";

interface Props {
    initialData: Job;
    jobId: string
}

const formSchema = z.object({
    attachments: z.object({url: z.string(), name: z.string()}).array(),
})


export default function JobAttachmentsForm({initialData, jobId}: Props) {
    const router = useRouter()
    const {toast} = useToast()
    const [isEditing, setIsEditing] = useState(false)
    const [removingLoading, setRemovingLoading] = useState(false)

    const initialAttachments = Array.isArray(initialData?.attachments)
        ? initialData.attachments.map((attachment: any) => {
            if (
                typeof attachment === "object" &&
                attachment !== null &&
                "url" in attachment &&
                "name" in attachment
            ) {
                return {url: attachment.url, name: attachment.name};
            }
            return {url: "", name: ""};
        })
        : [];

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            attachments: initialAttachments,
        },
    });

    const {isValid, isSubmitting} = form.formState

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.patch(`/api/jobs/${jobId}`, values)
            toast({
                variant: "default",
                title: "✅ Job updated successfully"
            })
            toggleEditing()
            router.refresh()
        } catch (e) {
            toast({
                variant: "destructive",
                title: "❌ Something went wrong!"
            })
        }
    }

    const toggleEditing = () => setIsEditing((current) => !current)

    const removeUploadedFile = async (url: string) => {
        try {
            setRemovingLoading(true)
            const response = await axios.delete("/api/uploadthing", {
                data: {
                    url: url,
                },
            });
            toast({
                variant: "default",
                title: "✅ File removed successfully"
            })

            const uploadedFiles = form.getValues().attachments
            form.setValue("attachments", uploadedFiles.filter(item => item.url !== url))
            setRemovingLoading(false)
        } catch (e) {
            toast({
                variant: "destructive",
                title: "❌ Something went wrong!",
                description: "Cannot delete the uploaded image"
            })
        } finally {
            setRemovingLoading(false)

        }
    }

    return (
        <div className="bg-slate-100/20 rounded p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Job Attachments (PDF)</p>
                {!isEditing &&
                    <Button type="button" size="icon" variant="secondary" onClick={toggleEditing}>
                        <Pencil className="size-3.5"/>
                    </Button>
                }
            </div>

            {!isEditing && initialAttachments ? (
                <div className="flex flex-col gap-y-2 my-3">
                    {initialAttachments.map((item, index) => (
                        <UploadedFile
                            key={index}
                            name={item.name}
                            onDelete={() => removeUploadedFile(item.url)}
                            loading={removingLoading}
                            isEditing={false}
                        />
                    ))}
                </div>
            ) : <p className="italic font-medium text-xs text-neutral-400">
                No uploaded files
            </p>
            }

            {isEditing &&
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="attachments"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <div>
                                            {form.getValues().attachments.length > 0 && (
                                                <div className="flex flex-col gap-y-2 mt-4 mb-8">
                                                    {form.getValues().attachments.map((item, index) => (
                                                        <UploadedFile
                                                            key={index}
                                                            name={item.name}
                                                            onDelete={() => removeUploadedFile(item.url)}
                                                            loading={removingLoading}
                                                            isEditing={true}
                                                        />
                                                    ))}
                                                </div>)
                                            }

                                            <UploadthingDropzone
                                                className="my-8"
                                                endpoint="jobAttachedFile"
                                                onClientUploadComplete={(res) => {
                                                    const uploadedFiles = [...form.getValues().attachments]
                                                    form.setValue("attachments", [...uploadedFiles, {
                                                        name: res[0]?.serverData?.uploadedFileName,
                                                        url: res[0]?.serverData?.uploadedFileURL
                                                    }])
                                                    toast({
                                                        variant: "default",
                                                        title: "✅ File uploaded successfully"
                                                    })
                                                }}
                                                onUploadError={(error: Error) => {
                                                    toast({
                                                        variant: "destructive",
                                                        title: "❌ Something went wrong!",
                                                        description: "File cannot be uploaded"
                                                    })
                                                }}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {isEditing &&
                            <div className="flex items-center gap-x-2">
                                <Button type="submit" size="sm" disabled={!isValid || isSubmitting}>Save</Button>
                                <Button type="button" size="sm" variant="outline"
                                        onClick={toggleEditing}>Cancel</Button>
                            </div>
                        }
                    </form>
                </Form>}
        </div>
    );
}
