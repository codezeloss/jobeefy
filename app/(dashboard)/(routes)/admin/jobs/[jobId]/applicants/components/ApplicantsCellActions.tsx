"use client"

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Ban, Check, Loader, MoreHorizontal} from "lucide-react";
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";

interface Props {
    id: number
    fullName: string
    email: string
}

export default function ApplicantsCellActions({id, fullName, email}: Props) {
    const router = useRouter()
    const {toast} = useToast()

    const [isSelectedLoading, setIsSelectedLoading] = useState(false)
    const [isRejectedLoading, setIsRejectedLoading] = useState(false)

    const handleSendSelection = async () => {
        try {
            setIsSelectedLoading(true)

            await axios.post("/api/selection", {
                fullName: fullName,
                email: email
            })

            toast({
                variant: "default",
                title: "✅ Applicant selected successfully",
                description: "A selection mail will be sent to the applicant inbox"
            })

            router.refresh()
        } catch (e) {
            toast({
                variant: "destructive",
                title: "❌ Something went wrong!",
                description: "Cannot select the applicant, please try again."
            })
        } finally {
            setIsSelectedLoading(false)
        }
    }

    const handleSendRejection = async () => {
        try {
            setIsRejectedLoading(true)

            await axios.post("/api/rejection", {
                fullName: fullName,
                email: email
            })

            toast({
                variant: "default",
                title: "✅ Applicant rejected successfully",
                description: "A rejection mail will be sent to the applicant inbox"
            })

            router.refresh()
        } catch (e) {
            toast({
                variant: "destructive",
                title: "❌ Something went wrong!",
                description: "Cannot reject the applicant, please try again."
            })
        } finally {
            setIsRejectedLoading(false)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {isSelectedLoading ? (
                    <DropdownMenuItem disabled={isSelectedLoading || isRejectedLoading}
                                      className="text-sm flex flex-row gap-x-2 text-green-600 font-semibold">
                        <Loader className="size-4"/>
                        Selection...
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem
                        disabled={isSelectedLoading || isRejectedLoading}
                        className="text-sm flex flex-row gap-x-2 text-green-600 font-semibold"
                        onClick={handleSendSelection}
                    >
                        <Check className="size-4"/>
                        Selected
                    </DropdownMenuItem>
                )}

                {isRejectedLoading ? (
                    <DropdownMenuItem disabled={isSelectedLoading || isRejectedLoading}
                                      className="text-sm flex flex-row gap-x-2 text-green-600 font-semibold">
                        <Loader className="size-4"/>
                        Rejection...
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem
                        disabled={isSelectedLoading || isRejectedLoading}
                        className="text-sm flex flex-row gap-x-2 text-red-600 font-semibold"
                        onClick={handleSendRejection}
                    >
                        <Ban className="size-4"/>
                        Rejected
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
