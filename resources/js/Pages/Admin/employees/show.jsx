import { useState, useEffect } from "react";
import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import Input from "@/Components/Input";
import { useForm, router } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import TextareaInput from "@/Components/TextareaInput";
import { cn } from "@/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import dayjs from "dayjs";

function BioInfo({ title, value, className }) {
    return (
        <div className={cn(!value && "hidden", className)}>
            <h3 className="font-semibold text-lg text-slate-600">{title}</h3>
            <p className="font-thin text-slate500">{value}</p>
        </div>
    );
}

export default function ShowUser({
    employee = {},
    roles = [],
    permissions = [],
    user,
}) {
    console.log(user);
    return (
        <>
            <div className="p-5 dark bg-white w-full md:w-3/4 lg:w-2/4 mx-auto mt-16 shadow-sm rounded-lg">
                <p className="text-xl font-semibold">Employee Bio Data</p>
                <hr className="my-2 mb-8" />
                {/* Form section */}
                <form>
                    <div className="mb-4 flex items-center border overflow-hidden hover:scale-110 transition-all duration-150 bg-slate-200 rounded-md w-[150px] h-[150px]">
                        <img
                            src={"/photos/" + employee.user?.photo}
                            alt={`${employee.user.name} - Photo`}
                        />
                    </div>
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

            {/* container */}

            <div className="p-5 dark bg-white w-full md:w-3/4 lg:w-2/4 mx-auto mt-5 shadow-sm rounded-lg">
                <Accordion type="multiple" collapsible>
                    <DataContainer heading={"Eductional Qualifications"}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[250px]">
                                        Name
                                    </TableHead>
                                    <TableHead>Institution</TableHead>
                                    <TableHead>Start Date</TableHead>
                                    <TableHead className="text-right">
                                        Completion Date
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {user?.qualifications?.map(
                                    (qualification, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="row-span-2">
                                                {qualification?.name}
                                            </TableCell>
                                            <TableCell>
                                                {qualification?.institution}
                                            </TableCell>
                                            <TableCell>
                                                {qualification?.start_date}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {qualification?.completion_date}
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </DataContainer>
                    {/* medical records */}
                    <DataContainer heading={"Medical Records"}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[250px]">
                                        Condition
                                    </TableHead>
                                    <TableHead>Diagnosis Date</TableHead>
                                    <TableHead>Provider</TableHead>
                                    <TableHead className="text-right">
                                        Notes
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {user?.medicals?.map((medical, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="row-span-2">
                                            {medical?.condition}
                                        </TableCell>
                                        <TableCell>
                                            {medical?.diagnosis_date}
                                        </TableCell>
                                        <TableCell>
                                            {medical?.provider}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {medical?.notes}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </DataContainer>

                    {/* Leaves */}
                    <DataContainer heading={"Leaves Applied"}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[250px]">
                                        Heading
                                    </TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead className="text-right">
                                        Status
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {user?.leaves?.map((leave, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="row-span-2">
                                            {leave?.heading}
                                        </TableCell>
                                        <TableCell>{leave?.type}</TableCell>
                                        <TableCell>
                                            {leave?.from} - {leave?.to}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {leave?.status}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </DataContainer>
                    {/* Appraisals Submitted */}
                    <DataContainer heading={"Appraisals Submitted"}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[250px]">
                                        Appraisal For
                                    </TableHead>
                                    <TableHead>Submitted On</TableHead>
                                    <TableHead className="text-right">
                                        Status
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {user?.appraisals?.map((appraisal, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="row-span-2">
                                            {dayjs(
                                                appraisal?.created_at
                                            ).format("MMMM YYYY")}
                                        </TableCell>
                                        <TableCell>
                                            {dayjs(
                                                appraisal?.created_at
                                            ).format("DD/MM/YYYY")}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {appraisal?.status}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </DataContainer>

                    {/* Appointments */}
                    <DataContainer heading={"Appointments"}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[250px]">
                                        Schedules On
                                    </TableHead>
                                    <TableHead>Comments</TableHead>
                                    <TableHead>Submitted On</TableHead>
                                    <TableHead className="text-right">
                                        Status
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {user?.appointments?.map((appraisal, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="row-span-2">
                                            {appraisal?.date} @{appraisal?.time}
                                        </TableCell>
                                        <TableCell>
                                            {appraisal?.comments}
                                        </TableCell>
                                        <TableCell>
                                            {dayjs(
                                                appraisal?.created_at
                                            ).format("DD/MM/YYYY")}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {appraisal?.status}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </DataContainer>
                </Accordion>
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

function DataContainer({ heading, children }) {
    return (
        <AccordionItem value={heading}>
            <AccordionTrigger className="hover:no-underline focus:outline-none  font-semibold uppercase">
                {heading}
            </AccordionTrigger>
            <AccordionContent>{children}</AccordionContent>
        </AccordionItem>
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
