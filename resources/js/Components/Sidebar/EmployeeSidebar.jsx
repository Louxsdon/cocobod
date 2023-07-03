/*eslint-disable*/
import React from "react";

import NotificationDropdown from "@/Components/Dropdowns/NotificationDropdown.jsx";
import UserDropdown from "@/Components/Dropdowns/UserDropdown.jsx";
import { Link } from "@inertiajs/react";

export default function EmployeeSidebar() {
    const [collapseShow, setCollapseShow] = React.useState("hidden");
    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-3">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                    {/* Toggler */}
                    <button
                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                        type="button"
                        onClick={() =>
                            setCollapseShow("bg-white m-2 py-3 px-6")
                        }
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    {/* Brand */}
                    <div className="bg-teal-20 py-5">
                        <Link
                            className="md:block md:pb-2 text-center text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                            href="/admin/dashboard"
                        >
                            <p className="font-black text-xl text-teal-500">
                                Cocobod
                            </p>
                            <p className="">Ghana </p>
                        </Link>
                    </div>
                    {/* User */}
                    <ul className="md:hidden items-center flex flex-wrap list-none">
                        <li className="inline-block relative">
                            <NotificationDropdown />
                        </li>
                        <li className="inline-block relative">
                            <UserDropdown />
                        </li>
                    </ul>
                    {/* Collapse */}
                    <div
                        className={
                            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
                            collapseShow
                        }
                    >
                        {/* Collapse header */}
                        <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                            <div className="flex flex-wrap">
                                <div className="w-6/12">
                                    <Link
                                        className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                                        href="/dashboard/dashboard"
                                    >
                                        Ghana Cocobo
                                    </Link>
                                </div>
                                <div className="w-6/12 flex justify-end">
                                    <button
                                        type="button"
                                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                        onClick={() =>
                                            setCollapseShow("hidden")
                                        }
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Form */}
                        <form className="mt-6 mb-4 md:hidden">
                            <div className="mb-3 pt-0">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                                />
                            </div>
                        </form>

                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        {/* Heading */}
                        <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                            Staff Section
                        </h6>
                        {/* Navigation */}

                        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                            <SidebarLink href="/dashboard" icon="fas fa-tv">
                                Dashboard
                            </SidebarLink>

                            <SidebarLink href="/leaves" icon="fas fa-folder">
                                My Leaves
                            </SidebarLink>
                            <SidebarLink
                                href="/appraisals"
                                icon="fas fa-folder"
                            >
                                Appraisals
                            </SidebarLink>
                            <SidebarLink
                                href="/qualifications"
                                icon="fas fa-folder"
                            >
                                Qualifications
                            </SidebarLink>
                            <SidebarLink href="/medicals" icon="fas fa-folder">
                                Medical Records
                            </SidebarLink>
                            <SidebarLink
                                href="/appointments"
                                icon="fas fa-folder"
                            >
                                Appointments
                            </SidebarLink>
                        </ul>

                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        {/* Heading */}
                        <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                            Auth Section
                        </h6>
                        {/* Navigation */}

                        <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                            <li className="items-center">
                                <Link
                                    className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                                    href={route("staff.profile.me")}
                                >
                                    <i className="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>{" "}
                                    Profile
                                </Link>
                            </li>
                            <li className="items-center">
                                <Link
                                    className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block"
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    <i className="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i>{" "}
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

function SidebarLink({ children, href, icon = "" }) {
    return (
        <li className="items-center">
            <Link
                className={
                    "text-xs uppercase px-3 py-3 rounded-lg font-bold block " +
                    (window.location.href.indexOf(href) !== -1
                        ? " bg-teal-100 text-teal-500 hover:text-teal-600"
                        : "text-blueGray-700 hover:text-blueGray-500")
                }
                href={`/staff${href}`}
            >
                <i
                    className={
                        "mr-2 text-sm " +
                        icon +
                        (window.location.href.indexOf(href) !== -1
                            ? " first-letter:opacity-75"
                            : " text-blueGray-300")
                    }
                ></i>{" "}
                {/* <Icon className="inline-block lg:mr-2" /> */}
                {children}
            </Link>
        </li>
    );
}
