import Input from "@/Components/Input";
import SelectInput from "@/Components/SelectInput";
import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";

const levels = ["nursery", "kg", "primary", "jhs", "shs"];

export default function Book({
    errors,
    onChange,
    data,
    setData,
    defaultValue,
}) {
    const [errs, setErrs] = useState({
        author: "",
        publisher: "",
        level: "",
    });

    function onChange(e) {
        setData((prev) => ({
            ...prev,
            book: { ...prev.book, [e.target.name]: e.target.value },
        }));
    }

    //
    useEffect(() => {
        setErrs({
            author: errors["book.author"],
            publisher: errors["book.publisher"],
            level: errors["book.level"],
        });
    }, [errors]);
    return (
        <Fragment>
            <Input
                label="Book Author"
                error={errs}
                name="author"
                placeholder="Book Author"
                onChange={onChange}
                defaultValue={data?.book?.author}
            />
            <Input
                label="Book Publisher"
                error={errs}
                name="publisher"
                placeholder="Publisher"
                onChange={onChange}
                defaultValue={data?.book?.publisher}
            />
            <SelectInput
                onChange={onChange}
                defaultValue={data?.book?.level}
                className="input-control"
                name="level"
                label="Educational Level"
                error={errs}
            >
                <option value="">--- Choose Educationa Level ---</option>
                {levels.map((l, i) => (
                    <option key={i} value={l}>
                        {l.toUpperCase()}
                    </option>
                ))}
            </SelectInput>
        </Fragment>
    );
}
