import React from "react";
import { useForm } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout";

const AddProvinceForm = () => {
    const { data, setData, post } = useForm({
        id: "",
        name: "",
        nameFa: "",
        namePa: "",
        latitude: "",
        longitude: "",
        districts: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("provinces"), {
            onSuccess: () => {
                alert("Province added successfully!");
            },
            onError: (errors) => {
                alert("Failed to add province.");
                console.error(errors);
            },
        });
    };

    return (
        <Layout>
            <div className="card">
                <form onSubmit={handleSubmit} className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold text-center mb-4">
                        Add Province
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="mb-4">
                            <label className="block text-gray-700">ID</label>
                            <input
                                type="text"
                                name="id"
                                value={data.id}
                                onChange={handleChange}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Name (Fa)
                            </label>
                            <input
                                type="text"
                                name="nameFa"
                                value={data.nameFa}
                                onChange={handleChange}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Name (Pa)
                            </label>
                            <input
                                type="text"
                                name="namePa"
                                value={data.namePa}
                                onChange={handleChange}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Latitude
                            </label>
                            <input
                                type="text"
                                name="latitude"
                                value={data.latitude}
                                onChange={handleChange}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Longitude
                            </label>
                            <input
                                type="text"
                                name="longitude"
                                value={data.longitude}
                                onChange={handleChange}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Districts
                            </label>
                            <input
                                type="text"
                                name="districts"
                                value={data.districts}
                                onChange={handleChange}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Add Province
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default AddProvinceForm;
