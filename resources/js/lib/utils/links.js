import { BiHeart, BiPackage, BiPencil } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdPersonOutline } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";

export const AccountLinks = [
    {
        uri: "/customer/account",
        title: "Account",
        Icon: MdPersonOutline,
    },
    {
        uri: "/customer/orders",
        title: "Orders",
        Icon: BiPackage,
    },
    {
        uri: "/customer/wishlist",
        title: "Wishlist",
        Icon: BiHeart,
    },
    {
        uri: "/customer/reviews",
        title: "Reviews",
        Icon: BiPencil,
    },
    {
        uri: "/customer/manage",
        title: "Manage Account",
        Icon: IoSettingsOutline,
    },
    {
        uri: "/customer/addresses",
        title: "Address Book",
        Icon: TbAddressBook,
    },
];
