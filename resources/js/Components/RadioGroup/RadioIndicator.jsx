import React from "react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

export default function RadioIndicator({ className, ...props }) {
    return (
        <div className={"text-2xl flex items-center " + className} {...props}>
            <MdRadioButtonUnchecked className="ui-checked:hidden rounded-full text-slate-400 hover:bg-slate-200" />
            <MdRadioButtonChecked className="hidden ui-checked:inline-block text-orange-500" />
        </div>
    );
}
