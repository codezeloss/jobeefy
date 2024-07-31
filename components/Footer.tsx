import HeaderLogo from "@/components/HeaderLogo";

export default function Footer() {
    return (
        <div className="bg-gradient-to-b from-emerald-600 to-emerald-500 px-4 py-8 lg:px-14 pb-36">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between mb-14">
                    <HeaderLogo/>
                </div>
            </div>
        </div>
    );
}
