"use client"

import Image from "next/image";
import {z} from "zod"
import {useToast} from "@/components/ui/use-toast";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Mail, Phone, User2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";
import axios from "axios";


const FormSchema = z.object({
    profileImage: z.string(),
})

export default function ProfileDetails() {
    const {toast} = useToast()
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            profileImage: "",
        },
    })

    const {isValid, isSubmitting} = form.formState

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        try {
            const response = await axios.patch(`/api/companies`, values)
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
        }
    }

    const toggleEditing = () => setIsEditing((current) => !current)


    return (
        <div className="grid grid-cols-2 justify-between py-8">
            <div className="w-full flex flex-col gap-4 items-center justify-center">
                <Image
                    src="https://utfs.io/f/90627169-c98c-4dc2-999f-2ff2818ca0e7-rhubr9.svg"
                    alt="Profile image"
                    className="text-sm w-[200px] h-[200px] object-contain rounded-full border-2 border-black p-2"
                    width={200}
                    height={200}
                />
            </div>


            <div className="">
                <h2 className="font-semibold text-lg mb-4">Profile Details</h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                        <FormField
                            control={form.control}
                            name="profileImage"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        <div className="flex items-center gap-x-2">
                                            <User2 className="size-4"/>
                                            Full Name
                                        </div>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="profileImage"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        <div className="flex items-center gap-x-2">
                                            <Mail className="size-4"/>
                                            Email
                                        </div>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="profileImage"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        <div className="flex items-center gap-x-2">
                                            <Phone className="size-4"/>
                                            Phone Number
                                        </div>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>
        </div>
    );
}
