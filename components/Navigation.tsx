"use client"

import NavButton from "@/components/NavButton";
import {usePathname, useRouter} from "next/navigation";
import {Sheet, SheetContent, SheetTrigger,} from "@/components/ui/sheet"
import {useMedia} from "react-use"
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {BookmarkCheck, Building2, ChartNoAxesCombined, Compass, House, List, Menu, User} from "lucide-react";

const userRoutes = [
    {
        href: "/",
        label: "Home",
        icon: <House size={18}/>
    },
    {
        href: "/browse",
        label: "Browse",
        icon: <Compass size={18}/>
    },
    {
        href: "/profile",
        label: "Profile",
        icon: <User size={18}/>
    },
    {
        href: "/saved",
        label: "Saved Jobs",
        icon: <BookmarkCheck size={18}/>
    }
]
const adminRoutes = [
    {
        href: "/admin/jobs",
        label: "Jobs",
        icon: <List size={18}/>
    },
    {
        href: "/admin/companies",
        label: "Companies",
        icon: <Building2 size={18}/>
    },
    {
        href: "/admin/analytics",
        label: "Analytics",
        icon: <ChartNoAxesCombined size={18}/>
    }
]

export default function Navigation() {
    const pathname = usePathname()
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)

    const isMobile = useMedia("(max-width: 1024px)", false)
    const isAdmin = pathname?.startsWith("/admin")
    const routes = isAdmin ? adminRoutes : userRoutes

    const onClick = (href: string) => {
        router.push(href)
        setIsOpen(false)
    }

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger>
                    <Button variant="outline" size="sm"
                            className="font-normal dark:bg-white/10 dark:hover:bg-white/20 dark:hover:text-white bg-slate-200 hover:bg-slate-100 hover:text-black border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none dark:text-white text-black dark:focus:bg-white/30 focus:bg-slate-200 transition">
                        <Menu className="size-4"/>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="px-2">
                    <nav className="flex flex-col gap-y-2 pt-6">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.href === pathname ? "secondary" : "ghost"}
                                onClick={() => onClick(route.href)}
                                className="w-full justify-start flex items-center gap-x-2"
                            >
                                {route.icon} {route.label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        )
    } else {
        return (
            <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
                {routes.map((route, index) => (
                    <NavButton
                        key={index}
                        href={route.href}
                        label={route.label}
                        icon={route.icon}
                        isActive={pathname === route.href}
                    />
                ))}
            </nav>
        );
    }
}
