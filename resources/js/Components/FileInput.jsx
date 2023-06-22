import { useState } from "react";
import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function FileInput(
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
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                defaultValue={defaultValue}
                className={
                    `file-input file-input-bordered ${
                        hasError ? " !border-red-400 " : ""
                    }` + className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => {
                    onChange && onChange(e);
                    sethasError(false);
                }}
                placeholder={placeholder}
                {...props}
            />
            {hasError && (
                <span className="text-red-500 text-sm mt-1">{error[name]}</span>
            )}
        </div>
    );
});
