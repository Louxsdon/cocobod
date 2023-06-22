import { Link, usePage, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { MdShoppingCart, MdMenu, MdPerson } from "react-icons/md";
import AccountMenu from "../Menus/AccountMenu";
export default function NavLinks() {
    const { url } = usePage();
    const { auth, cart } = usePage().props;
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openAccountDrawer, setOpenAccountDrawer] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        cart?.items !== null &&
            setCartItemCount(
                cart?.items?.reduce((acc, item) => acc + item.quantity, 0)
            );
    }, [cart]);

    return (
        <>
            <div className="container w-full flex items-center justify-between">
                <div className="brand flex items-center md:w-[20%]">
                    {/* 
                        ============ Desktop Category Dropdown Menu =============
                    */}
                    <div
                        className={`${
                            url === "/"
                                ? "hidden"
                                : "dropdown dropdown-hover hidden lg:inline-block"
                        }  `}
                    >
                        <label
                            tabIndex={0}
                            className="inline-block mr-2 p-1 text-[25px] text-black hover:bg-slate-200"
                        >
                            <MdMenu />
                        </label>
                    </div>

                    {/* 
                        ============ Tablet and Mobile Category Menu Toggler ==========
                    */}
                    <button
                        onClick={() => setOpenDrawer(!openDrawer)}
                        className={`${
                            url === "/" ? "inline-block lg:hidden" : ""
                        } mr-2 p-1 text-[25px] text-black hover:bg-slate-200 lg:hidden`}
                    >
                        <MdMenu />
                    </button>

                    {/* ====== Brand Name ======= */}
                    <Link href="/">
                        <h3 className="font-bold font-serif text-3xl ">
                            Apharex
                        </h3>
                    </Link>
                </div>

                <div className="md:flex md:w-[80%] items-center justify-between md:space-x-2">
                    <div className=" md:w-[80%] hidden md:inline-block"></div>
                    <div className="md:w-[20%] flex items-center justify-end md:space-x-3 font-bold">
                        {/* user account section */}
                        <MdPerson
                            className="text-[25px] mr-3 md:hidden"
                            onClick={() =>
                                setOpenAccountDrawer(!openAccountDrawer)
                            }
                        />
                        <AccountMenu auth={auth} />
                    </div>
                </div>
            </div>
        </>
    );
}
