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
        condition: "",
        diagnosis_date: "",
        medication: "",
        provider: "",
        next_check_up: "",
        notes: "",
        attachment: "",
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
        post("/staff/medicals", {
            onSuccess: () => reset(),
            onError: () => console.log(errors),
        });
    }

    return (
        <DashboardLayout title="New Medical Record">
            <form autoComplete="on">
                <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                    <Input
                        label="Medical Condition *"
                        name="condition"
                        placeholder="Medical Condition"
                        error={errors}
                        onChange={onChange}
                        defaultValue={data.condition}
                    />
                    <Input
                        label="Medications"
                        name="medication"
                        placeholder="Medications"
                        error={errors}
                        onChange={onChange}
                        defaultValue={data.medication}
                    />

                    <Input
                        label="Date of Diagnosis *"
                        name="diagnosis_date"
                        type="date"
                        error={errors}
                        onChange={onChange}
                    />
                    <Input
                        label="Next Medical Check-up"
                        name="next_check_up"
                        type="datetime-local"
                        error={errors}
                        onChange={onChange}
                    />
                    <Input
                        label="Medical Provider *"
                        placeholder="Medical Provider"
                        name="provider"
                        error={errors}
                        onChange={onChange}
                    />
                    <TextareaInput
                        label="Notes"
                        name="notes"
                        placeholder="Medical notes"
                        error={errors}
                        onChange={onChange}
                        defaultValue={data.notes}
                    />
                    {/* <Input
                        label="Attachments"
                        name="attachments"
                        error={errors}
                        type="file"
                        onChange={onChange}
                    /> */}
                </div>

                <button
                    onClick={handleSubmit}
                    className="btn mt-3 text-green-100 bg-green-600 fluid"
                >
                    Add Record
                </button>
            </form>
        </DashboardLayout>
    );
}
