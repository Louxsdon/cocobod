import { RadioGroup } from "@headlessui/react";
import React from "react";
import RadioIndicator from "./RadioIndicator";

export default function RadioLabel({ children, className, ...props }) {
    return (
        <div className="flex items-center">
            <RadioIndicator />
            <RadioGroup.Label className={className} {...props}>
                {children}
            </RadioGroup.Label>
        </div>
    );
}
