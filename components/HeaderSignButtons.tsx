"use client"

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {SignedOut} from "@clerk/nextjs";

export default function HeaderSignButtons() {
    return (
        <SignedOut>
            <div className="flex items-center gap-x-2">
                <Link href="/sign-in">
                    <Button type="button" size="sm" variant="secondary">
                        Login
                    </Button>
                </Link>
                <Link href="/sign-up">
                    <Button type="button" size="sm" variant="default">
                        Register
                    </Button>
                </Link>
            </div>
        </SignedOut>
    );
}
