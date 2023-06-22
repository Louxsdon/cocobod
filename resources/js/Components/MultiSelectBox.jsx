import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import SelectInput from "./SelectInput";

export default function MultiSelectBox({
    header,
    renderOptions = <Fragment />,
    renderSelected = <Fragment />,
    onChange,
    defaultData = [],
}) {
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState([]);
    const [deSelected, setDeSelected] = useState([]);

    function onSelectionChange(e) {
        const val = Array.from(e.target.selectedOptions, (v) => v.value);
        setSelected([...val]);
    }

    function addOptions() {
        setOptions([...options, ...selected]);
        onChange([...options, ...selected]);
        setSelected([]);
    }

    function onRemoveOption(e) {
        const val = Array.from(e.target.selectedOptions, (v) => v.value);
        setDeSelected([...val]);
    }

    function removeOptions() {
        const _options = options.filter(
            (option) => !deSelected.includes(option.toString())
        );
        setOptions(_options);
        onChange(_options);
        setDeSelected([]);
    }

    useEffect(() => {
        setOptions(defaultData);
    }, [defaultData.length > 0]);

    return (
        <fieldset className="border mt-2 p-2">
            <legend>
                {header && (
                    <>
                        <p className="text-base text-slate-500 font-semibold px-2">
                            {header}
                        </p>
                    </>
                )}
            </legend>
            <section className="flex space-x-2">
                <div className="w-full">
                    <SelectInput
                        name="options"
                        label="Options"
                        containerClassName="!w-full"
                        multiple={true}
                        onChange={onSelectionChange}
                    >
                        {renderOptions()}
                    </SelectInput>
                    <button
                        onClick={addOptions}
                        className="bg-slate-200 w-full"
                    >
                        Add
                    </button>
                </div>
                <div className="w-full">
                    <SelectInput
                        onChange={onRemoveOption}
                        name="name"
                        label={`Assigned (${options.length})`}
                        multiple={true}
                    >
                        {options && renderSelected(options)}
                    </SelectInput>
                    <button
                        onClick={removeOptions}
                        className="bg-slate-200 w-full"
                    >
                        Remove
                    </button>
                </div>
            </section>
        </fieldset>
    );
}
