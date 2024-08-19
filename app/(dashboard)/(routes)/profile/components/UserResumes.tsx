"use client"

import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {UserProfile} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {Pencil} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {UploadthingDropzone} from "@/utils/uploadthing";
import UploadedFile from "@/app/(dashboard)/(routes)/profile/components/UploadFile";

interface Props {
    initialData: UserProfile | null
    userId: string
}

const formSchema = z.object({
    resumes: z.object({url: z.string(), name: z.string(), active: z.boolean()}).array(),
})

export default function UserResumes({initialData, userId}: Props) {
    const router = useRouter()
    const {toast} = useToast()
    const [isEditing, setIsEditing] = useState(false)
    const [removingLoading, setRemovingLoading] = useState(false)

    const initialResumes = Array.isArray(initialData?.resumes)
        ? initialData.resumes.map((resume: any) => {
            if (
                typeof resume === "object" &&
                resume !== null &&
                "url" in resume &&
                "name" in resume &&
                "active" in resume
            ) {
                return {url: resume.url, name: resume.name, active: resume.active};
            }
            return {url: "", name: "", active: false};
        })
        : [];

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            resumes: initialResumes,
        },
    });

    const {isValid, isSubmitting} = form.formState

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await axios.patch(`/api/users/${userId}/resumes`, values)
            toast({
                variant: "default",
                title: "✅ Resume updated successfully"
            })
            toggleEditing()
            router.refresh()
        } catch (e) {
            toast({
                variant: "destructive",
                title: "❌ Something went wrong!",
                description: "Cannot update the resume, please try again."
            })
        }
    }

    const toggleEditing = () => setIsEditing((current) => !current)

    const removeUploadedFile = async (url: string) => {
        try {
            setRemovingLoading(true)
            await axios.delete("/api/uploadthing", {
                data: {
                    url: url,
                },
            });
            toast({
                variant: "default",
                title: "✅ File removed successfully"
            })

            const uploadedFiles = form.getValues().resumes
            form.setValue("resumes", uploadedFiles.filter(item => item.url !== url))
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

    const handleResumeActivation = (index: number) => {
        let resumes = form.getValues().resumes.map((resume, i) => ({
            ...resume,
            active: i === index ? !resume.active : false,
        }));

        resumes = resumes.sort((a: any, b: any) => b.active - a.active);
        form.setValue('resumes', resumes);
    }

    console.log(initialResumes.filter(item => item.active === true).length)


    return (
        <div>
            <div className="flex items-center gap-x-2 mb-4">
                <h2 className="font-semibold text-base">Your Resumes</h2>
                {!isEditing &&
                    <Button className="bg-transparent p-0" type="button" size="icon" variant="ghost"
                            onClick={toggleEditing}>
                        <Pencil className="size-3.5"/>
                    </Button>
                }
            </div>

            {!isEditing &&
                initialResumes.filter(item => item.active === true).length === 0 &&
                <p className="italic font-medium text-xs text-neutral-400 mb-4">
                    No active resume
                </p>
            }

            {(!isEditing &&
                initialResumes.length > 0) && (
                <div className="flex flex-col gap-y-2 mb-3">
                    {initialResumes.map((item, index) => (
                        <UploadedFile
                            key={index}
                            name={item.name}
                            active={item.active}
                            onDelete={() => removeUploadedFile(item.url)}
                            loading={removingLoading}
                            isEditing={false}
                        />
                    ))}
                </div>
            )
            }

            {isEditing && initialResumes.length === 0 &&
                <p className="italic font-medium text-xs text-neutral-400 mb-4">
                    No uploaded resume
                </p>
            }

            {isEditing &&
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="resumes"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <div>
                                            {form.getValues().resumes.length > 0 ? (
                                                    <div className="flex flex-col gap-y-2 mt-4 mb-8">
                                                        {form.getValues().resumes.map((item, index) => (
                                                            <UploadedFile
                                                                key={index}
                                                                name={item.name}
                                                                active={item.active}
                                                                onDelete={() => removeUploadedFile(item.url)}
                                                                onStatusClick={() => handleResumeActivation(index)}
                                                                loading={removingLoading}
                                                                isEditing={true}
                                                            />
                                                        ))}
                                                    </div>) :
                                                <p className="italic font-medium text-xs text-neutral-400">
                                                    No uploaded resumes
                                                </p>
                                            }

                                            <UploadthingDropzone
                                                className="my-8"
                                                endpoint="profileAttachedResume"
                                                onClientUploadComplete={(res) => {
                                                    const uploadedFiles = [...form.getValues().resumes]
                                                    form.setValue("resumes", [...uploadedFiles, {
                                                        name: res[0]?.serverData?.uploadedFileName,
                                                        url: res[0]?.serverData?.uploadedFileURL,
                                                        active: false
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
                                        onClick={toggleEditing} disabled={isSubmitting}>Cancel
                                </Button>
                            </div>
                        }
                    </form>
                </Form>
            }
        </div>
    );
}
