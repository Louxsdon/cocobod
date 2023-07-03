import React, { useEffect } from "react";

// components

import AdminNavbar from "@/Components/Navbars/AdminNavbar.jsx";
import Sidebar from "@/Components/Sidebar/Sidebar.jsx";
import FooterAdmin from "@/Components/Footers/FooterAdmin.jsx";
import { ToastContainer, toast } from "react-toastify";
import { usePage } from "@inertiajs/react";
import EmployeeSidebar from "@/Components/Sidebar/EmployeeSidebar";
import StaffNavbar from "@/Components/Navbars/StaffNavbar";

// views

export default function StaffLayout({ children }) {
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
            <EmployeeSidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
                <StaffNavbar />
                {/* Header */}

                <div className="px-4 md:px-10 mx-auto w-full -m-24 md:pt-32 pb-32 pt-12">
                    {children}
                    <FooterAdmin />
                </div>
            </div>
        </>
    );
}
