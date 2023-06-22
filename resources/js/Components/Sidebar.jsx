import React, { useState } from "react";
import Catalog, { CategoryDrawer } from "./Catalog";
import { IoClose, IoMenuOutline } from "react-icons/io5";
import { MdList } from "react-icons/md";
import { Link } from "@inertiajs/react";
import Drawer from "react-modern-drawer";

function ActiveLink({ children, href }) {
    return (
        <Link href={href}>
            <a className={`side-link`}>{children}</a>
        </Link>
    );
}

export function SideMenu({ openDrawer, drawerOpen }) {
    return (
        <>
            <Drawer
                direction="left"
                duration={350}
                open={openDrawer}
                onClose={() => drawerOpen(!openDrawer)}
                overlayOpacity={0.8}
                lockBackgroundScroll={true}
            >
                <div className="overflow-y-auto pb-20 fixed top-0 left-0 h-full w-full">
                    <div className=" py-7 px-10 bg-blue-50 flex justify-center items-center flex-col">
                        {/* Sidebar Contents */}
                        <h2 className="text-3xl font-semibold ">ShopLift</h2>
                        <p className="text-gray-400 mb-4 text-center">
                            Buy, Sell and earn
                        </p>
                    </div>
                    {/* Render categories */}
                    <CategoryDrawer />
                </div>
            </Drawer>
        </>
    );
}
