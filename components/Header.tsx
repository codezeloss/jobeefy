"use client"

import HeaderLogo from "@/components/HeaderLogo";
import Navigation from "@/components/Navigation";
import HeaderButtons from "@/components/HeaderButtons";
import {useMedia} from "react-use";
import HeaderSignButtons from "@/components/HeaderSignButtons";

export default function Header({userId}: { userId: string | null }) {
    const isMobile = useMedia("(max-width: 1024px)", false)

    return (
        <div
            className="bg-white px-4 py-4 lg:px-14 border-b border-b-slate-200/50">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center lg:gap-x-16">
                    {!isMobile && <HeaderLogo/>}
                    <Navigation/>
                </div>

                {userId ?
                    <HeaderButtons/> :
                    <HeaderSignButtons/>
                }
            </div>
        </div>
    );
}
