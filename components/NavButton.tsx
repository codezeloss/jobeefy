import {Button} from "@/components/ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {ReactElement} from "react";


type NavButtonProps = {
    href: string
    icon: ReactElement
    label: string
    isActive?: boolean
}

export default function NavButton({href, icon, label, isActive}: NavButtonProps) {
    return (
        <Button
            asChild
            size="sm"
            variant="outline"
            className={cn("w-full text-sm flex items-center gap-x-1.5 xl:text-base lg:w-auto justify-between hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition",
                isActive ? "bg-white/10 text-white font-semibold" : "bg-transparent font-medium")}
        >
            <Link href={href}>
                {icon} {label}
            </Link>
        </Button>
    );
}
