import {ReactNode} from "react";
import HeaderLogo from "@/components/HeaderLogo";

export default function AuthLayout({children}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">
            <HeaderLogo/>
            {children}
        </div>
    );
}
