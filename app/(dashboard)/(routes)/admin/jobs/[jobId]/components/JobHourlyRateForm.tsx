"use client"

import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {DollarSignIcon, Pencil} from "lucide-react";
import {useToast} from "@/components/ui/use-toast";
import axios from "axios";

interface Props {
    initialData: {
        hourlyRate: string | null
    },
    jobId: string
}

const formSchema = z.object({
    hourlyRate: z.string(),
})


export default function JobHourlyRateForm({initialData, jobId}: Props) {
    const router = useRouter()
    const {toast} = useToast()
    const [isEditing, setIsEditing] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            hourlyRate: initialData.hourlyRate || ""
        },
    })

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

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 bg-slate-100/20 rounded p-4 border border-slate-200"
            >
                <FormField
                    control={form.control}
                    name="hourlyRate"
                    render={({field}) => (
                        <FormItem>
                            <div className="flex items-center justify-between mb-2">
                                <FormLabel>Job Hourly Rate</FormLabel>
                                {!isEditing &&
                                    <Button type="button" size="icon" variant="secondary" onClick={toggleEditing}>
                                        <Pencil className="size-3.5"/>
                                    </Button>
                                }
                            </div>
                            <FormControl>
                                <div className="flex items-center gap-x-2">
                                    <DollarSignIcon className="size-4"/>
                                    <Input
                                        className="w-[90px]"
                                        disabled={!isEditing || isSubmitting}
                                        type="number"
                                        placeholder="Enter an Hourly Rate"
                                        {...field}
                                    />
                                    <p className="w-[5%] text-sm">/hr</p>
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {isEditing &&
                    <div className="flex items-center gap-x-2">
                        <Button type="submit" disabled={!isValid || isSubmitting}>Save</Button>
                        <Button type="button" variant="outline" onClick={toggleEditing}>Cancel</Button>
                    </div>
                }
            </form>
        </Form>
    );
}
