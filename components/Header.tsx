import HeaderLogo from "@/components/HeaderLogo";
import Navigation from "@/components/Navigation";
import HeaderButtons from "@/components/HeaderButtons";

export default function Header() {
    return (
        <div
            className="bg-white dark:bg-foreground from-emerald-600 to-emerald-500 px-4 py-4 lg:px-14 border-b border-b-slate-200/50">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center lg:gap-x-16">
                    <HeaderLogo/>
                    <Navigation/>
                </div>

                <HeaderButtons/>
            </div>

            {/* <WelcomeMsg/> */}
        </div>

    );
}
