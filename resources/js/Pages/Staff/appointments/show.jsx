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
                </div>
            </div>
        </>
    );
}
