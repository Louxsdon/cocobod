import React, { useState } from "react";
import AccountMenu from "../Menus/AccountMenu";
import { Link } from "@inertiajs/react";
import ThemeModeToggler from "../Theme/ThemeModeToggler";

export default function NavBar() {
    return (
        <nav className="drop-shadow dark bg-white px-4 py-2 sticky top-0 z-[49]">
            <div className="container navba flex items-center justify-between">
                <Link href="/" className="text-xl font-bold">
                    JessCo
                </Link>
                <div className="flex items-center">
                    <AccountMenu auth={"auth"} />
                    <ThemeModeToggler />
                </div>
            </div>
        </nav>
    );
}
