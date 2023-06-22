import React, { useEffect, useState } from "react";
import { MdFavorite, MdStar, MdShoppingCart } from "react-icons/md";
import Rating from "react-rating";
import { Link, router, usePage } from "@inertiajs/react";

function ProductCard({
    id,
    name,
    image,
    price,
    sale_price,
    discounted,
    reviews = [],
    quantity: qty,
}) {
    const { cart } = usePage().props;
    const [counter, setCounter] = useState(
        cart.items?.find((item) => item.product_id === id)?.quantity
    );
    const [productInCart, setProductInCart] = useState(false);

    useEffect(() => {
        setProductInCart(cart.items?.some((items) => items.product_id === id));
        productInCart &&
            setCounter(
                cart.items?.find((item) => item.product_id === id)?.quantity
            );
    }, [cart]);

    return (
        <>
            <div className="card hover:drop-shadow-lg relative flex flex-col justify-between group ">
                <Link className="block h-full" href={`/details/${id}/${name}`}>
                    {typeof discounted !== "undefined" && (
                        <div className="bg-red-200 pl-4 pr-2 py-1 absolute right-0 top-0 z-10 rounded-bl-3xl">
                            <h4 className="text-xs text-red-500 font-semibold">{`-${discounted}%`}</h4>
                        </div>
                    )}
                    <div className=" overflow-hidden w-full card-header h-[250px] bg-white">
                        <img
                            className="w-auto m-auto object-fit h-full"
                            src={
                                image
                                    ? `http://127.0.0.1:8000/images/${image}`
                                    : ""
                            }
                            alt=""
                        />
                    </div>

                    <div className="card-body text-sm ">
                        {/* product name */}
                        <h4 className="line-clamp-2 text-sm">{name}</h4>

                        {/* product pricing section  */}
                        {sale_price ? (
                            <div className="flex justify-start items-center">
                                <div className="w-full lg:flex relative lg:space-x-4">
                                    {/* sale price */}
                                    <h4 className="text-gray-500 font-bold">
                                        GH&#x20B5;{sale_price}
                                    </h4>

                                    {/* product price */}
                                    <p className="line-through text-gray-400 text-xs">
                                        GH&#x20B5;{price}
                                    </p>
                                </div>
                                <p className="absolute right-0 px-2 py-2 text-center leading-3 flex items-center justify-center rounded-l-full bg-red-100 text-red-400">
                                    {(
                                        100 -
                                        (sale_price / price) * 100
                                    ).toFixed()}
                                    %
                                </p>
                            </div>
                        ) : (
                            <h4 className="text-gray-500 font-bold">
                                GH&#x20B5;{price}
                            </h4>
                        )}

                        {/* Product Ratings */}
                        {reviews.length > 0 && (
                            <div className="flex flex-col sm:flex-row justify-between text-gray-400">
                                {/* Item Ratings */}
                                <div className="flex items-center">
                                    <Rating
                                        initialRating={4.5}
                                        fractions={2}
                                        emptySymbol={<MdStar />}
                                        readonly
                                        fullSymbol={
                                            <MdStar className="text-yellow-500" />
                                        }
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </Link>

                <section className="px-3 pb-3">
                    {counter > 0 || productInCart ? (
                        <div className="flex items-center space-x-1 justify-center">
                            <button
                                onClick={() => {
                                    router.post(`/cart/decrease/${id}`, null, {
                                        preserveScroll: true,
                                    }),
                                        setCounter(counter - 1);
                                }}
                                disabled={counter === 0}
                                className="btn !py-1 bg-orange-500  text-orange-100 text-xs sm:text-base"
                            >
                                -
                            </button>
                            {/* quantity counter */}
                            <div className="counter p-2 rounded bg-slate-100 text-slate-500 ">
                                {counter}
                            </div>
                            <button
                                onClick={() => {
                                    router.post(`/cart/add/${id}`, null, {
                                        preserveState: true,
                                        preserveScroll: true,
                                    }),
                                        setCounter(counter + 1);
                                }}
                                disabled={counter === qty}
                                className="btn  !py-1 bg-orange-500  text-orange-100 text-xs sm:text-base"
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="h-11 hidden md:block md:group-hover:hidden"></div>
                            <div className="md:hidden md:group-hover:flex">
                                <button
                                    onClick={() =>
                                        router.post(`/cart/add/${id}`, null, {
                                            preserveScroll: true,
                                            preserveState: true,
                                            onSuccess: () => router.reload(),
                                        })
                                    }
                                    className="btn w-full bg-orange-500 text-orange-100 text-xs sm:text-sm space-x-1"
                                >
                                    <MdShoppingCart className="text-[17px] inline-block" />
                                    <span className="inline-block">
                                        Add to Cart
                                    </span>
                                </button>
                            </div>
                        </>
                    )}
                </section>
            </div>
        </>
    );
}

export default ProductCard;
