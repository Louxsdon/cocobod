import React from "react";
import { IoTrash } from "react-icons/io5";
import { BiPencil } from "react-icons/bi";
import { Link } from "@inertiajs/react";
import { BsEye } from "react-icons/bs";
import { FaEye } from "react-icons/fa";

export function DeleteButton({ onClick, children }) {
    return (
        <button
            onClick={onClick}
            className="py-1 px-2 rounded bg-red-200 text-red-500  hover:text-red-200 hover:bg-red-500 transition-colors duration-500"
            title="Delete"
        >
            <IoTrash className="inline-block" />
        </button>
    );
}

export function EditButton({ href }) {
    return (
        <Link
            href={href}
            className="py-1 px-2 rounded bg-purple-200 text-purple-500  hover:text-purple-200 hover:bg-purple-500 transition-colors duration-500"
            title="Edit"
        >
            <BiPencil className="inline-block" />
        </Link>
    );
}

export function ViewButton({ href }) {
    return (
        <Link
            href={href}
            className="py-1 px-2 rounded text-blue-200 bg-blue-500"
            title="View"
        >
            <FaEye className="inline-block" />
        </Link>
    );
}
