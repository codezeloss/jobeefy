"use client"

import Image from "next/image";
import {z} from "zod"
import {useToast} from "@/components/ui/use-toast";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Mail, Pencil, Phone, User2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";
import axios from "axios";
import {Button} from "@/components/ui/button";
import {useUser} from '@clerk/nextjs'
import {UserProfile} from "@prisma/client";

interface Props {
    initialData: UserProfile | null
    userId: string
}

const FormSchema = z.object({
    fullName: z.string(),
    email: z.string(),
    contact: z.string(),
})

export default function ProfileDetails({initialData, userId}: Props) {
    const {user} = useUser()
    const {toast} = useToast()
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullName: initialData?.fullName || "",
            email: initialData?.email || "",
            contact: initialData?.contact || "",
        },
    })

    const {isValid, isSubmitting} = form.formState

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        try {
            await axios.patch(`/api/users/${userId}`, values)
            toast({
                variant: "default",
                title: "✅ Profile updated successfully"
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
            <div className="w-full flex flex-col gap-4 items-center justify-start">
                <Image
                    src={(user?.hasImage && user?.imageUrl) ? user.imageUrl : "/placeholder.svg"}
                    alt="Profile image"
                    className="text-sm w-[250px] h-[250px] object-contain rounded-full border-2 border-black p-2"
                    width={250}
                    height={250}
                />
            </div>


            <div className="">
                <div className="flex items-center gap-x-2 mb-4">
                    <h2 className="font-semibold text-base">Profile Details</h2>

                    {!isEditing &&
                        <Button className="bg-transparent p-0" type="button" size="icon" variant="ghost"
                                onClick={toggleEditing}>
                            <Pencil className="size-3.5"/>
                        </Button>
                    }
                </div>


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        <div className="flex items-center gap-x-2">
                                            <User2 className="size-4"/>
                                            Full Name
                                        </div>
                                    </FormLabel>

                                    <FormControl>
                                        <Input type="text" disabled={!isEditing} {...field} />
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        <div className="flex items-center gap-x-2">
                                            <Mail className="size-4"/>
                                            Email address
                                        </div>
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="email" disabled={!isEditing} {...field} />
                                    </FormControl>

                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="contact"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        <div className="flex items-center gap-x-2">
                                            <Phone className="size-4"/>
                                            Phone Number
                                        </div>
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="tel" disabled={!isEditing} {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {isEditing &&
                            <div className="flex items-center gap-x-2">
                                <Button type="submit" size="sm" disabled={isSubmitting}>Save</Button>
                                <Button type="button" size="sm" variant="outline"
                                        onClick={toggleEditing}>Cancel</Button>
                            </div>
                        }
                    </form>
                </Form>
            </div>
        </div>
    );
}
