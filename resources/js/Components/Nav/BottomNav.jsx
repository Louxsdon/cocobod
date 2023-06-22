import { Link } from "@inertiajs/react";
import React from "react";
import { MdHome, MdList, MdPerson } from "react-icons/md";
import { SideMenu } from "../Sidebar";

export default function BottomNav() {
    // Side drawer state
    const [openDrawer, setOpenDrawer] = React.useState(false);
    return (
        <>
            <div className="fixed md:hidden bottom-0 left-0 w-full z-20">
                <div className="flex px-4 bg-white justify-evenly">
                    <Link href="/" className="flex flex-col items-center py-3">
                        <MdHome />
                        <p className="text-sm">Home</p>
                    </Link>
                    <span
                        onClick={() => setOpenDrawer(!openDrawer)}
                        className="flex flex-col items-center py-3"
                    >
                        <MdList />
                        <p className="text-sm">Categories</p>
                    </span>
                    <Link
                        href="/customer/account"
                        className="flex flex-col items-center py-3"
                    >
                        <MdPerson />
                        <p className="text-sm">Account</p>
                    </Link>
                </div>
            </div>

            <SideMenu openDrawer={openDrawer} drawerOpen={setOpenDrawer} />
        </>
    );
}
