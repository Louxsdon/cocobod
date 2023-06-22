import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import {
    MdDarkMode,
    MdLightMode,
    MdModeNight,
    MdNotifications,
    MdOutlineDarkMode,
} from "react-icons/md";
import { BiCaretDown } from "react-icons/bi";
import { Link, usePage } from "@inertiajs/react";
import { BsPerson } from "react-icons/bs";
import ThemeModeToggler from "./Theme/ThemeModeToggler";

export default function DashboardTopBar() {
    const [profState, setprofState] = useState(false);
    const { auth } = usePage().props;
    return (
        <div className="dark bg-white flex items-center justify-between w-full px-8 py-3">
            <div className="">Admin Dashboard</div>
            <div className="flex space-x-5">
                <div className="flex items-center">
                    <div
                        className="relative"
                        onMouseEnter={() => setprofState(true)}
                        onMouseLeave={() => setprofState(false)}
                    >
                        <div className=" flex justify-center items-center">
                            <div className="bg-gry-200 p-1 rounded-full text-gray900 mr-1 ">
                                <BsPerson className="text-2xl " />
                            </div>
                            <h3>{auth.user ? auth?.user?.name : "User"}</h3>
                            <BiCaretDown />
                        </div>
                        <div
                            style={{ display: profState ? "block" : "none" }}
                            className="absolute flex flex-col z-10 -left-6 p-4 w-40 text-gray-500 rounded space-y-4 bg-gray-100"
                        >
                            <Link href="/profile">
                                <h3>Profile</h3>
                            </Link>
                            <Link
                                className="inline-block"
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                <h3>Logout</h3>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="relative flex justify-center items-center">
                    <MdNotifications className="text-2xl inline-block" />
                    {/* <div className="absolute z-10 -top-2 -right-2 text-xs text-red-100 bg-red-500 p-1 font-sans inline rounded-full">
                        <p className="px-[4px]">0</p>
                    </div> */}
                </div>
                <ThemeModeToggler />
            </div>
        </div>
    );
}
