import React, { useState, useEffect } from "react";
import Modal from "@/Components/Modal";
import Input from "@/Components/Input";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import { FaTrash } from "react-icons/fa";
import { router, useForm } from "@inertiajs/react";
import Book from "@/Components/ProductTypes/Book";
import Stationary from "@/Components/ProductTypes/Stationary";

export function EditProductForm({
    visible,
    handleVisibility,
    categories = [],
    product,
}) {
    const { reset, errors, setError, data, setData } = useForm({
        name: "",
        price: "",
        quantity: "",
        sale_price: "",
        product_type: "",
        stock: "",
        description: "",
        category: "",
        book: { author: "", publisher: "", level: "" },
        stationary: { brand: "", color: "" },
    });

    function onChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();

        router.post(
            `products/${product.id}`,
            {
                _method: "PUT",
                ...data,
            },
            {
                onSuccess: () => {
                    reset();
                    handleVisibility(false);
                },
                onError: (err) => {
                    setError(err);
                },
            }
        );
    }

    // delete product photo
    const deleteProductPhoto = (e, id) => {
        e.preventDefault();
        const confirmed = confirm("Are you sure you want to delete this item?");
        confirmed &&
            router.delete("product-photos/" + id, {
                onSuccess: () => {
                    reset();
                    handleVisibility(false);
                },
            });
    };

    useEffect(() => {
        const defaultData = {
            name: product.name,
            price: product.price,
            sale_price: product.sale_price,
            stock: product.stock,
            quantity: product.quantity,
            product_type: product.product_type,
            book: product.book,
            stationary: product.stationary,
            description: product.description,
            category: product?.categories[0]?.id,
        };
        setData(defaultData);
        console.log(product);
    }, [product]);

    return (
        <Modal show={visible} onClose={handleVisibility}>
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold">Update Product</p>
                    <button
                        onClick={() => {
                            handleVisibility(false);
                            reset();
                        }}
                        className="bg-red-100 text-red-400 cursor-pointer px-2"
                    >
                        X
                    </button>
                </div>
                <hr className=" mt-5" />

                {/* Form section */}
                <form autoComplete="on">
                    <fieldset className="border p-4">
                        <legend>Edit Product</legend>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Name"
                                error={errors}
                                name="name"
                                placeholder="Product Name"
                                onChange={onChange}
                                defaultValue={product.name}
                            />
                            <SelectInput
                                onChange={onChange}
                                className="input-control"
                                name="product_type"
                                label="Product Type"
                                errors={errors}
                                value={data.product_type}
                            >
                                <option value="">Type of Product</option>
                                <option value="book">Book</option>
                                <option value="stationary">Stationary</option>
                            </SelectInput>

                            {/* render product type input boxes */}
                            {data.product_type === "book" ? (
                                <Book
                                    errors={errors}
                                    setData={setData}
                                    data={data}
                                />
                            ) : data.product_type === "stationary" ? (
                                <Stationary
                                    errors={errors}
                                    setData={setData}
                                    data={data}
                                />
                            ) : null}

                            <Input
                                label="Price"
                                error={errors}
                                type="number"
                                name="price"
                                placeholder="Product Price"
                                onChange={onChange}
                                defaultValue={product.price}
                            />
                            <Input
                                label="Sale Price"
                                error={errors}
                                type="number"
                                name="sale_price"
                                placeholder="Product Discounted Price"
                                onChange={onChange}
                                defaultValue={product.sale_price}
                            />
                            <Input
                                label="Stock (Quantity)"
                                error={errors}
                                type="number"
                                name="stock"
                                placeholder="Product Quantity (Stock)"
                                onChange={onChange}
                                defaultValue={product.stock}
                            />
                            <TextareaInput
                                onChange={onChange}
                                name="description"
                                label="Description"
                                error={errors}
                                placeholder="Product Description"
                                cols="30"
                                rows="1"
                                className="input-control"
                                defaultValue={product.description}
                            ></TextareaInput>
                            <SelectInput
                                onChange={onChange}
                                className="input-control"
                                name="category"
                                label="Category"
                                errors={errors}
                                defaultValue={product?.categories[0]?.id}
                            >
                                <option value="">-- Choose Category --</option>
                                {categories.map((cat, i) => (
                                    <option key={i} value={Number(cat?.id)}>
                                        {cat.name}
                                    </option>
                                ))}
                            </SelectInput>

                            <Input
                                label="Add Images"
                                error={errors}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        photos: e.target.files,
                                    });
                                }}
                                multiple
                                className="input-control"
                                type="file"
                                name="photos"
                            />
                        </div>
                        {product.photos ? (
                            <div className="w-full flex overflow-x-auto space-x-3">
                                {product.photos.map((photo, i) => (
                                    <div
                                        key={i}
                                        className="relative  border border-slate-100 items-center justify-center flex"
                                    >
                                        <img
                                            className="w-[80px]"
                                            src={`http://127.0.0.1:8000/images/${photo.image_url}`}
                                            alt=""
                                        />
                                        <button
                                            onClick={(e) =>
                                                deleteProductPhoto(e, photo.id)
                                            }
                                            className="text-sm py-1 items-center absolute bottom-0 w-full
                                                 text-danger-100 bg-danger-500/70"
                                            title="Delete"
                                        >
                                            <FaTrash className="inline-block" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                        &nbsp;
                        <button
                            onClick={handleSubmit}
                            className="btn text-orange-50 bg-orange-500 fluid"
                        >
                            Update Product
                        </button>
                    </fieldset>
                </form>
            </div>
        </Modal>
    );
}
