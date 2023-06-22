import { Link, router, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { BiArrowBack, BiChevronRight } from "react-icons/bi";
import { MdList } from "react-icons/md";

export default function Catalog({ className, ...props }) {
    const { categories } = usePage().props;
    const url = usePage().url;
    return (
        <ul
            className={`menu category py-3 bg-white text-gray-500 
        z-40 rounded-md shadow-sm relative ${className ? className : ""}`}
            {...props}
        >
            {categories.map((cat, i) => (
                <li key={i}>
                    <Link
                        href={`/${cat.slug}`}
                        key={i}
                        className="hover:bg-slate-100 w-full text-left block cursor-pointer 
                    text-sm py-[7px] px-5 hover-bordered hover:text-slate-700 "
                    >
                        {cat.name}
                    </Link>
                    {/* ======= Sub Categories ======== */}
                    <ul className="bg-white w-[100%] lg:w-[125%] xl:w-[150%] text-slate-800 py-3 h-full absolute top-0 border-l overflow-y-auto">
                        {/* sub-category heading */}
                        <h3 className="uppercase text-black px-3 font-semibold">
                            <Link href={`/${cat.slug}`}>{cat.name}</Link>
                        </h3>
                        {/* ======= sub-categories links ======== */}
                        {cat.categories.map((sub, i) => (
                            <li key={i}>
                                <Link
                                    href={`/${sub.slug}`}
                                    key={i}
                                    className="hover:bg-slate-200 w-full text-left 
                                    block cursor-pointer text-sm py-2.5 px-5 "
                                >
                                    {sub.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
}

export function CategoryDrawer({ className, ...props }) {
    const { categories: allCategories } = usePage().props;
    const [parentCategory, setParentCategory] = useState(null);
    const [categories, setCategories] = useState(allCategories);

    function changeCategoy(category) {
        if (category) {
            setParentCategory(category);
            setCategories(category.categories);
        } else {
            setParentCategory(null);
            setCategories(allCategories);
        }
    }

    return (
        <ul
            className={`category py-3 bg-white text-gray-500 
        z-40 rounded-md shadow-sm relative ${className ? className : ""}`}
            {...props}
        >
            {parentCategory ? (
                <>
                    <div className="text-slate-500 px-3 pb-2 font-bold flex items-center space-x-3">
                        <BiArrowBack className="text-[18px]" />
                        <button
                            className="uppercase"
                            onClick={() => changeCategoy(null)}
                        >
                            Main Menu
                        </button>
                    </div>
                    <hr className="mb-3" />
                    <h3 className="text-black px-3 mb-3 font-semibold">
                        <Link href={`/${parentCategory?.slug}`}>
                            View All {parentCategory?.name}
                        </Link>
                    </h3>
                </>
            ) : (
                <>
                    <div className="px-5 mb-2 flex items-center space-x-2 font-bold uppercase">
                        <MdList className="text-[18px]" />
                        <h2>Categories</h2>
                    </div>
                    <hr />
                </>
            )}
            {categories.map((cat, i) => (
                <Fragment key={i}>
                    {!cat.categories || cat.categories?.length < 1 ? (
                        <li className="">
                            <Link
                                href={`/${cat.slug}`}
                                className="hover:bg-slate-100 w-full text-left flex justify-between cursor-pointer text-base py-[7px] px-5 hover-bordered hover:text-slate-700  "
                            >
                                {cat.name}
                            </Link>
                        </li>
                    ) : (
                        <li className="">
                            <button
                                onClick={() => changeCategoy(cat)}
                                className="hover:bg-slate-100 w-full text-left flex justify-between cursor-pointer 
                    text-base py-[7px] px-5 hover-bordered hover:text-slate-700  "
                            >
                                <span>{cat.name}</span>
                                <BiChevronRight className="text-[22px]" />
                            </button>
                        </li>
                    )}
                </Fragment>
            ))}
        </ul>
    );
}
