import {ReactNode} from "react";
import Header from "@/components/Header";
// import Footer from "@/components/Footer";
import {Toaster} from "@/components/ui/toaster";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";

export default async function DashboardLayout({children}: Readonly<{
    children: ReactNode;
}>) {
    const {userId} = auth()

    if (!userId) redirect("/sign-in")

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
