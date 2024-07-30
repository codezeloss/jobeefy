import HeaderLogo from "@/components/HeaderLogo";
import Navigation from "@/components/Navigation";
import {ClerkLoaded, ClerkLoading, UserButton} from "@clerk/nextjs";
import {Loader2} from "lucide-react";
import WelcomeMsg from "@/components/WelcomeMsg";
import {ModeToggle} from "@/components/ModeToggle";

export default function Header() {
    return (
        <div className="bg-gradient-to-b from-emerald-600 to-emerald-500 px-4 py-8 lg:px-14 pb-36">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between mb-14">
                    <div className="flex items-center lg:gap-x-16">
                        <HeaderLogo/>
                        <Navigation/>
                    </div>

                    <div className="">
                        <ClerkLoaded>
                            <div className="flex items-center text-sm gap-2">
                                <UserButton appearance={{
                                    elements: {
                                        avatarBox: "size-9",
                                    },
                                }}/>
                                <ModeToggle/>
                            </div>
                        </ClerkLoaded>
                        <ClerkLoading>
                            <Loader2 className="size-8 animate-spin text-slate-400"/>
                        </ClerkLoading>
                    </div>
                </div>

                <WelcomeMsg/>
            </div>


        </div>
    );
}
