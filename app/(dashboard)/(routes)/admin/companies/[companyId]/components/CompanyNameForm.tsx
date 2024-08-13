"use client"

import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Pencil} from "lucide-react";
import {useToast} from "@/components/ui/use-toast";
import axios from "axios";

interface Props {
    initialData: {
        name: string
    },
    companyId: string
}

const formSchema = z.object({
    name: z.string().min(2, {message: "Name required"}).max(50),
})


export default function CompanyNameForm({initialData, companyId}: Props) {
    const router = useRouter()
    const {toast} = useToast()
    const [isEditing, setIsEditing] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData.name
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
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 bg-slate-100/20 rounded p-4 border border-slate-200"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <div className="flex items-center justify-between mb-2">
                                <FormLabel>Company Name</FormLabel>
                                {!isEditing &&
                                    <Button type="button" size="icon" variant="secondary" onClick={toggleEditing}>
                                        <Pencil className="size-3.5"/>
                                    </Button>
                                }
                            </div>
                            <FormControl>
                                <Input disabled={!isEditing || isSubmitting} placeholder="Microsoft" {...field} />
                            </FormControl>
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
