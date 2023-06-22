import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles
import Catalog from "../Catalog";
import Carousel from "./Carousel";
import RightSider from "./RightSider";

export default function Header() {
    return (
        <header className=" md:pb-3 lg:py-6 bg-gray-100 container">
            <div className="flex items-start flex-col lg:flex-row lg:space-x-6">
                <div className="hidden lg:block w-full lg:w-[25%] xl:w-[20%]">
                    <Catalog />
                </div>
                <div className="w-full lg:w-[75%] xl:w-[60%]">
                    {/* Header images carousel */}

                    <Carousel />

                    {/* Info details */}
                    <div className="hidden md:flex flex-col items-center justify-center md:flex-row space-y-2 md:space-y-0 mt-3 md:space-x-3">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="font-bold">Fast Delivery</h2>
                                <p className="text-xs text-gray-500">
                                    Shop what you want, get it delivered
                                    anywhere
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h2 className="font-bold">Free Return</h2>
                                <p className="text-xs text-gray-500">
                                    Worry not, get 7 days free return of defect
                                    products
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <h2 className="font-bold">Customer Support</h2>
                                <p className="text-xs text-gray-500">
                                    24/7 customer services for your enquiries
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right section */}
                <RightSider />
            </div>
        </header>
    );
}
