import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";
const AddNews = (props) => {
    const { id } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        image: null,
        title: "",
        description: "",
        sightSeeing_id: id,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("news.store"));
    }
    const [image, setImage] = useState(null);

    useEffect(() => {
        return () => {
            reset("image", "password_confirmation");
        };
    }, []);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setData("image", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
            <div className="mb-4">
                <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="title"
                >
                    Title
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="image"
                >
                    Image
                </label>
                <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleFileUpload}
                    className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                />
                {errors.image && (
                    <div className="text-red-500">{errors.image}</div>
                )}
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="description"
                >
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                />
                {errors.description && (
                    <div className="text-red-500">{errors.description}</div>
                )}
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="id"
                >
                    Sight Seeing ID
                </label>

                <input
                    id="id"
                    name="id"
                    type="text"
                    value={data.sightSeeing_id}
                    onChange={(e) => setData("sightSeeing_id", e.target.value)}
                    className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                />
                {errors.sightSeeing_id && (
                    <div className="text-red-500">{errors.sightSeeing_id}</div>
                )}
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={processing}
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default AddNews;
