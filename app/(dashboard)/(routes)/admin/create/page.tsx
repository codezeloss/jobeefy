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
    title: z.string().min(2, {message: "Job Title cannot be empty!"}).max(50),
})

export default function JobCreatePage() {
    const {toast} = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    const {isSubmitting, isValid} = form.formState

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.post("/api/jobs", values)
            router.push(`/admin/jobs/${response.data.id}`)
            toast({
                variant: "default",
                description: "✅ Your Job has been created",
            })
        } catch (error) {
            console.log((error as Error)?.message)
            toast({
                variant: "destructive",
                title: "❌ Uh oh! Something went wrong.",
                description: "Your Job cannot be created."
            })
        }
    }

    return (
        <div className="max-w-lg mx-auto w-full h-[70vh] flex items-center justify-center p-6">
            <div>
                <div className="w-full h-full flex flex-col mb-4">
                    <h1 className="font-semibold text-lg md:text-2xl mb-1">Name your Job</h1>
                    <p className="text-xs md:text-sm font-normal text-slate-500">What would like to name your job?
                        Don&apos;t
                        worry,
                        you can change it
                        later!
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Job Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder='e.g. "FullStack Web Developer"... '
                                            className="w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Role of this Job
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/admin/jobs">
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