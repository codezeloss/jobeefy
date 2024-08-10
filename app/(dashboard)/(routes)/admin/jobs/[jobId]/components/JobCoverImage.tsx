"use client"

import {UploadthingDropzone} from "@/utils/uploadthing";
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Pencil} from "lucide-react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {useRouter} from "next/navigation";
import Image from "next/image";

interface Props {
    initialData: {
        imageURL: string
    },
    jobId: string
}

const formSchema = z.object({
    imageURL: z.string().min(2, {message: "Cover Image is required"}),
})

export default function JobCoverImage({initialData, jobId}: Props) {
    const {toast} = useToast()
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [uploadedCoverImg, setUploadedCoverImg] = useState("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageURL: initialData.imageURL || uploadedCoverImg
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
                                {!isEditing && (uploadedCoverImg !== "" || form.getValues().imageURL !== "") &&
                                    <Button type="button" size="sm" variant="ghost" onClick={toggleEditing}>
                                        <Pencil className="size-4"/>
                                    </Button>
                                }
                            </div>
                            <FormControl>
                                <div>
                                    <Image
                                        className="w-full h-full"
                                        src={uploadedCoverImg || form.getValues().imageURL}
                                        alt="Uploaded image"
                                        width={200}
                                        height={200}
                                    />

                                    {!uploadedCoverImg &&
                                        <UploadthingDropzone
                                            endpoint="jobCoverImage"
                                            onClientUploadComplete={(res) => {
                                                setUploadedCoverImg(res[0]?.serverData?.uploadedFile)
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
                                    }
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />


                <div className="flex items-center gap-x-2">
                    <Button type="submit" disabled={false}>Save</Button>
                    <Button type="button" variant="outline" onClick={toggleEditing}>Cancel</Button>
                </div>
            </form>
        </Form>

    );
}
