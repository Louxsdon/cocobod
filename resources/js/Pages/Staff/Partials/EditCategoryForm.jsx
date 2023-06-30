import Input from "@/Components/Input";
import Modal from "@/Components/Modal";
import MultiSelectBox from "@/Components/MultiSelectBox";
import { generateSlug } from "@/lib/utils";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";

export function EditCategoryForm({
    visible,
    handleVisibility,
    category,
    categories,
}) {
    const { put, errors, data, setData, reset } = useForm({
        name: "",
        slug: "",
        sub_categories: [],
        publish: true,
    });

    const [subCategories, setSubCategories] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const newData = { ...data, [name]: value };

        if (name === "name" || name === "slug") {
            const newSlug = generateSlug(value);
            newData.slug = newSlug;
        }

        setData(newData);
    };

    function handleSubmit(e) {
        e.preventDefault();
        put("categories/" + category.id, {
            onSuccess: () => {
                handleVisibility(false);
                reset();
            },
        });
        console.log("Data: ", data);
    }

    function renderCategoryOptions() {
        return categories.map((opt, i) => (
            <option key={i} value={opt.id}>
                {opt?.name}
            </option>
        ));
    }

    function renderSelectedOptions(option) {
        // setData({ ...data, option });
        return option.map((opt, i) => {
            const item = categories.find((o) => Number(o.id) == Number(opt));
            return (
                <option key={i} value={opt}>
                    {item?.name}
                </option>
            );
        });
    }

    useEffect(() => {
        let subCats = [];
        category.categories.forEach((c) => {
            subCats.push(c.id);
        });
        setSubCategories([...subCategories, ...subCats]);
        setData({
            name: category?.name,
            slug: category?.slug,
            sub_categories: category?.categories,
            publish: category?.publish,
        });
    }, []);

    return (
        <Modal show={visible} onClose={handleVisibility}>
            <div className="p-5">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold">Update Category</p>
                    <button
                        onClick={() => {
                            reset();
                            handleVisibility(false);
                        }}
                        className="bg-red-100 text-red-400 cursor-pointer px-2"
                    >
                        X
                    </button>
                </div>
                <hr className=" my-2" />
                {/* Form section */}
                <form onSubmit={(e) => e.preventDefault()}>
                    <Input
                        onChange={handleChange}
                        type="text"
                        name="name"
                        error={errors}
                        placeholder="Enter category name"
                        value={data.name}
                        label="Category Name"
                    />
                    <Input
                        // disabled
                        onChange={handleChange}
                        type="text"
                        name="slug"
                        error={errors}
                        placeholder="Category Slug: e.g my-category-name"
                        value={data.slug}
                        label="Slug"
                    />
                    <MultiSelectBox
                        header="Sub Categories"
                        renderOptions={renderCategoryOptions}
                        renderSelected={renderSelectedOptions}
                        defaultData={subCategories}
                        onChange={(cat) =>
                            setData({ ...data, sub_categories: cat })
                        }
                    />
                    <div className="form-control w-32">
                        <label className="cursor-pointer label">
                            <span className="label-text">Publish</span>
                            <input
                                // defaultValue={data.publish}
                                defaultChecked={category.publish}
                                // checked={data.publish}
                                onChange={({ target }) =>
                                    setData({
                                        ...data,
                                        publish: target.checked,
                                    })
                                }
                                type="checkbox"
                                name="publish"
                                className="toggle toggle-accent"
                            />
                        </label>
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={handleSubmit}
                            className="btn !px-8 bg-orange-500 text-orange-100"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
