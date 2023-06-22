import React from "react";

export default function RightSider() {
    return (
        <div className="w-full hidden xl:block xl:w-[20%]">
            <div className="card rounded-md">
                <div className="card-body space-y-2 text-center">
                    <h2>Become a Seller</h2>
                    <p className="text-sm text-gray-400">
                        Sell on ShopLift, #1 leading e-commerce
                    </p>
                    <div className="flex space-x-3">
                        <button className="btn bg-blue-50 text-blue-600">
                            Login
                        </button>
                        <button className="btn bg-yellow-400">Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
