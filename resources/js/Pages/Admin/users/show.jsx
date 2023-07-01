import { useState, useEffect } from "react";
import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import Input from "@/Components/Input";
import { useForm, router } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import TextareaInput from "@/Components/TextareaInput";
import { cn } from "@/lib/utils";

function BioInfo({ title, value, className }) {
    return (
        <div className={cn(!value && "hidden", className)}>
            <h3 className="font-semibold text-lg text-slate-600">{title}</h3>
            <p className="text-base font-extralight text-slate-500">{value}</p>
        </div>
    );
}

export default function ShowUser({
    auth,
    user = {},
    roles = [],
    permissions = [],
    departments = [],
}) {
    return (
        <>
            <div className="p-5 dark bg-white w-full md:w-3/4 lg:w-2/4 mx-auto mt-16 shadow-sm rounded-lg">
                <p className="text-xl font-semibold">User Data</p>
                <hr className="my-2 mb-8" />
                {/* Form section */}
                <form>
                    <div className="mb-4 flex items-center border overflow-hidden hover:scale-110 transition-all duration-150 bg-slate-200 rounded-md w-[150px] h-[150px]">
                        <img
                            src={"/photos/" + user?.photo}
                            alt={`${user.name} - Photo`}
                        />
                    </div>
                    <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                        <BioInfo title="Name" value={user.name} />
                        <BioInfo title="Email" value={user.email} />
                        <BioInfo title="Phone" value={user.phone} />
                        {user.employee && (
                            <>
                                <BioInfo
                                    title="Gender"
                                    value={user.employee?.gender}
                                />
                                <BioInfo
                                    title="Date of Birth"
                                    value={user.employee?.date_of_birth}
                                />
                                <BioInfo
                                    title="Address"
                                    value={user.employee?.address}
                                />
                                <BioInfo
                                    title="Job Title"
                                    value={user.employee?.job_title}
                                />
                                <BioInfo
                                    title="Date Hired"
                                    value={user.employee?.hired_on}
                                />
                                <BioInfo
                                    title="Bio"
                                    className="col-span-2"
                                    value={user.employee?.bio}
                                />
                                <BioInfo
                                    title="Department"
                                    value={user.employee?.department?.name}
                                />
                            </>
                        )}
                        <BioInfo
                            className={"capitalize"}
                            title="User Role"
                            value={user?.roles[0]?.name}
                        />
                    </div>
                </form>
            </div>
            {/* <div className="p-5 dark bg-white w-full md:w-3/4 lg:w-2/4 mx-auto mt-5 shadow-sm rounded-lg">
               
            </div> */}
        </>
    );
}
