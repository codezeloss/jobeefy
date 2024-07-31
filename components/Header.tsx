import HeaderLogo from "@/components/HeaderLogo";
import Navigation from "@/components/Navigation";
import WelcomeMsg from "@/components/WelcomeMsg";
import HeaderButtons from "@/components/HeaderButtons";

export default function Header() {
    return (
        <div className="bg-gradient-to-b from-emerald-600 to-emerald-500 px-4 py-8 lg:px-14 pb-36">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between mb-14">
                    <div className="flex items-center lg:gap-x-16">
                        <HeaderLogo/>
                        <Navigation/>
                    </div>

                    <HeaderButtons/>
                </div>

                <WelcomeMsg/>
            </div>
        </div>
    );
}
