"use client"

import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Earth, Mail, MapPin, Pencil} from "lucide-react";
import {useToast} from "@/components/ui/use-toast";
import axios from "axios";
import {Company} from "@prisma/client";
import {Input} from "@/components/ui/input";
import {LinkedInLogoIcon} from "@radix-ui/react-icons";

interface Props {
    initialData: Company,
    companyId: string
}

const formSchema = z.object({
    mail: z.string().min(2, {message: "Mail is required"}),
    website: z.string().min(2, {message: "Website is required"}),
    linkedin: z.string().min(2, {message: "LinkedIn is required"}),
    address_line_1: z.string().min(2, {message: "Address Line 1 is required"}),
    address_line_2: z.string().min(2, {message: "Address Line 2 is required"}),
    city: z.string().min(2, {message: "City is required"}),
    state: z.string().min(2, {message: "State is required"}),
    zipCode: z.string().min(2, {message: "Zip Code is required"}),
})


export default function companySocialsForm({initialData, companyId}: Props) {
    const router = useRouter()
    const {toast} = useToast()
    const [isEditing, setIsEditing] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            mail: initialData.mail || "",
            website: initialData.website || "",
            linkedin: initialData.linkedin || "",
            address_line_1: initialData.address_line_1 || "",
            address_line_2: initialData.address_line_2 || "",
            city: initialData.city || "",
            state: initialData.state || "",
            zipCode: initialData.zipCode || "",
        },
    })

    const {isValid, isSubmitting} = form.formState

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
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
        }
    }

    const toggleEditing = () => setIsEditing((current) => !current)

    return (
        <div className="bg-slate-100/20 rounded p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Company Socials</p>
                {!isEditing &&
                    <Button type="button" size="icon" variant="secondary" onClick={toggleEditing}>
                        <Pencil className="size-3.5"/>
                    </Button>
                }
            </div>

            {!isEditing && (
                <div className="flex flex-col space-y-3">
                    {initialData.mail && <div className="flex items-center gap-x-2">
                        <Mail className="size-3.5"/>
                        <p className="text-xs font-medium">{initialData.mail}</p>
                    </div>}
                    {initialData.website && <div className="flex items-center gap-x-2">
                        <Earth className="size-3.5 font-medium"/>
                        <p className="text-xs font-medium">{initialData.website}</p>
                    </div>}
                    {initialData.linkedin && <div className="flex items-center gap-x-2">
                        <LinkedInLogoIcon className="size-3.5 font-medium"/>
                        <p className="text-xs font-medium">{initialData.linkedin}</p>
                    </div>}
                    {(initialData.address_line_1 || initialData.address_line_2) &&
                        <div className="flex items-start gap-x-2">
                            <MapPin className="size-3.5 font-medium"/>
                            <div className="flex flex-col gap-y-1">
                                {initialData.address_line_1 &&
                                    <p className="text-xs font-medium">{initialData.address_line_1}</p>}
                                {initialData.address_line_2 &&
                                    <p className="text-xs font-medium">{initialData.address_line_2}</p>}
                            </div>
                        </div>}
                </div>
            )}


            {isEditing &&
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-3"
                    >
                        <FormField
                            control={form.control}
                            name="mail"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            disabled={!isEditing || isSubmitting}
                                            placeholder="example@company.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="website"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Website</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={!isEditing || isSubmitting}
                                            placeholder="www.company.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="linkedin"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-xs">LinkedIn</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={!isEditing || isSubmitting}
                                            placeholder="www.linkedin.com/company"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address_line_1"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Address Line 1</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={!isEditing || isSubmitting}
                                            placeholder="www.linkedin.com/company"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address_line_2"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Address Line 2</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={!isEditing || isSubmitting}
                                            placeholder="www.linkedin.com/company"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-3 gap-x-3 5">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-xs">City</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={!isEditing || isSubmitting}
                                                placeholder="New York"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="zipCode"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-xs">Zip Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={!isEditing || isSubmitting}
                                                placeholder="10000"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="state"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-xs">State</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={!isEditing || isSubmitting}
                                                placeholder="Albany"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>

                        {isEditing &&
                            <div className="flex items-center gap-x-2">
                                <Button type="submit" size="sm" disabled={!isValid || isSubmitting}>Save</Button>
                                <Button type="button" size="sm" variant="outline"
                                        onClick={toggleEditing}>Cancel</Button>
                            </div>
                        }
                    </form>
                </Form>
            }
        </div>
    );
}

