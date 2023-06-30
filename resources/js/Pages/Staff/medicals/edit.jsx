import AuthLayout from "@/Layouts/AuthLayout";
import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Input from "@/Components/Input";
import { generateSlug } from "@/lib/utils";
import SelectInput from "@/Components/SelectInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import TextareaInput from "@/Components/TextareaInput";

export default function create({ medical }) {
    const { put, errors, data, reset, setData } = useForm({
        condition: "",
        diagnosis_date: "",
        medication: "",
        provider: "",
        next_check_up: "",
        notes: "",
        attachment: "",
    });
    console.log(medical);

    function onChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        const newData = { ...data, [name]: value };

        setData(newData);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        put(route("staff.medicals.update", medical.id), {
            onSuccess: () => reset(),
            onError: () => console.log(errors),
        });
    }

    useEffect(() => {
        setData(medical);
    }, []);

    return (
        <DashboardLayout title="Update Qualification">
            <form autoComplete="on">
                <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                    <Input
                        label="Medical Condition *"
                        name="condition"
                        placeholder="Medical Condition"
                        error={errors}
                        onChange={onChange}
                        defaultValue={medical.condition}
                    />
                    <Input
                        label="Medications"
                        name="medication"
                        placeholder="Medications"
                        error={errors}
                        onChange={onChange}
                        defaultValue={medical.medication}
                    />

                    <Input
                        label="Date of Diagnosis *"
                        name="diagnosis_date"
                        type="date"
                        error={errors}
                        onChange={onChange}
                        defaultValue={medical.diagnosis_date}
                    />
                    <Input
                        label="Next Medical Check-up"
                        name="next_check_up"
                        type="datetime-local"
                        error={errors}
                        onChange={onChange}
                        defaultValue={medical.next_check_up}
                    />
                    <Input
                        label="Medical Provider *"
                        placeholder="Medical Provider"
                        name="provider"
                        error={errors}
                        onChange={onChange}
                        defaultValue={medical.provider}
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
                    className="btn mt-4 !px-8 bg-orange-400 text-orange-100"
                >
                    Update Record
                </button>
            </form>
        </DashboardLayout>
    );
}
