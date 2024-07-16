import Layout from "@/Layouts/layout/layout";
import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";

const EditTourGuide = () => {
    const { tour } = usePage().props;
    console.log(tour);
    const { data, setData, put, processing, reset, errors } = useForm({
        name: tour[0].name || "",
        father_name: tour[0].father_name || "",
        image: tour[0].image || "",
        passport: tour[0].passport || "",
        id_card: tour[0].id_card || "",
        location: tour[0].location || "",
        phone: tour[0].phone || "",
        email: tour[0].email || "",
        password: "",
        bio: tour[0].bio || "",
        userType: tour[0].userType || "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [imageProfile, setImage] = useState(null);
    const [imagePassport, setPassport] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        // Log the form data to the console

        post(`/userProfile/update/${tour.id}`, {
            data: formData,
            onSuccess: () => {
                reset();
                setSuccessMessage("The user updated successfully!");
                setTimeout(() => setSuccessMessage(""), 3000);
            },
            onError: (errors) => {
                console.error("Errors:", errors);
            },
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    };

    const handleFileUploadImage = (e) => {
        const file = e.target.files[0];
        setData("image", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileUploadPassport = (e) => {
        const file = e.target.files[0];
        setData("passport", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPassport(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-white mb-6 p-6 sm:p-4 shadow-md rounded-lg w-full">
            <h3 className="max-w-md mx-auto mt-5 text-center">EDIT USER</h3>
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                    {successMessage}
                </div>
            )}
            {Object.keys(errors).length > 0 && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    {Object.values(errors).map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
            <form
                className="w-full"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <div className="flex flex-wrap -mx-3 mb-6">
                    {/* Name */}
                    <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="name"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            required
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </div>
                    {/* Father Name */}
                    <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="father_name"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                            Father Name
                        </label>
                        <input
                            type="text"
                            name="father_name"
                            id="father_name"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            required
                            value={data.father_name}
                            onChange={(e) =>
                                setData("father_name", e.target.value)
                            }
                        />
                    </div>
                    {/* ID Card */}
                    <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="id_card"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                            ID Card
                        </label>
                        <input
                            type="text"
                            name="id_card"
                            id="id_card"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            required
                            value={data.id_card}
                            onChange={(e) => setData("id_card", e.target.value)}
                        />
                    </div>
                    {/* Location */}
                    <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="location"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            required
                            value={data.location}
                            onChange={(e) =>
                                setData("location", e.target.value)
                            }
                        />
                    </div>
                    {/* Phone */}
                    <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="phone"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                            Phone No
                        </label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            required
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                        />
                    </div>
                    {/* Email */}
                    <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="email"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            required
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </div>
                    {/* Password */}
                    <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="password"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </div>
                    {/* User Type */}
                    <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="userType"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                            User Type
                        </label>
                        <select
                            name="userType"
                            id="userType"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            required
                            value={data.userType}
                            onChange={(e) =>
                                setData("userType", e.target.value)
                            }
                        >
                            <option value="">Select User Type</option>
                            <option value="tourist">Tourist</option>
                            <option value="user">User</option>
                            <option value="super-admin">Super Admin</option>
                            <option value="hoteladmin">Hotel Admin</option>
                            <option value="transportadmin">
                                Tranpsport Admin
                            </option>
                        </select>
                    </div>
                    {/* Image */}
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="image"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                            Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            onChange={handleFileUploadImage}
                        />
                    </div>
                    {/* Passport */}
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="passport"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                            Passport
                        </label>
                        <input
                            type="file"
                            name="passport"
                            id="passport"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            onChange={handleFileUploadPassport}
                        />
                    </div>
                    {/* Bio */}
                    <div className="w-full h-5 px-3 mb-7 md:mb-0">
                        <label
                            htmlFor="bio"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            id="bio"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            required
                            value={data.bio}
                            onChange={(e) => setData("bio", e.target.value)}
                        />
                    </div>
                </div>
                <div className="md:w-1/2">
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mt-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        disabled={processing}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTourGuide;
