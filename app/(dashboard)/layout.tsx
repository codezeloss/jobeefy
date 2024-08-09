import {ReactNode} from "react";
import Header from "@/components/Header";
// import Footer from "@/components/Footer";
import {Toaster} from "@/components/ui/toaster";

export default function DashboardLayout({children}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <>

            <Header/>
            <main className="w-full h-full p-6 lg:p-14">
                <Toaster/>
                {children}
            </main>
            {/*<Footer/>*/}
        </>
    );
}
