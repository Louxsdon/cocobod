import { useState } from "react";
import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextareaInput(
    {
        type = "text",
        name,
        id,
        value,
        placeholder,
        defaultValue,
        className,
        autoComplete,
        required,
        isFocused,
        onChange,
        label,
        error,
        cols = "30",
        rows = "1",
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
        <div className="form-control">
            {label ? (
                <label className="label label-text" htmlFor={name && name}>
                    {label}
                </label>
            ) : null}
            <textarea
                name={name}
                id={id}
                value={value}
                defaultValue={defaultValue}
                className={
                    `textarea textarea-bordered ${
                        hasError ? " !border-red-400 " : ""
                    } ` + className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => {
                    onChange && onChange(e);
                    sethasError(false);
                }}
                cols={cols}
                rows={rows}
                placeholder={placeholder}
                {...props}
            />
            {hasError && (
                <span className="text-red-500 text-sm mt-1">{error[name]}</span>
            )}
        </div>
    );
});
