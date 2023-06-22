import Input from "@/Components/Input";
import SelectInput from "@/Components/SelectInput";
import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Stationary({ errors, data, setData, defaultValue }) {
    const [errs, setErrs] = useState({
        brand: "",
        color: "",
    });
    function onChange(e) {
        setData((prev) => ({
            ...prev,
            stationary: { ...prev.stationary, [e.target.name]: e.target.value },
        }));
    }

    useEffect(() => {
        setErrs({
            brand: errors["stationary.brand"],
            color: errors["stationary.color"],
        });
    }, [errors]);

    return (
        <Fragment>
            <Input
                label="Product Brand"
                error={errs}
                name="brand"
                placeholder="Product Brand"
                onChange={onChange}
                defaultValue={data?.stationary?.brand}
            />
            <Input
                label="Color"
                error={errs}
                name="color"
                placeholder="Product Color"
                onChange={onChange}
                defaultValue={data?.stationary?.color}
            />
        </Fragment>
    );
}
