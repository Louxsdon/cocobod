import React from "react";

// components

import AdminNavbar from "@/Components/Navbars/AdminNavbar.jsx";
import Sidebar from "@/Components/Sidebar/Sidebar.jsx";
import HeaderStats from "@/Components/Headers/HeaderStats.jsx";
import FooterAdmin from "@/Components/Footers/FooterAdmin.jsx";

// views

export default function Admin({ children }) {
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
                <AdminNavbar />
                {/* Header */}

                <div className="px-4 md:px-10 mx-auto w-full -m-24 md:pt-32 pb-32 pt-12">
                    {children}
                    <FooterAdmin />
                </div>
            </div>
        </>
    );
}
