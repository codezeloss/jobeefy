import {ReactNode} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DashboardLayout({children}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <>
            <Header/>
            <main className="px-3 lg:px-14">{children}</main>
            <Footer/>
        </>
    );
}
