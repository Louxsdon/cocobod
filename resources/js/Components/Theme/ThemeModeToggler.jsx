import React, { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function ThemeModeToggler() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(
        () => {
            if (
                document.documentElement.getAttribute("data-theme") ===
                    "dark" ||
                (!("theme" in localStorage) &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches)
            ) {
                setIsDarkMode(true);
            } else {
                setIsDarkMode(false);
            }
        },
        [isDarkMode, document.documentElement.getAttribute("data-theme")],
        window.matchMedia("(prefers-color-scheme: dark)")
    );
    return (
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`rounded-full p-2 text-blue-400 ring-1 ring-blue-400 ${
                !isDarkMode ? "bg-slate-50" : "bg-[#151b40]"
            }`}
            data-toggle-theme="dark,light"
            data-act-class="ACTIVECLASS"
        >
            {!isDarkMode ? <MdLightMode /> : <MdDarkMode />}
        </button>
    );
}
