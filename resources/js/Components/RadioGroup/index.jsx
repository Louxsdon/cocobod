import React from "react";
import * as RadioGroupRoot from "@radix-ui/react-radio-group";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import RadioIndicator from "./RadioIndicator";

export default function Radio({
    className,
    defaultValue,
    ariaLabel,
    children,
    ...props
}) {
    let [plan, setPlan] = useState("startup");
    return (
        <RadioGroup defaultValue={defaultValue} onChange={setPlan} {...props}>
            {children}
        </RadioGroup>
    );
}
