import AuthLayout from "@/Layouts/AuthLayout";
import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Input from "@/Components/Input";
import { generateSlug } from "@/lib/utils";
import SelectInput from "@/Components/SelectInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import TextareaInput from "@/Components/TextareaInput";

export default function create({ users, permissions, roles, departments }) {
    const { post, data, errors, setData, reset } = useForm({
        gender: "male",
        date_of_birth: "",
        job_title: "",
        address: "",
        hired_on: "",
        bio: "",
        department_id: "",
        user_id: "",
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
        post("/admin/employees", {
            onSuccess: () => reset(),
            onError: () => console.log(errors),
        });
    }

    return (
        <DashboardLayout title="Add New Employee">
            <form>
                <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                    <SelectInput
                        name="user_id"
                        label="User"
                        error={errors}
                        onChange={onChange}
                    >
                        <option value="" disabled>
                            ---- Select User ----
                        </option>
                        {users?.map((user, i) => (
                            <option key={i} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </SelectInput>
                    <SelectInput
                        name="gender"
                        label="Gender"
                        error={errors}
                        onChange={onChange}
                        defaultValue={data.gender}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </SelectInput>
                    <Input
                        label="Date of Birth"
                        name="date_of_birth"
                        type="date"
                        error={errors}
                        onChange={onChange}
                    />
                    <Input
                        label="Job Title"
                        name="job_title"
                        placeholder="Enter Job Title"
                        error={errors}
                        onChange={onChange}
                    />
                    <Input
                        label="Address"
                        name="address"
                        placeholder="Enter address"
                        error={errors}
                        onChange={onChange}
                    />
                    <Input
                        label="Date Hired"
                        name="hired_on"
                        type="date"
                        error={errors}
                        onChange={onChange}
                    />
                    <TextareaInput
                        label="Employee Bio"
                        name="bio"
                        error={errors}
                        onChange={onChange}
                        placeholder="Write a bio"
                    />
                    <SelectInput
                        name="department_id"
                        defaultValue=""
                        label="Department"
                        error={errors}
                        onChange={onChange}
                    >
                        <option value="" disabled>
                            ---- Select Department ----
                        </option>
                        {departments?.map((user, i) => (
                            <option key={i} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </SelectInput>
                </div>

                <div className="mt-4">
                    <button
                        onClick={handleSubmit}
                        className="btn mt-3 text-green-100 bg-green-600 fluid"
                    >
                        Add Employee
                    </button>
                </div>
            </form>
        </DashboardLayout>
    );
}
