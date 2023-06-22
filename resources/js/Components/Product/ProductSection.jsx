import React from "react";
import PropTypes from "prop-types";
import { Link } from "@inertiajs/react";

function ProductSection({
    bgColor = "",
    textColor,
    heading,
    children,
    link,
    className = "",
}) {
    const color = bgColor ? bgColor : "white";

    return (
        <div className="rounded-lg overflow-hidden shadow-sm">
            <div
                className={`${color} flex justify-between px-6 py-3 font-semibold ${className}`}
            >
                <h3 className="text-lg">{heading}</h3>
                <Link href={link}>SEE ALL</Link>
            </div>
            <div className="body bg-white p-3">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                    {children}
                </div>
            </div>
        </div>
    );
}

ProductSection.propTypes = {
    link: PropTypes.string,
};

ProductSection.defaultProps = {
    link: "#",
};

export default ProductSection;
