import React, { useEffect } from "react";
import Navbar from "@/Components/Navbars/AuthNavbar.jsx";
import FooterSmall from "@/Components/Footers/FooterSmall.jsx";
import { ToastContainer, toast } from "react-toastify";
import { usePage } from "@inertiajs/react";

// views

export default function AuthLayout({ children }) {
    const { flash } = usePage().props;
    useEffect(() => {
        if (flash.message) {
            toast(flash.message.text, {
                type: flash.message.status ? flash.message.status : "success",
                theme: "colored",
            });
        }
    }, [flash.message]);
    return (
        <>
            <ToastContainer />
            {/* <Navbar transparent /> */}
            <main>
                <section className="relative w-full h-full py-40 min-h-screen">
                    <div
                        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                        style={{
                            backgroundImage: "url(/img/register_bg_2.png)",
                        }}
                    ></div>
                    {children}
                    <FooterSmall absolute />
                </section>
            </main>
        </>
    );
}
