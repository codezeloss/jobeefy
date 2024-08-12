"use client"

import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import Link from "next/link";
import axios from "axios";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    name: z.string().min(2, {message: "Company Name cannot be empty!"}).max(50),
})

export default function CreateCompanyPage() {
    const {toast} = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    const {isSubmitting, isValid} = form.formState

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.post("/api/companies", values)
            router.push(`/admin/companies/${response.data.id}`)
            toast({
                description: "✅ Company has been created",
            })
        } catch (error) {
            console.log((error as Error)?.message)
            toast({
                variant: "destructive",
                title: "❌ Uh oh! Something went wrong.",
                description: "Your Company cannot be created."
            })
        }
    }

    return (
        <div className="max-w-lg mx-auto w-full h-[70vh] flex items-center justify-center p-6">
            <div>
                <div className="w-full h-full flex flex-col mb-4">
                    <h1 className="font-semibold text-lg md:text-2xl mb-1">Company Name</h1>
                    <p className="text-xs md:text-sm font-normal text-slate-500">
                        What would like to name your company? Don't worry, you can change it later!
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder='e.g. "Microsoft"... '
                                            className="w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        The Name of Company
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/admin/companies">
                                <Button type="button" variant="outline" disabled={isSubmitting}>Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={isSubmitting || !isValid}>Submit</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};