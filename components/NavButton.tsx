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
            className={cn("w-full text-sm flex items-center gap-x-1.5 lg:w-auto justify-between dark:hover:bg-white/20 hover:bg-black/20 dark:hover:text-white hover:text-black border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-black dark:text-white focus:bg-white/30 transition",
                isActive ? "bg-black/10 dark:bg-white/10 text-black dark:text-white font-semibold" : "bg-transparent font-medium")}
        >
            <Link href={href}>
                {icon} {label}
            </Link>
        </Button>
    );
}
