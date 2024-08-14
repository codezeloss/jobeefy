"use client"

import {Button} from "@/components/ui/button";
import {Trash2Icon} from "lucide-react";
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Company} from "@prisma/client";

interface Props {
    disabled: boolean,
    company: Company,
    companyId: string,
    isPublished?: boolean
}

export default function CompanyActions({disabled, companyId, company, isPublished}: Props) {
    const {toast} = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const onDeleteClick = async () => {
        try {
            setLoading(true)
            const reponse = await axios.delete(`/api/companies/${companyId}`)
            toast({
                variant: "default",
                title: "✅ Company deleted successfully"
            })
            router.refresh()

            if (reponse.data) {
                setLoading(true)
                await axios.delete("/api/uploadthing", {
                    data: {
                        url: company.coverImage,
                    },
                })
                await axios.delete("/api/uploadthing", {
                    data: {
                        url: company.logo,
                    },
                })

                setLoading(false)

                return router.push("/admin/companies")
            }
        } catch (e) {
            toast({
                variant: "destructive",
                title: "❌ Something went wrong",
                description: "Cannot delete the Company, try again!"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            <Button className="hidden" type="button" size="sm" variant="outline" disabled={disabled || loading}
                    onClick={() => {
                    }}>
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <Button disabled={loading} type="button" size="sm" variant="destructive"
                    onClick={onDeleteClick}>
                <Trash2Icon className="size-4"/>
            </Button>
        </div>
    );
}
