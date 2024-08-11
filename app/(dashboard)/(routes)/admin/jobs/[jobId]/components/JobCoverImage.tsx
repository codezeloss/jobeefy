"use client"

import {UploadthingDropzone} from "@/utils/uploadthing";
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Pencil, Trash2Icon} from "lucide-react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {useRouter} from "next/navigation";
import Image from "next/image";

interface Props {
    initialData: {
        imageURL: string | null
    },
    jobId: string
}

const formSchema = z.object({
    imageURL: z.string(),
})

export default function JobCoverImage({initialData, jobId}: Props) {
    const {toast} = useToast()
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageURL: initialData.imageURL || ""
        },
    })

    const {isValid, isSubmitting} = form.formState

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.patch(`/api/jobs/${jobId}`, values)
            toast({
                variant: "default",
                title: "Job updated successfully"
            })
            toggleEditing()
            router.refresh()
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Something went wrong!"
            })
        }
    }

    const toggleEditing = () => setIsEditing((current) => !current)

    const removeUploadedImg = async () => {
        try {
            const response = await axios.delete("/api/uploadthing", {
                data: {
                    url: form.getValues().imageURL,
                },
            });
            toast({
                variant: "default",
                title: "Image removed successfully"
            })
            form.setValue("imageURL", "")
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Something went wrong!",
                description: "Cannot delete the uploaded image"
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 bg-slate-100/20 rounded p-4 border border-slate-200">
                <FormField
                    control={form.control}
                    name="imageURL"
                    render={({field}) => (
                        <FormItem>
                            <div className="flex items-center justify-between mb-2">
                                <FormLabel>Job Cover image</FormLabel>
                                {!isEditing &&
                                    <Button type="button" size="icon" variant="ghost" onClick={toggleEditing}>
                                        <Pencil className="size-3.5"/>
                                    </Button>
                                }
                            </div>
                            <FormControl>
                                <div>
                                    {isEditing && form.getValues().imageURL === "" ?
                                        <div className="space-y-2.5">
                                            <UploadthingDropzone
                                                endpoint="jobCoverImage"
                                                onClientUploadComplete={(res) => {
                                                    form.setValue("imageURL", res[0]?.serverData?.uploadedFile)
                                                    toast({
                                                        variant: "default",
                                                        title: "Image uploaded successfully"
                                                    })
                                                }}
                                                onUploadError={(error: Error) => {
                                                    toast({
                                                        variant: "destructive",
                                                        title: "Something went wrong!",
                                                        description: "Image cannot be uploaded"
                                                    })
                                                }}
                                            />
                                            <p className="text-xs font-medium text-neutral-400">
                                                16:9 aspect ration recommended
                                            </p>
                                        </div> : (isEditing && form.getValues().imageURL !== "") ?
                                            <div className="relative">
                                                <Image
                                                    className="w-full h-full rounded"
                                                    src={form.getValues().imageURL}
                                                    alt="Uploaded image"
                                                    width={400}
                                                    height={400}
                                                    loading="lazy"
                                                />
                                                <Button
                                                    type="button"
                                                    size="icon"
                                                    variant="destructive"
                                                    onClick={removeUploadedImg}
                                                    className="z-20 absolute top-3 right-3"
                                                >
                                                    <Trash2Icon className="size-4"/>
                                                </Button>
                                            </div> :
                                            <div>
                                                {form.getValues().imageURL !== "" ?
                                                    <Image
                                                        className="w-full h-full rounded"
                                                        src={form.getValues().imageURL}
                                                        alt="Uploaded image"
                                                        width={400}
                                                        height={400}
                                                        loading="lazy"
                                                    /> :
                                                    <p className="italic font-medium text-xs text-neutral-400">
                                                        No image uploaded
                                                    </p>
                                                }
                                            </div>
                                    }
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />


                {isEditing && <div className="flex items-center gap-x-2">
                    <Button type="submit" disabled={!isValid || isSubmitting}>Save</Button>
                    <Button type="button" variant="outline" onClick={toggleEditing}>Cancel</Button>
                </div>}
            </form>
        </Form>

    );
}
