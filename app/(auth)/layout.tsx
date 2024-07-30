import {ReactNode} from "react";

export default function AuthLayout({children}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <h1 className="w-full text-center mb-4 text-black dark:text-white text-xl md:text-2xl lg:text-3xl font-semibold">
                Jobeefy
            </h1>
            {children}
        </div>
    );
}
