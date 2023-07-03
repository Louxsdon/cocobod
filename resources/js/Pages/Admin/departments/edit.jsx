import { useState, useEffect } from "react";
import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import Input from "@/Components/Input";
import { useForm, router } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

export default function EditDepartment({ auth, department = {} }) {
    const { put, errors, data, reset, setData } = useForm({
        name: "",
    });

    function onChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        const newData = { ...data, [name]: value };

        setData(newData);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        put(route("admin.departments.update", { department: department.id }), {
            onSuccess: () => reset(),
            onError: () => console.log(errors),
        });
    }

    useEffect(() => {
        setData(department);
    }, []);

    return (
        <>
            <div className="p-5 dark bg-white w-2/4 mx-auto mt-24 shadow-sm rounded-lg">
                <p className="text-xl font-semibold">Update Department</p>
                <hr className="my-2" />
                {/* Form section */}
                <form>
                    <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                        <Input
                            label="Name"
                            name="name"
                            placeholder="Enter your name"
                            error={errors}
                            onChange={onChange}
                            defaultValue={department.name}
                        />
                    </div>

                    <div className="mt-4">
                        <button
                            onClick={handleSubmit}
                            className="btn !px-8 bg-orange-400 text-orange-100"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>

            {/* Roles and User Roles */}
            <div className="p-5 dark bg-white w-2/4 mx-auto mt-4 shadow-sm rounded-lg">
                <p className="text-lg font-semibold">
                    Staffs in this Department
                </p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead className="text-right">Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {department?.employees?.map((emp, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">
                                    {emp?.user?.name}
                                </TableCell>
                                <TableCell>{emp?.user?.email}</TableCell>
                                <TableCell>{emp?.user?.phone}</TableCell>
                                <TableCell className="text-right">
                                    {emp?.job_title}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
