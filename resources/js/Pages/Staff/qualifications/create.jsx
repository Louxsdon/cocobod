import AuthLayout from "@/Layouts/AuthLayout";
import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Input from "@/Components/Input";
import { generateSlug } from "@/lib/utils";
import SelectInput from "@/Components/SelectInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import TextareaInput from "@/Components/TextareaInput";

export default function create() {
    const { post, data, errors, setData, reset } = useForm({
        name: "",
        institution: "",
        start_date: "",
        completion_date: "",
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
        post("/staff/qualifications", {
            onSuccess: () => reset(),
            onError: () => console.log(errors),
        });
    }

    return (
        <DashboardLayout title="Add New Qualification">
            <form autoComplete="on">
                <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                    <Input
                        label="Qualification Name"
                        name="name"
                        placeholder="Name of the qualification"
                        error={errors}
                        onChange={onChange}
                        defaultValue={data.name}
                    />
                    <TextareaInput
                        label="Name of Institution"
                        name="institution"
                        placeholder="Institution name"
                        error={errors}
                        onChange={onChange}
                        defaultValue={data.institution}
                    />
                    <Input
                        label="Date of Start"
                        name="start_date"
                        type="date"
                        error={errors}
                        onChange={onChange}
                    />
                    <Input
                        label="Date of Completion"
                        name="completion_date"
                        type="date"
                        error={errors}
                        onChange={onChange}
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="btn mt-3 text-green-100 bg-green-600 fluid"
                >
                    Add Qualification
                </button>
            </form>
        </DashboardLayout>
    );
}
