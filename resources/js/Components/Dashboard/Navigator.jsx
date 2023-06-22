import React from "react";
import { MdArrowBack } from "react-icons/md";

export default function Navigator({ title, children }) {
    return (
        <section className="mb-4 dark bg-white w-full p-4 lg:p-8 lg:py-4 ">
            <div className="flex justify-between">
                <button
                    onClick={() => history.back()}
                    className="flex items-center space-x-1 font-semibold text-slate-500"
                >
                    <MdArrowBack />
                    <span>Back</span>
                </button>
                {title && <div className="">{title}</div>}
            </div>
            {children}
        </section>
    );
}
