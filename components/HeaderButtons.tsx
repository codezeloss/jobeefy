"use client"

import {ClerkLoaded, ClerkLoading, UserButton} from "@clerk/nextjs";
import {Loader2, LockKeyhole, LogOut} from "lucide-react";
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
                <div className="flex items-center text-sm gap-2">
                    <div className="">
                        {isAdmin || isUser ? (
                            <Link href="/">
                                <Button variant="outline" size="sm" className="flex items-center gap-x-1">
                                    <LogOut size={18}/>
                                    <p>Exit</p>
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/admin/jobs">
                                <Button variant="outline" size="sm" className="flex items-center gap-x-1">
                                    <LockKeyhole size={16}/> Admin Mode
                                </Button>
                            </Link>
                        )}
                    </div>

                    <UserButton appearance={{
                        elements: {
                            avatarBox: "size-9",
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
