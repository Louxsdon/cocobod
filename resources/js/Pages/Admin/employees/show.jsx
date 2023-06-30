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
            <p className="text-lg font-thin text-slate-500">{value}</p>
        </div>
    );
}

export default function ShowUser({
    auth,
    employee = {},
    roles = [],
    permissions = [],
    departments = [],
}) {
    return (
        <>
            <div className="p-5 dark bg-white w-full md:w-3/4 lg:w-2/4 mx-auto mt-16 shadow-sm rounded-lg">
                <p className="text-xl font-semibold">Employee Bio Data</p>
                <hr className="my-2 mb-8" />
                {/* Form section */}
                <form>
                    <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                        <BioInfo title="Name" value={employee.user.name} />
                        <BioInfo title="Email" value={employee.user.email} />
                        <BioInfo title="Phone" value={employee.user.phone} />
                        <BioInfo title="Gender" value={employee.gender} />
                        <BioInfo
                            title="Date of Birth"
                            value={employee.date_of_birth}
                        />
                        <BioInfo title="Job Title" value={employee.job_title} />
                        <BioInfo title="Date Hired" value={employee.hired_on} />
                        <BioInfo title="Address" value={employee.address} />
                        <BioInfo
                            title="Bio"
                            className="col-span-2"
                            value={employee.bio}
                        />
                        <BioInfo
                            title="Department"
                            value={employee.department?.name}
                        />
                    </div>
                </form>
            </div>
            <div className="p-5 dark bg-white w-full md:w-3/4 lg:w-2/4 mx-auto mt-5 shadow-sm rounded-lg">
                <Tabs defaultValue="account" className="">
                    <TabsList>
                        <TabsTrigger value="account">Roles</TabsTrigger>
                        <TabsTrigger value="password">Permissions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        {/* Roles and User Roles */}
                        <Roles user={employee.user} roles={roles} />
                    </TabsContent>
                    <TabsContent value="password">
                        {/* ================ Permissions ============*/}
                        <Permissions
                            user={employee.user}
                            permissions={permissions}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}

// Roles Section Component

export function Roles({ user = {} }) {
    return (
        //  ================ Roles ============*
        <div className="p-5 dark bg-white w-full mt-4 shadow-sm rounded-lg">
            <p className="text-lg font-semibold">User Roles</p>

            <hr className=" my-2" />
            <ul>
                {user?.roles.map((perm, i) => (
                    <li key={i}>{perm.name}</li>
                ))}
            </ul>
        </div>
    );
}

export function Permissions({ user = {} }) {
    return (
        //  ================ Roles ============*
        <div className="p-5 dark bg-white mx-auto mt-4 shadow-sm rounded-lg">
            <p className="text-lg font-semibold">User Permissions</p>

            <hr className=" my-2" />
            <ul>
                {user.permissions.map((perm, i) => (
                    <li key={i}>{perm.name}</li>
                ))}
            </ul>
        </div>
    );
}
