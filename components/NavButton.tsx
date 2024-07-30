import {Button} from "@/components/ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils";


type NavButtonProps = {
    href: string
    label: string
    isActive?: boolean
}

export default function NavButton({href, label, isActive}: NavButtonProps) {
    return (
        <Button asChild size="sm" variant="outline"
                className={cn("w-full text-sm xl:text-base lg:w-auto justify-between hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition",
                    isActive ? "bg-white/10 text-white font-semibold" : "bg-transparent font-medium")}>
            <Link href={href}>{label}</Link>
        </Button>
    );
}
