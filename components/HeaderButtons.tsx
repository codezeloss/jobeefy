"use client"

import {ClerkLoaded, ClerkLoading, UserButton} from "@clerk/nextjs";
import {Loader2} from "lucide-react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function HeaderButtons() {
    const pathname = usePathname()

    const isAdmin = pathname?.startsWith("/admin")
    const isUser = pathname?.startsWith("/jobs")

    return (
        <div>
            <ClerkLoaded>
                <div className="flex items-center text-sm gap-x-2">
                    <div className="">
                        {isAdmin || isUser ? (
                            <Link href="/">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="font-semibold text-blue-500 hover:text-blue-600 hover:bg-transparent"
                                >
                                    Job Seeker
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/admin/jobs">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="font-semibold text-blue-500 hover:text-blue-600 hover:bg-transparent"
                                >
                                    Talent Seeker
                                </Button>
                            </Link>
                        )}
                    </div>

                    <UserButton appearance={{
                        elements: {
                            avatarBox: "size-8",
                        },
                    }}/>
                </div>
            </ClerkLoaded>

            <ClerkLoading>
                <Loader2 className="size-8 animate-spin text-slate-400"/>
            </ClerkLoading>
        </div>
    );
}
