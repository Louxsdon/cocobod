import React from "react";

export default function DashboardLayout({
    title,
    children,
    className,
    ...props
}) {
    return (
        <div className={`flex justify-center items-center h-full `} {...props}>
            <div
                className={`dark bg-white w-[60%] p-4 rounded-lg ${className}`}
            >
                <fieldset className="border p-4">
                    <legend className="text-xl px-4">{title}</legend>
                    {children}
                </fieldset>
            </div>
        </div>
    );
}
