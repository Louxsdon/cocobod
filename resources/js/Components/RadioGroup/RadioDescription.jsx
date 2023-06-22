import { RadioGroup } from "@headlessui/react";
import React from "react";

export default function RadioDescription({ children }) {
    return <RadioGroup.Description>{children}</RadioGroup.Description>;
}
