import {ReactNode} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DashboardLayout({children}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <>
            <Header/>
            <main className="w-full h-full p-3 lg:p-14">{children}</main>
            <Footer/>
        </>
    );
}
