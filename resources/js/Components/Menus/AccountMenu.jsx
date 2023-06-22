import { Menu, Transition } from "@headlessui/react";
import { Link, router, usePage } from "@inertiajs/react";
import { Fragment } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiChevronDown, BiChevronUp, BiPackage } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { MdPerson, MdPersonOutline } from "react-icons/md";

export default function AccountMenu() {
    const { auth } = usePage().props;
    return (
        <div className="items-center font-  block">
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button
                    className="inline-flex w-full items-center justify-center
                        py-1 px-1 rounded-md text-slate-500 
                        ui-open:bg-orange-50 ui-open:text-orange-400
                         hover:text-primary focus:outline-none"
                >
                    <AiOutlineUser className="text-[25px] mr-1" />
                    <span className="flex ">
                        {auth.user
                            ? `Hi, ${auth.user.name.split(" ")[0]}`
                            : "Account"}
                        <BiChevronDown
                            className="ml-2 -mr-1 h-5 w-5 text-violet-200
                             hover:text-violet-100 ui-open:hidden"
                            aria-hidden="true"
                        />
                        <BiChevronUp
                            className="ml-2 -mr-1 h-5 w-5 text-violet-200
                             hover:text-violet-100 hidden ui-open:inline-block"
                            aria-hidden="true"
                        />
                    </span>
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className="absolute right-0 z-[999] w-[220px] bg-white mt-1 origin-top-right 
                    rounded-md drop-shadow focus:outline-none "
                    >
                        {!auth.user && (
                            <div className="px-4 py-2 space-y-2">
                                <Menu.Item>
                                    <Link
                                        href="/auth/login"
                                        className="btn btn-primary w-full btn-outline bg-blue-50"
                                    >
                                        Login
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link
                                        href="/auth/signup"
                                        className="btn w-full btn-outline bg-secondary bg-opacity-10 btn-secondary
                                             ui-active:bg-orange-400"
                                    >
                                        Register
                                    </Link>
                                </Menu.Item>
                            </div>
                        )}
                        <hr />
                        <div className="text-slate-500">
                            <Menu.Item>
                                <Link
                                    className="ui-active:bg-orange-50 ui-active:text-primary px-4 py-2.5 flex items-center"
                                    href={route("dashboard.index")}
                                >
                                    <MdPersonOutline className="text-xl mr-2 ui-active:hidden" />
                                    <MdPerson className="text-xl mr-2 hidden ui-active:inline-block" />
                                    <span>Account</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link
                                    className="ui-active:bg-orange-50 ui-active:text-primary px-4 py-2.5 flex items-center"
                                    href={route("dashboard.purchases.index")}
                                >
                                    <BiPackage className="text-xl mr-2" />
                                    <span>Purchases</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link
                                    className="ui-active:bg-orange-50 ui-active:text-primary px-4 py-2.5 flex items-center"
                                    href={route("dashboard.wallet.index")}
                                >
                                    <IoHeartOutline className="text-xl mr-2 ui-active:hidden" />
                                    <IoHeart className="text-xl mr-2 hidden ui-active:inline-block" />
                                    <span>Wallet</span>
                                </Link>
                            </Menu.Item>
                            <hr />

                            {auth.user && (
                                <Menu.Item>
                                    <div className="p-3">
                                        <button
                                            onClick={() =>
                                                router.post(route("logout"))
                                            }
                                            className="bg-red-100 text-red-400 ui-active:bg-red-500  ui-active:text-red-100 p-1.5 px-2 w-full justify-center flex items-center"
                                        >
                                            <FaSignOutAlt className="text-xl mr-1" />
                                            Sign Out
                                        </button>
                                    </div>
                                </Menu.Item>
                            )}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
