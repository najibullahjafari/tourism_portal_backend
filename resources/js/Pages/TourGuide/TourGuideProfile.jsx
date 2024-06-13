import { router, useForm, usePage } from "@inertiajs/react";
import React from "react";
import { useState } from "react";

const TourGuideProfile = () => {
    const { tour } = usePage().props;
    const { data, setData, processing } = useForm({
        id: tour[0].id,
        name: tour[0].name,
        father_name: tour[0].father_name,
        image: tour[0].image,
        passpord: tour[0].passpord,
        id_card: tour[0].id_card,
        location: tour[0].location,
        bio: tour[0].bio,
        phone: tour[0].phone,
    });
    const handleSubmit = () => {
        e.preventDefault();
        router.get("/userProfile/update");
    };
    const [imageProfile, setImage] = useState();
    const [imagePasspord, setPasspord] = useState();
    const handleFileUploadImage = (event) => {
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
    const handleFileUploadPassport = (event) => {
        const file = event.target.files[0];
        setData("passpord", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPasspord(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="bg-gray-50 py-12">
            <div className="max-w-screen-lg mx-auto">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="px-6 py-8">
                        <div className="text-2xl font-bold text-gray-800 mb-6 text-center">
                            {data.userType == "tourGuide"
                                ? "Tour Guide "
                                : "Tourist"}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="sm:hidden"
                                value={data.id}
                                name="id"
                            ></input>
                            <div className="mb-6">
                                <label
                                    htmlFor="name"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.name}
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="father_name"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Father Name
                                </label>
                                <input
                                    type="text"
                                    id="father_name"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.father_name}
                                    // onChange={(e) =>
                                    // setData("address", e.target.value)
                                    // }
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <img
                                    src={data.image}
                                    alt="TourGuide image"
                                    className="block py-2.5 px-0 w-full"
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    onChange={handleFileUploadImage}
                                />
                                <label
                                    for="image"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Choose Tour Guide image
                                </label>
                            </div>
                            <div className="mb-6">
                                <img
                                    src={data.passpord}
                                    alt="Passpord image"
                                    className="block py-2.5 px-0 w-full"
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="file"
                                    name="passpord"
                                    id="passpord"
                                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    placeholder=" "
                                    onChange={handleFileUploadPassport}
                                />
                                <label
                                    for="passpord"
                                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Choose Passport
                                </label>
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="Phone"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.phone}
                                    // onChange={(e) =>
                                    // setData("province", e.target.value)
                                    // }
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="bio"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Bio
                                </label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.bio}
                                    // onChange={(e) =>
                                    // setData("province", e.target.value)
                                    // }
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    // disable={profileStatus}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourGuideProfile;
