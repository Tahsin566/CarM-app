import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '../globals.css'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from 'sonner'
import Separator from "@/components/Separator";
import SideBar from "@/components/SideBar";
import { getCurrentUser } from "@/actions/Auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "CarM",
    description: "Generated using next.js",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    const user = await getCurrentUser()

    if (user?.role !== 'admin') {
        redirect('/')
    }

    

    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white/30 backdrop-blur-md border border-white/10 shadow-2xl z-50 rounded-2xl`}
        >
            <body className="">
                <Navbar />
                <Toaster />
                <Separator height="h-16" />
                <div className="grid gap-1 grid-cols-[auto_1px_1fr] h-[91.1vh] overflow-hidden">

                    
                    <SideBar />

                    <div className="w-1 h-full bg-slate-500"></div>
                    

                    <main className=" overflow-y-auto">
                        {children}
                    </main>


                </div>
            </body>
        </html>
    );
}
