import React, { useEffect, useState } from "react";
import {
    MdDashboard,
    MdLockOutline,
    MdOutlineProductionQuantityLimits,
    MdOutlineRedeem,
    MdOutlineSpaceDashboard,
    MdPeopleOutline,
} from "react-icons/md";
import { Link, usePage } from "@inertiajs/react";
import { BiCategory, BiMoney, BiPurchaseTag } from "react-icons/bi";
import { IoTicketOutline } from "react-icons/io5";

export default function DashboardSideBar() {
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);

    const { auth } = usePage().props;

    useEffect(() => {
        // console.log(
        //     auth.user.roles?.some((role) => role.name === "super-admin")
        // );
        // console.log(auth);
        setIsSuperAdmin(
            auth.user.roles?.some(({ name }) => name === "super-admin")
        );
    }, []);

    return (
        <>
            <aside className="w-[60px] lg:w-80 transition-all bg-base-300 h-screen">
                <div className="text-center px-4 py-10">
                    {/* <img
                        className="w-24 inline-block m-auto mb-5"
                        src="/imgs/logo3.png"
                        alt="Logo"
                    /> */}
                    <h2 className="hidden lg:block text-2xl font-semibold font-serif ">
                        JessCo Store
                    </h2>
                </div>

                <div className="mt-12 text-lg">
                    <SidebarLink href="" Icon={MdOutlineSpaceDashboard}>
                        Dashboard
                    </SidebarLink>

                    <SidebarLink href="users" Icon={MdPeopleOutline}>
                        Users
                    </SidebarLink>

                    {isSuperAdmin && (
                        <SidebarLink href="authorizations" Icon={MdLockOutline}>
                            Authorizations
                        </SidebarLink>
                    )}

                    <SidebarLink href="telcos" Icon={MdOutlineRedeem}>
                        Telcos
                    </SidebarLink>
                    <SidebarLink href="categories" Icon={BiCategory}>
                        Packages
                    </SidebarLink>
                    <SidebarLink href="purchases" Icon={BiPurchaseTag}>
                        Purchases
                    </SidebarLink>
                    <SidebarLink href="transactions" Icon={BiMoney}>
                        Transactions
                    </SidebarLink>
                    {/* <SidebarLink href="search-flight" Icon={IoTicketOutline}>
                        Tickets
                    </SidebarLink> */}
                </div>
            </aside>
        </>
    );
}

function SidebarLink({ href, children, Icon = MdDashboard }) {
    const { url, component } = usePage();

    // let active = url === "" || (url !== "" && url.startsWith(`/admin/${href}`));
    let active = url === "" || url === `/admin/${href}`;
    return (
        <div
            className={`${
                active ? "bg-base-200 " : null
            } hover:bg-base-200 flex items-center cursor-pointer`}
        >
            <Link
                className="w-full py-3 px-2 lg:px-6 lg:flex text-center items-center"
                href={`/admin/${href}`}
                title={children}
                preserveState={true}
                preserveScroll={true}
            >
                <Icon className="inline-block lg:mr-2" />
                <span className="hidden lg:block">{children}</span>
            </Link>
        </div>
    );
}
