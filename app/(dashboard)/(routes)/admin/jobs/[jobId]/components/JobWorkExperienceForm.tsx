"use client"

import {Job} from "@prisma/client";
import {z} from "zod";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {Button} from "@/components/ui/button";
import {Pencil} from "lucide-react";

interface Props {
    initialData: Job,
    jobId: string
}

const formSchema = z.object({
    yearsOfExperience: z.string(),
})

let options = [
    {
        value: "0",
        label: "Fresher",
    },
    {
        value: "2",
        label: "0-2 years",
    },
    {
        value: "3",
        label: "2-4 years",
    },
    {
        value: "5",
        label: "+5 years",
    }
]

export default function JobWorkExperienceForm({initialData, jobId}: Props) {
    const router = useRouter()
    const {toast} = useToast()
    const [isEditing, setIsEditing] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            yearsOfExperience: initialData?.yearsOfExperience || ""
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
            <form onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 bg-slate-100/20 rounded p-4 border border-slate-200">
                <FormField
                    control={form.control}
                    name="yearsOfExperience"
                    render={({field}) => (
                        <FormItem className="flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <FormLabel>Job Work Experience</FormLabel>
                                {!isEditing &&
                                    <Button type="button" size="icon" variant="secondary" onClick={toggleEditing}>
                                        <Pencil className="size-3.5"/>
                                    </Button>
                                }
                            </div>


                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full" disabled={isSubmitting || !isEditing}>
                                        <SelectValue placeholder="Select an option..."/>
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    <SelectGroup>
                                        {options.map((option, index) => (
                                            <SelectItem
                                                key={index}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {isEditing &&
                    <div className="flex items-center gap-x-2">
                        <Button type="submit" size="sm" disabled={!isValid || isSubmitting}>Save</Button>
                        <Button type="button" size="sm" variant="outline" onClick={toggleEditing}>Cancel</Button>
                    </div>
                }
            </form>
        </Form>
    );
}
