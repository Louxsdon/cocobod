import { router, usePage } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import { MdSearch } from "react-icons/md";

export default function MainSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const url = usePage().url;

    const onTextChange = (e) => {
        const val = e.target.value;
        setSearchTerm(val);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        router.get(
            url.startsWith("/items") ? "" : "/items",
            { p: searchTerm },
            { preserveScroll: true, preserveState: true }
        );
    };
    return (
        <form className="w-full" onSubmit={onSubmit}>
            <div className="relative overflow-hidden">
                <MdSearch className="absolute hidden md:inline-block text-2xl text-gray-400 top-1/2 transform -translate-y-1/2 left-3" />
                <input
                    onChange={onTextChange}
                    value={searchTerm}
                    type="text"
                    className="w-full pl-6 md:pl-10 pr-20 py-2
                     md:py-3 border border-gray-200 text-sm rounded
                     text-gray-600 placeholder-gray-400 focus:outline-none
                    focus:ring-0  focus:border-primary-500"
                    placeholder="Looking for ..."
                />
                <button className="bg-primary-400 text-white rounded-tr rounded-br px-3 h-full absolute top-1/2 transform -translate-y-1/2 right-0">
                    <span className="hidden md:inline-block">Search</span>
                    <MdSearch className=" text-xl text-gray-100 md:hidden" />
                </button>
            </div>
        </form>
    );
}
