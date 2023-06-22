import { Link, usePage } from "@inertiajs/react";
import React from "react";
import { useState } from "react";
import { MdStar } from "react-icons/md";
import Rating from "react-rating";

export default function ProductListFilter({ categories }) {
    const [filteredRate, setFilteredRate] = useState(null);

    return (
        <aside className="divide-y">
            {categories && categories.length > 0 ? (
                <div
                    tabIndex={0}
                    className="overflow-hidden collapse lg:collapse-open collapse-arrow"
                >
                    <input type="checkbox" className="w-full" />
                    <div className="collapse-title px-5 py-2 font-bold text-black items-center flex">
                        By Category
                    </div>
                    <section className="h-[15rem] overflow-auto collapse-content">
                        {categories.map((cat, i) => (
                            <Link
                                href={`/${cat.slug}`}
                                key={i}
                                className="hover:bg-orange-50 w-full text-left block cursor-pointer 
                    text-sm py-1.5 hover:text-orange-500 "
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </section>
                </div>
            ) : null}

            <div className="py-2 px-2 lg:px-5 lg:py-4">
                <FilterHeading>Level</FilterHeading>
                <section className="w-ful">
                    <Checkbox label="KG" name="kg" />
                    <Checkbox label="Nersury" name="nersury" />
                    <Checkbox label="Primary" name="primary" />
                    <Checkbox label="JHS" name="shs" />
                    <Checkbox label="SHS" name="shs" />
                </section>
            </div>
            <div className="py-2 px-2 lg:px-5 lg:py-4">
                <FilterHeading>Price</FilterHeading>
                <section className="flex w-full space-x-1">
                    <input
                        className="w-[40%] p-1 focus:outline-none focus:border-emerald-50 border border-slate-100"
                        type="number"
                        step="000.1"
                        name="min_price"
                        placeholder="Min"
                    />
                    <input
                        className="w-[40%] p-1 focus:outline-none focus:border-emerald-50 border border-slate-100"
                        type="number"
                        step="000.1"
                        name="max_price"
                        placeholder="Max"
                    />
                    <button className="bg-orange-500 px-2 text-orange-100">
                        GO
                    </button>
                </section>
            </div>

            <div className="py-2 px-2 lg:px-5 lg:py-4 mb-14 md:mb-0">
                <h3 className="font-bold text-black">Ratings</h3>

                {[4, 3, 2, 1].map((rate) => (
                    <label
                        key={rate}
                        className="label cursor-pointer justify-start space-x-1 items-center"
                    >
                        <input
                            type="radio"
                            name="rating"
                            className="radio radio-sm checked:radio-primary border-slate-300 "
                        />
                        <span className="label-text flex items-center">
                            <Rating
                                initialRating={rate}
                                emptySymbol={<MdStar />}
                                readonly={true}
                                fullSymbol={
                                    <MdStar className="text-yellow-500" />
                                }
                            />
                            <p className="text-slate-600 ml-1">& up</p>
                        </span>
                    </label>
                ))}
            </div>
        </aside>
    );
}

function FilterHeading({ children }) {
    return <h3 className="font-bold text-black pb-2">{children}</h3>;
}

// checkbox
function Checkbox({ htmlFor, name, label }) {
    return (
        <label
            htmlFor={htmlFor}
            className="label py-1.5 space-x-2 justify-start"
        >
            <input
                type="checkbox"
                name={name}
                className="checkbox rounded-md checkbox-sm border-slate-300 checkbox-primary text-white"
            />
            <span className="label-text">{label}</span>
        </label>
    );
}
