import React from "react";

export default function BrandDesign({
    color,
    logo,
    text,
    className,
    textStyle,
    ...props
}) {
    return (
        <div
            style={{ borderColor: color }}
            className={[
                "label-text bg-white group cursor-pointer border px-2 py-4 border-b-4  rounded-lg facility  flex flex-col  items-center text-center",
                className ? className : "",
            ]}
            {...props}
        >
            <img src={`/images/${logo}`} alt="" />
            {text && (
                <h3
                    className={[
                        "mt-2 text-slate-600 ",
                        textStyle ? textStyle : "",
                    ]}
                >{`${text}`}</h3>
            )}
        </div>
    );
}
