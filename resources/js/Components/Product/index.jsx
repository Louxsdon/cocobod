import React from "react";
import PropTypes from "prop-types";
import {
    MdLocationOn,
    MdRefresh,
    MdFavorite,
    MdStar,
    MdShoppingCart,
} from "react-icons/md";
import Rating from "react-rating";
import { Link } from "@inertiajs/react";

function Product({
    id,
    name,
    image,
    category,
    price,
    rating,
    seller,
    discounted,
}) {
    return (
        <>
            <Link
                href={`/details/${id}/${name}`}
                className="card hover:shadow-lg relative"
            >
                {typeof discounted !== "undefined" && (
                    <div className="bg-red-200 pl-4 pr-2 py-1 absolute right-0 top-0 z-10 rounded-bl-3xl">
                        <h4 className="text-xs text-red-500 font-semibold">{`-${discounted}%`}</h4>
                    </div>
                )}
                <div className=" overflow-hidden w-full card-header h-32 bg-white">
                    <img
                        className="w-auto m-auto object-cover h-ful"
                        src={
                            image ? "http://127.0.0.1:8000/images/" + image : ""
                        }
                        alt=""
                    />
                </div>
                <div className="card-body text-sm">
                    <div className="w-full flex justify-between ">
                        <p className="inline-block line-through text-gray-400 text-xs">
                            GH&#x20B5;700
                        </p>
                        <h4 className="inline-block text-gray-500 font-bold">
                            GH&#x20B5;{price}
                        </h4>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between text-gray-400">
                        {/* Item Ratings */}
                        <div className="flex items-center">
                            <Rating
                                initialRating={4.5}
                                fractions={2}
                                emptySymbol={<MdStar />}
                                fullSymbol={
                                    <MdStar className="text-yellow-500" />
                                }
                            />
                        </div>
                    </div>
                    <h4 className="line-clamp-2">{name}</h4>
                </div>
            </Link>
        </>
    );
}
export default Product;
