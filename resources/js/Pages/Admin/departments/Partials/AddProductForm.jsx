import React, { useState, useEffect } from "react";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import Input from "@/Components/Input";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import Book from "../../../Components/ProductTypes/Book";
import Stationary from "../../../Components/ProductTypes/Stationary";

export function AddProductForm({ visible, handleVisibility, categories = [] }) {
    const { post, reset, errors, data, setData } = useForm({
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

        console.log("submitted");
        console.log(data);

        post("products", {
            onSuccess: () => {
                reset();
                handleVisibility(false);
            },
            onError: (err) => {
                console.log(err);
            },
        });

        // {
        //     errors && console.log(errors);
        // }
    }

    useEffect(() => {
        categories.length > 0 && setData("category", categories[0].id);
    }, []);

    return (
        <Modal show={visible} onClose={handleVisibility}>
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold">Add New Product</p>
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
                        <legend>New Product</legend>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Name"
                                error={errors}
                                name="name"
                                placeholder="Product Name"
                                onChange={onChange}
                            />
                            <SelectInput
                                onChange={onChange}
                                className="input-control"
                                name="product_type"
                                label="Product Type"
                                error={errors}
                                defaultValue=""
                            >
                                <option value="">Type of Product</option>
                                <option value="book">Book</option>
                                <option value="stationary">Stationary</option>
                            </SelectInput>

                            {/* render product type input boxes */}
                            {data.product_type === "book" ? (
                                <Book errors={errors} setData={setData} />
                            ) : data.product_type === "stationary" ? (
                                <Stationary errors={errors} setData={setData} />
                            ) : null}

                            <Input
                                label="Price"
                                error={errors}
                                type="number"
                                name="price"
                                placeholder="Product Price"
                                onChange={onChange}
                            />
                            <Input
                                label="Sale Price"
                                error={errors}
                                type="number"
                                name="sale_price"
                                placeholder="Product Discounted Price"
                                onChange={onChange}
                            />
                            <Input
                                label="Stock (Quantity)"
                                error={errors}
                                type="number"
                                name="stock"
                                placeholder="Product Quantity (Stock)"
                                onChange={onChange}
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
                            ></TextareaInput>
                            <SelectInput
                                onChange={onChange}
                                className="input-control"
                                name="category"
                                label="Category"
                                errors={errors}
                            >
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
                        <button
                            onClick={handleSubmit}
                            className="btn text-green-100 bg-green-600 fluid"
                        >
                            Save Product
                        </button>
                    </fieldset>
                </form>
            </div>
        </Modal>
    );
}
