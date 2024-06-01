import { useEffect, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Layout from "@/Layouts/layout/layout.jsx";
import InputError from "@/Components/InputError";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";

export default function Transportation() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        father_name: "",
        passport: "",
        phone: "",
        description: "",
        image: "",
        location: "",
    });

    const [passportImage, setPassportImage] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("transportation.requests"));
        reset(data);
    };

    // const handleFileUpload = (e) => {
    //     const file = e.target.files[0];
    //     setData("passport", file);
    // };
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setData("passport", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPassportImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Layout>
            <Head title="Transportation" />
            <div className="flex items-center justify-center flex-col">
                <div className="bg-white p-6 sm:p-4 shadow-md rounded-lg w-full ">
                    <div className="text-center mb-5">
                        <div className="text-3xl font-medium mb-3">
                            Register a car services
                        </div>
                    </div>
                    <form onSubmit={submit}>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
                            <div className="mb-3">
                                <label
                                    htmlFor="name"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Name
                                </label>
                                <InputText
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                    className="w-full"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="location"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Location
                                </label>
                                <InputText
                                    id="location"
                                    type="text"
                                    placeholder="Location"
                                    className="w-full"
                                    value={data.location}
                                    onChange={(e) =>
                                        setData("location", e.target.value)
                                    }
                                />
                                <InputError message={errors.location} />
                            </div>

                            {/* the text area for discription */}
                            <FloatLabel>
                                <InputTextarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    rows={5}
                                    cols={30}
                                />
                                <label htmlFor="description">Description</label>
                            </FloatLabel>
                            <div className="mb-3">
                                <label
                                    htmlFor="tazkira_no"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Driver Tazkira Number
                                </label>
                                <InputText
                                    id="tazkira_no"
                                    type="text"
                                    placeholder="Tazkira Number"
                                    className="w-full"
                                    value={data.tazkira_no}
                                    onChange={(e) =>
                                        setData("tazkira_no", e.target.value)
                                    }
                                />
                                <InputError message={errors.tazkira_no} />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="phone_number"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Phone Number
                                </label>
                                <InputText
                                    id="phone"
                                    type="text"
                                    placeholder="Phone Number"
                                    className="w-full"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                />
                                <InputError message={errors.phone} />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="passport"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Licience Image
                                </label>
                                <input
                                    type="file"
                                    id="passport"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    name="passport"
                                    onChange={handleFileUpload}
                                />
                                {errors.passport && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.passport}
                                    </p>
                                )}
                                {passportImage && (
                                    <div className="mt-3">
                                        <img
                                            src={passportImage}
                                            alt="Passport Preview"
                                            className="max-w-full h-auto rounded-md border border-gray-300 shadow-sm"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="image"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Image
                                </label>
                                <InputText
                                    type="file"
                                    id="image"
                                    className="w-full"
                                    name="image"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                />
                                <InputError message={errors.image} />
                                {image && (
                                    <div className="mt-3">
                                        <img
                                            src={image}
                                            alt="Passport Preview"
                                            className="max-w-full h-auto rounded-md border border-gray-300 shadow-sm"
                                        />
                                    </div>
                                )}
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Button
                                    label="Submit"
                                    className="p-button"
                                    disabled={processing}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
