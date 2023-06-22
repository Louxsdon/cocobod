import React from "react";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Drawer from "react-modern-drawer";
import { MdArrowBack } from "react-icons/md";
import ProductListFilter from "../Filters/ProductListFilter";

function ProductsListing({ heading, children }) {
    const [openFilterDrawer, setopenFilterDrawer] = useState(false);
    const [sortBy, setSortBy] = useState("");
    const { categories } = usePage().props;

    const openFilter = () => {
        setopenFilterDrawer(!openFilterDrawer);
    };

    const filterProducts = (e) => {
        const value = e.target.value;
        setSortBy(value);
        router.get("", { sort: value }, { preserveState: true });
    };
    return (
        <section className="relative">
            <div className="rounded-lg overflow-hidden shadow-sm ">
                <div
                    className={`bg-white flex justify-between px-6 py-3 font-semibold`}
                >
                    <h3 className="text-lg">{heading}</h3>

                    {/* Products Sorting Section */}
                    <form action="" className="">
                        <div className="space-x-2 text-slate-500">
                            <label htmlFor="sort">Sort by:</label>
                            <select
                                name="sort"
                                className="px-2 py-1.5 focus:ring-0 outline-none border-none hover:bg-slate-100"
                                onChange={filterProducts}
                                defaultValue={sortBy}
                            >
                                <option className="px-3 py-2" value="futured">
                                    Futured
                                </option>
                                <option className="px-3 py-2" value="rating">
                                    Avg. Product Rating
                                </option>
                                <option value="lowest-price">
                                    Price: Low to High
                                </option>
                                <option value="highest-price">
                                    Price: High to Low
                                </option>
                            </select>
                        </div>
                    </form>
                </div>
                <hr />
                <div className="body bg-white p-3">
                    <div
                        className="grid grid-cols-2 md:grid-cols-3 
                    grid-flow-row lg:grid-cols-4 gap-2"
                    >
                        {children}
                    </div>
                </div>

                {/* Mobile sorting and filter footer */}
                <section className="md:hidden flex items-center divide-x space-x-2 h-[40px] bg-slate-800 px-4 text-white fixed bottom-0 left-0 right-0">
                    <div className="space-x-2 text-slate-200">
                        <label htmlFor="sort">Sort:</label>
                        <select
                            name="sort"
                            className="px-2 py-1.5 hover:text-black bg-transparent focus:ring-0 outline-none border-none hover:bg-orange-100"
                            onChange={filterProducts}
                            defaultValue={sortBy}
                        >
                            <option className="px-3 py-2" value="rating">
                                Product Rating
                            </option>
                            <option value="popularity">Popularity</option>
                            <option value="lowest-price">
                                Price: Low to High
                            </option>
                            <option value="highest-price">
                                Price: High to Low
                            </option>
                        </select>
                    </div>
                    <button className="pl-4" onClick={openFilter}>
                        FILTER
                    </button>
                </section>
            </div>

            <Drawer
                open={openFilterDrawer}
                onClose={openFilter}
                direction="bottom"
                overlayOpacity={0.2}
                size={"70vh"}
                lockBackgroundScroll={true}
                style={{ background: "#eee" }}
            >
                {/* Header */}
                <div className="bg-white px-3 py-1.5">
                    <article className="flex items-center space-x-2 font-semibold text-base">
                        <button
                            onClick={openFilter}
                            className="p-2 hover:bg-slate-100 rounded-full"
                        >
                            <MdArrowBack className="text-[20px]" />
                        </button>
                        <h3>Filter</h3>
                    </article>
                </div>

                {/* filters */}
                <section className="py-3 overflow-y-auto h-full">
                    <div className="bg-white mb-5">
                        <ProductListFilter categories={categories} />
                    </div>
                </section>
            </Drawer>
        </section>
    );
}

export default ProductsListing;
