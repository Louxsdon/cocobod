import { useState, useEffect } from "react";
import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import Input from "@/Components/Input";
import { useForm, router, Link } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import TextareaInput from "@/Components/TextareaInput";
import { cn } from "@/lib/utils";
import { DeleteButton } from "@/Components/Buttons";

function BioInfo({ title, value, className }) {
    return (
        <div className={cn(!value && "hidden", className)}>
            <h3 className="font-semibold text-lg text-slate-600">{title}:</h3>
            <p className="text-lg font-thin ">{value}</p>
        </div>
    );
}

export default function ShowUser({ leaf = {} }) {
    console.log(leaf);
    return (
        <>
            <div className="p-5 dark bg-white w-full md:w-3/4 lg:w-2/4 mx-auto mt-16 shadow-sm rounded-lg">
                <p className="text-xl font-semibold">Leave Information</p>
                <hr className="my-2 mb-8" />
                {/* Form section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                    <BioInfo title="Heading" value={leaf.heading} />
                    <BioInfo title="Reason" value={leaf.reason} />
                    <BioInfo title="From" value={leaf.from} />
                    <BioInfo title="To" value={leaf.to} />
                    <BioInfo title="Type" value={leaf.type} />
                    <BioInfo
                        title="Status"
                        value={leaf.status}
                        className={`capitalize ${
                            leaf.status === "pending"
                                ? "text-blue-500"
                                : leaf.status === "approved"
                                ? "text-green-600"
                                : "text-red-500"
                        }`}
                    />

                    <fieldset className="border p-3 rounded col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                        <legend className="px-2">Requested By</legend>
                        <BioInfo title="Name" value={leaf.user?.name} />
                        <BioInfo title="Email" value={leaf.user?.email} />
                        <BioInfo title="Phone" value={leaf.user?.phone} />
                    </fieldset>
                    {leaf.status === "pending" && (
                        <div className="p-3 rounded col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                            <button
                                onClick={() =>
                                    confirm(
                                        "Are sure you want to reject this?"
                                    ) &&
                                    router.post(
                                        route("admin.leaves.reject", leaf.id)
                                    )
                                }
                                className="py-1 px-2 rounded text-center bg-red-200 text-red-500  hover:text-red-200 hover:bg-red-500 transition-colors duration-500"
                                title="Reject"
                                as="button"
                                method="post"
                            >
                                <span>Reject</span>
                            </button>
                            <button
                                onClick={() =>
                                    confirm(
                                        "Are sure you want to approve this?"
                                    ) &&
                                    router.post(
                                        route("admin.leaves.approve", leaf.id)
                                    )
                                }
                                className="py-1 px-2 rounded text-green-100 bg-green-500 text-center"
                                title="Approve"
                                as="button"
                                method="post"
                            >
                                <span>Approve</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
