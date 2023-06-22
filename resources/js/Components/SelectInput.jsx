import { useState } from "react";
import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function SelectInput(
    {
        name,
        id,
        placeholder,
        defaultValue,
        value,
        className,
        containerClassName,
        autoComplete,
        required,
        isFocused,
        onChange,
        label,
        error,
        children,
        multiple,
        ...props
    },
    ref
) {
    const [hasError, sethasError] = useState(false);
    const input = ref ? ref : useRef();

    useEffect(() => {
        sethasError(error && error[name]);
        if (isFocused) {
            input.current.focus();
        }
    }, [error]);

    return (
        <div className={"form-control " + containerClassName}>
            {label ? (
                <label
                    className="label label-text text-slate-600"
                    htmlFor={name && name}
                >
                    {label}
                </label>
            ) : null}
            <select
                value={value}
                name={name}
                id={id}
                defaultValue={defaultValue}
                className={
                    `input input-bordered ${
                        hasError ? " !border-red-400 " : null
                    } ` + className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => {
                    onChange && onChange(e);
                    sethasError(false);
                }}
                placeholder={placeholder}
                multiple={multiple}
                {...props}
            >
                {children}
            </select>
            {hasError && (
                <span className="text-red-500 text-sm mt-1">{error[name]}</span>
            )}
        </div>
    );
});
