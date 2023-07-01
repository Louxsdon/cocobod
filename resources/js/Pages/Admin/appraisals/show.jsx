import { useState, useEffect } from "react";
import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import Input from "@/Components/Input";
import { useForm, router } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import dayjs from "dayjs";
import TextareaInput from "@/Components/TextareaInput";
import { cn } from "@/lib/utils";

export default function EditUser({ appraisal = {} }) {
    const { put, errors, data, reset, setData } = useForm({
        question1: "",
        question1_answer: "",
        question2: "",
        question2_answer: "",
        question3: "",
        question3_answer: "",
        question4: "",
        question4_answer: "",
        question5: "",
        question5_answer: "",
        question6: "",
        question6_answer: "",
        question7: "",
        question7_answer: "",
        question8: "",
        question8_answer: "",
        question9: "",
        question9_answer: "",
        question10: "",
        question10_answer: "",
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
        put(route("staff.appraisals.update", { appraisal: appraisal.id }), {
            onSuccess: () => reset(),
            onError: () => console.log(errors),
        });
    }

    useEffect(() => {
        setData(appraisal);
        console.log(appraisal);
    }, []);

    return (
        <div className={`flex justify-center items-center h-full `}>
            <div className={`dark bg-white w-[70%] p-4 rounded-lg`}>
                <fieldset className="border p-4">
                    <legend className="text-xl px-4 font-bold">{`Appraisal for ${dayjs(
                        appraisal.created_at
                    ).format("MMMM YYYY")}`}</legend>

                    <form autoComplete="on">
                        <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                            <MutiChoise
                                question={data.question1}
                                question_name={"question1_answer"}
                                onChange={onChange}
                                defaultValue={data.question1_answer}
                            />
                            <MutiChoise
                                question={data.question2}
                                question_name={"question2_answer"}
                                onChange={onChange}
                                defaultValue={data.question2_answer}
                            />
                            <MutiChoise
                                question={data.question3}
                                question_name={"question3_answer"}
                                onChange={onChange}
                                defaultValue={data.question3_answer}
                            />
                            <MutiChoise
                                question={data.question4}
                                question_name={"question4_answer"}
                                onChange={onChange}
                                defaultValue={data.question4_answer}
                            />
                            <MutiChoise
                                question={data.question5}
                                question_name={"question5_answer"}
                                onChange={onChange}
                                defaultValue={data.question5_answer}
                            />
                            <Input
                                label={data.question6}
                                name={"question6_answer"}
                                error={errors}
                                onChange={onChange}
                                defaultValue={appraisal.question6_answer}
                                disabled
                                className="disabled:cursor-default disabled:bg-slate-50"
                            />
                            <Input
                                label={data.question7}
                                name={"question7_answer"}
                                error={errors}
                                onChange={onChange}
                                defaultValue={appraisal.question7_answer}
                                disabled
                                className="disabled:cursor-default disabled:bg-slate-50"
                            />
                            <Input
                                label={data.question8}
                                name={"question8_answer"}
                                error={errors}
                                onChange={onChange}
                                defaultValue={appraisal.question8_answer}
                                disabled
                                className="disabled:cursor-default disabled:bg-slate-50"
                            />
                            <Input
                                label={data.question9}
                                name={"question9_answer"}
                                error={errors}
                                onChange={onChange}
                                defaultValue={appraisal.question9_answer}
                                disabled
                                className="disabled:cursor-default disabled:bg-slate-50"
                            />
                            <TextareaInput
                                label={data.question10}
                                name={"question10_answer"}
                                error={errors}
                                onChange={onChange}
                                defaultValue={appraisal.question10_answer}
                                disabled
                                className="disabled:cursor-default disabled:bg-slate-50"
                            />
                        </div>
                    </form>

                    <fieldset className="border p-3 rounded col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                        <legend className="px-2">Submitted By</legend>
                        <BioInfo title="Name" value={appraisal.user?.name} />
                        <BioInfo title="Email" value={appraisal.user?.email} />
                        <BioInfo title="Phone" value={appraisal.user?.phone} />
                    </fieldset>
                    {appraisal.status === "submitted" && (
                        <div className="p-3 rounded col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                            <button
                                onClick={() =>
                                    confirm(
                                        "Are sure you want to reject this?"
                                    ) &&
                                    router.post(
                                        route(
                                            "admin.appraisals.reject",
                                            appraisal.id
                                        )
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
                                        route(
                                            "admin.appraisals.approve",
                                            appraisal.id
                                        )
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
                </fieldset>
            </div>
        </div>
    );
}

function MutiChoise({ question, question_name, onChange, defaultValue }) {
    return (
        <div>
            <p>{question}</p>
            <div className="flex space-x-12">
                <article>
                    <p
                        name={question_name}
                        type="radio"
                        onChange={onChange}
                        className={`radio ${
                            defaultValue === "yes" ? "bg-accent" : ""
                        } border border-accent rounded mr-2`}
                    />
                    <label>Yes</label>
                </article>
                <article>
                    <p
                        name={question_name}
                        type="radio"
                        onChange={onChange}
                        className={`radio ${
                            defaultValue === "no" ? "bg-accent" : ""
                        } border border-accent rounded mr-2`}
                    />
                    <label>No</label>
                </article>
            </div>
        </div>
    );
}

function BioInfo({ title, value, className }) {
    return (
        <div className={cn(!value && "hidden", className)}>
            <h3 className="font-semibold text-lg text-slate-600">{title}:</h3>
            <p className="text-lg font-thin ">{value}</p>
        </div>
    );
}
