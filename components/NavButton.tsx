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
            className={cn("w-full text-sm flex items-center gap-x-1.5 lg:w-auto justify-between dark:hover:bg-blue-100 hover:bg-blue-100/50 dark:hover:text-white hover:text-black border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-black dark:text-white focus:bg-blue-100 transition",
                isActive ? "bg-blue-100/50 dark:bg-white/10 text-black dark:text-white font-medium" : "bg-transparent font-normal")}
        >
            <Link href={href}>
                {icon} {label}
            </Link>
        </Button>
    );
}
