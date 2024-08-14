"use client"

import {UploadthingDropzone} from "@/utils/uploadthing";
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Loader2, Pencil, Trash2Icon} from "lucide-react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {useRouter} from "next/navigation";
import Image from "next/image";

interface Props {
    initialData: {
        logo: string | null
    },
    companyId: string
}

const formSchema = z.object({
    logo: z.string(),
})

export default function CompanyLogoForm({initialData, companyId}: Props) {
    const {toast} = useToast()
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            logo: initialData.logo || ""
        },
    })

    const {isValid, isSubmitting} = form.formState

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true)
            const response = await axios.patch(`/api/companies/${companyId}`, values)
            toast({
                variant: "default",
                title: "✅ Company updated successfully"
            })
            toggleEditing()
            router.refresh()
        } catch (e) {
            toast({
                variant: "destructive",
                title: "❌ Something went wrong!"
            })
        } finally {
            setLoading(false)
        }
    }

    const toggleEditing = () => setIsEditing((current) => !current)

    const removeUploadedImg = async () => {
        try {
            setLoading(true)
            const response = await axios.delete("/api/uploadthing", {
                data: {
                    url: form.getValues().logo,
                },
            });
            toast({
                variant: "default",
                title: "✅ Logo deleted successfully"
            })
            form.setValue("logo", "")
        } catch (e) {
            toast({
                variant: "destructive",
                title: "❌ Something went wrong!",
                description: "Cannot delete the uploaded logo"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 bg-slate-100/20 rounded p-4 border border-slate-200">
                <FormField
                    control={form.control}
                    name="logo"
                    render={({field}) => (
                        <FormItem>
                            <div className="flex items-center justify-between mb-2">
                                <FormLabel>Company Logo Image</FormLabel>
                                {!isEditing &&
                                    <Button type="button" size="icon" variant="secondary" onClick={toggleEditing}>
                                        <Pencil className="size-3.5"/>
                                    </Button>
                                }
                            </div>
                            <FormControl>
                                <div>
                                    {isEditing && form.getValues().logo === "" ?
                                        <div className="space-y-2.5">
                                            <UploadthingDropzone
                                                endpoint="companyLogoImage"
                                                onClientUploadComplete={(res) => {
                                                    form.setValue("logo", res[0]?.serverData?.uploadedFile)
                                                    toast({
                                                        variant: "default",
                                                        title: "✅ Logo uploaded successfully"
                                                    })
                                                }}
                                                onUploadError={(error: Error) => {
                                                    toast({
                                                        variant: "destructive",
                                                        title: "❌ Something went wrong!",
                                                        description: "Logo cannot be uploaded"
                                                    })
                                                }}
                                            />
                                            <p className="text-xs font-medium text-neutral-400">
                                                16:9 aspect ration recommended
                                            </p>
                                        </div> : (isEditing && form.getValues().logo !== "") ?
                                            <div className="relative p-4">
                                                <Image
                                                    className="text-xs mx-auto w-[200px] h-[200px]"
                                                    src={form.getValues().logo}
                                                    alt="Uploaded image"
                                                    width={100}
                                                    height={100}
                                                    loading="lazy"
                                                />
                                                {loading ?
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        className="z-20 absolute top-3 right-3"
                                                        disabled={isSubmitting || loading}
                                                    >
                                                        <Loader2 className="size-4 animate-spin"/>
                                                    </Button> :
                                                    <Button
                                                        type="button"
                                                        size="icon"
                                                        variant="destructive"
                                                        onClick={removeUploadedImg}
                                                        className="z-20 absolute top-3 right-3"
                                                    >
                                                        <Trash2Icon className="size-4"/>
                                                    </Button>
                                                }
                                            </div> :
                                            <div>
                                                {form.getValues().logo !== "" ?
                                                    <Image
                                                        className="text-xs mx-auto w-[200px] h-[200px]"
                                                        src={form.getValues().logo}
                                                        alt="Uploaded image"
                                                        width={100}
                                                        height={100}
                                                        loading="lazy"
                                                    /> :
                                                    <p className="italic font-medium text-xs text-neutral-400">
                                                        No logo uploaded
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
                    <Button type="submit" size="sm" disabled={!isValid || isSubmitting}>Save</Button>
                    <Button type="button" size="sm" variant="outline" onClick={toggleEditing}>Cancel</Button>
                </div>}
            </form>
        </Form>

    );
}
