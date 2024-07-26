import React, { useEffect, useState, useRef } from "react";
import { Head, useForm } from "@inertiajs/react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Layout from "@/Layouts/layout/layout.jsx";
import InputError from "@/Components/InputError";
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";

export default function Transportation() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        father_name: "",
        passport: "",
        phone: "",
        discription: "",
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

    // for the file upload
    const toast = useRef(null);

    const onUpload = () => {
        toast.current.show({
            severity: "info",
            summary: "Success",
            detail: "File Uploaded",
        });
    };

    const handlePassportUpload = (event) => {
        const file = event.files[0];
        setData("passport", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPassportImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload = (event) => {
        const file = event.files[0];
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
        <Layout>
            <Head title="Transportation" />
            <div className="card flex items-center justify-center flex-col">
                <div className="text-center mb-5">
                    <div className="text-3xl font-medium mb-3">
                        Register a car service
                    </div>
                </div>
                <form onSubmit={submit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="md:w-1/3 px-3 mb-6 md:mb-4">
                            <FloatLabel>
                                <InputText
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="w-full"
                                />
                                <label htmlFor="name">Name</label>
                            </FloatLabel>
                            <InputError message={errors.name} />
                        </div>

                        <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                            <FloatLabel>
                                <InputText
                                    id="location"
                                    value={data.location}
                                    onChange={(e) =>
                                        setData("location", e.target.value)
                                    }
                                    className="w-full"
                                />
                                <label htmlFor="location">Location</label>
                            </FloatLabel>
                            <InputError message={errors.location} />
                        </div>

                        <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                            <FloatLabel>
                                <InputText
                                    id="tazkira_no"
                                    value={data.tazkira_no}
                                    onChange={(e) =>
                                        setData("tazkira_no", e.target.value)
                                    }
                                    className="w-full"
                                />
                                <label htmlFor="tazkira_no">
                                    Driver Tazkira Number
                                </label>
                            </FloatLabel>
                            <InputError message={errors.tazkira_no} />
                        </div>

                        <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                            <FloatLabel>
                                <InputText
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    className="w-full"
                                />
                                <label htmlFor="phone">Phone Number</label>
                            </FloatLabel>
                            <InputError message={errors.phone} />
                        </div>

                        <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                htmlFor="passport"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Licence Image
                            </label>
                            <FileUpload
                                name="passport"
                                customUpload
                                uploadHandler={handlePassportUpload}
                                auto
                                chooseLabel="Choose"
                                className="w-full"
                            />
                            <InputError message={errors.passport} />
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

                        <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                htmlFor="image"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                Image
                            </label>
                            <FileUpload
                                name="image"
                                customUpload
                                uploadHandler={handleImageUpload}
                                auto
                                chooseLabel="Choose"
                                className="w-full"
                            />
                            <InputError message={errors.image} />
                            {image && (
                                <div className="mt-3">
                                    <img
                                        src={image}
                                        alt="Image Preview"
                                        className="max-w-full h-auto rounded-md border border-gray-300 shadow-sm"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="w-full mt-3 px-3 mb-6 md:mb-0">
                            <FloatLabel>
                                <InputTextarea
                                    id="discription"
                                    value={data.discription}
                                    onChange={(e) =>
                                        setData("discription", e.target.value)
                                    }
                                    rows={5}
                                    cols={30}
                                    className="w-full"
                                />
                                <label htmlFor="discription">Discription</label>
                            </FloatLabel>
                            <InputError message={errors.discription} />
                        </div>

                        <div className="flex   w-full mt-3">
                            <Button
                                label="Submit"
                                className="p-button-success m-3 "
                                disabled={processing}
                                type="submit"
                            />
                        </div>
                    </div>
                </form>

                <Toast ref={toast} />
            </div>
        </Layout>
    );
}
