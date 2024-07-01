import Layout from "@/Layouts/layout/layout";
import { router, useForm } from "@inertiajs/react";
import React, { useState } from "react";

const AddTourGuide = () => {
    const {
        data: formData,
        setData,
        post,
        processing,
        reset,
    } = useForm({
        name: "",
        father_name: "",
        image: "",
        passport: "",
        id_card: "",
        location: "",
        phone: "",
        email: "",
        password: "",
        bio: "",
        userType: "",
    });

    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmite = (e) => {
        e.preventDefault();
        post("/addUser", {
            onSuccess: () => {
                reset();
                setSuccessMessage("The user added successfully!");
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);
            },
        });
    };

    const handleFileUploadImage = (e) => {
        setData("image", e.target.files[0]);
    };

    const handleFileUploadPassport = (e) => {
        setData("passport", e.target.files[0]);
    };

    return (
        <Layout>
            <div className="bg-white mb-6 p-6 sm:p-4 shadow-md rounded-lg w-full">
                <h3 className="max-w-md mx-auto mt-5 text-center">
                    ADD NEW USER
                </h3>
                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                        {successMessage}
                    </div>
                )}
                <form className="w-full" onSubmit={handleSubmite}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className=" md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                htmlFor="Admin_Hotel_Name"
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            >
                                Name
                            </label>
                            <input
                                type="input"
                                name="name"
                                id="Admin_Hotel_Name"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                placeholder=" "
                                required
                                value={formData.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                        </div>
                        <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                htmlFor="fname"
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            >
                                Father Name
                            </label>
                            <input
                                type="input"
                                name="father_name"
                                id="fname"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                placeholder=" "
                                required
                                value={formData.father_name}
                                onChange={(e) =>
                                    setData("father_name", e.target.value)
                                }
                            />
                        </div>

                        <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                htmlFor="id_card"
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            >
                                ID Card
                            </label>
                            <input
                                type="input"
                                name="id_card"
                                id="id_card"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                placeholder=" "
                                required
                                value={formData.id_card}
                                onChange={(e) =>
                                    setData("id_card", e.target.value)
                                }
                            />
                        </div>
                        <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                htmlFor="location"
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            >
                                Location
                            </label>
                            <input
                                type="input"
                                name="location"
                                id="location"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                placeholder=" "
                                required
                                value={formData.location}
                                onChange={(e) =>
                                    setData("location", e.target.value)
                                }
                            />
                        </div>
                        <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                htmlFor="phone"
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            >
                                Phone No
                            </label>
                            <input
                                type="input"
                                name="phone"
                                id="phone"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                placeholder=" "
                                required
                                value={formData.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                            />
                        </div>
                        <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                htmlFor="email"
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="input"
                                name="email"
                                id="email"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                placeholder=" "
                                required
                                value={formData.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                        </div>
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
                                placeholder=" "
                                required
                                value={formData.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                        </div>
                        <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                htmlFor="userType"
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            >
                                User Type
                            </label>
                            <select
                                name="userType"
                                value={formData.userType}
                                onChange={(e) => {
                                    setData("userType", e.target.value);
                                }}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            >
                                <option disabled selected>
                                    Choose an option
                                </option>
                                <option value="tourGuide">Tour Guide</option>
                                <option value="tourist">Tourist</option>
                            </select>
                        </div>
                        {/* image */}
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
                                placeholder=" "
                                required
                                onChange={handleFileUploadImage}
                            />
                        </div>
                        {/* passport */}
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
                                placeholder=" "
                                required
                                onChange={handleFileUploadPassport}
                            />
                        </div>
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
                                placeholder=""
                                required
                                value={formData.bio}
                                onChange={(e) => setData("bio", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2 ">
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
        </Layout>
    );
};

export default AddTourGuide;
