"use client"

import {Company} from "@prisma/client";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {truncate} from "lodash";
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import axios from "axios";
import {Loader2, Plus, X} from "lucide-react";

interface Props {
    company: Company
    companyId: string
    userId: string
}

export default function CompanyHeader({company, companyId, userId}: Props) {
    const {toast} = useToast();
    const router = useRouter();

    const [followLoading, setFollowLoading] = useState(false)

    const isUserFollower = userId && company.followers?.includes(userId)

    const handleFollow = async () => {
        try {
            setFollowLoading(true)

            if (isUserFollower) {
                await axios.patch(`/api/companies/${company.id}/unfollow`, {})
                toast({
                    variant: "default",
                    title: `✅ You've successfully unfollow ${company.name}`,
                })
            } else {
                await axios.patch(`/api/companies/${company.id}/follow`, {})
                toast({
                    variant: "default",
                    title: `✅ You're now following ${company.name}`
                })
            }

            router.refresh()
        } catch (e) {
            toast({
                variant: "destructive",
                title: "❌ Something went wrong!",
                description: "Cannot save the job, please try again."
            })
        } finally {
            setFollowLoading(false)
        }
    }

    return (
        <div className="relative bg-white w-full">
            <div className="">
                {company?.coverImage &&
                    <Image
                        className="w-full h-60 object-cover text-xs rounded-2xl"
                        src={company.coverImage}
                        alt="Cover image"
                        width={1000}
                        height={1000}
                        loading="eager"
                        quality={100}
                    />
                }
            </div>

            <div
                className="bg-white absolute z-40 px-8 w-full rounded-t-2xl -mt-20"
            >
                <div className="bg-white w-full flex items-center justify-between gap-x-4">
                    <div className="w-full flex items-center gap-x-4">
                        <div className="-mt-8">
                            {company?.logo &&
                                <Image
                                    className="bg-white min-w-[120px] h-[120px] border border-slate-200 p-2 rounded object-contain text-xs overflow-hidden"
                                    src={company.logo}
                                    alt="Logo image"
                                    width={100}
                                    height={100}
                                    loading="eager"
                                />
                            }
                        </div>
                        <div className="space-y-1">
                            <h2 className="font-semibold text-lg">{company.name} <span
                                className="text-neutral-400 font-normal text-xs ml-3">({company.followers.length}) followers</span>
                            </h2>
                            {company.description &&
                                <p className="text-xs font-normal text-neutral-400">{truncate(company.description, {
                                    length: 80,
                                    omission: "..."
                                })}</p>}
                        </div>
                    </div>


                    <Button
                        disabled={followLoading}
                        type="button"
                        variant={isUserFollower ? "outline" : "default"}
                        className=""
                        onClick={handleFollow}
                    >
                        {followLoading ? <Loader2 className="size-4 animate-spin"/>
                            :
                            <>
                            {!isUserFollower ?
                                <p className="flex items-center gap-x-2">
                                    <Plus className="size-4"/> Follow
                                </p> : <p className="flex items-center gap-x-2">
                                    <X className="size-4"/> Unfollow
                                </p>
                            }
                            </>
                        }
                    </Button>
                </div>
            </div>
        </div>
    );
}
