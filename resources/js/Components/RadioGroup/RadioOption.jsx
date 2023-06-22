import { RadioGroup } from "@headlessui/react";
import React from "react";

export default function RadioOption({
    className,
    value,
    id,
    children,
    ...props
}) {
    return (
        <RadioGroup.Option
            className={"focus:outline-none" + className}
            value={value}
            id={id}
            {...props}
        >
            {children}
        </RadioGroup.Option>
    );
}
