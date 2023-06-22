import React from "react";
import Navbar from "@/Components/Navbars/AuthNavbar.jsx";
import FooterSmall from "@/Components/Footers/FooterSmall.jsx";

// views

export default function AuthLayout({ children }) {
    return (
        <>
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
