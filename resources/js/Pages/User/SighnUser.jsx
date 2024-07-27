import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import Layout from "@/Layouts/layout/layout";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Vission from "../Vission";
import "../Content.css";

const SighnUser = () => {
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

    const userTypes = [
        { label: "Tour Guide", value: "tourguide" },
        { label: "Tourist", value: "tourist" },
        { label: "User", value: "user" },
        { label: "Hotel ", value: "hoteladmin" },
        { label: "Transportation service", value: "transportadmin" },
    ];

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen">
                <div className="card w-6 m-3">
                    <h3 className="max-w-md mx-auto mt-5 text-center">
                        Register as
                    </h3>
                    {successMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                            {successMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmite}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="md:w-1/3 px-3 mb-6 md:mb-4">
                                <FloatLabel>
                                    <InputText
                                        id="Admin_Hotel_Name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <label htmlFor="Admin_Hotel_Name">
                                        Name
                                    </label>
                                </FloatLabel>
                            </div>
                            <div className="md:w-1/3 px-3 mb-6 md:mb-4">
                                <FloatLabel>
                                    <InputText
                                        id="fname"
                                        value={formData.father_name}
                                        onChange={(e) =>
                                            setData(
                                                "father_name",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <label htmlFor="fname">Father Name</label>
                                </FloatLabel>
                            </div>
                            <div className="md:w-1/3 px-3 mb-6 md:mb-4">
                                <FloatLabel>
                                    <InputText
                                        id="id_card"
                                        value={formData.id_card}
                                        onChange={(e) =>
                                            setData("id_card", e.target.value)
                                        }
                                    />
                                    <label htmlFor="id_card">ID Card</label>
                                </FloatLabel>
                            </div>
                            <div className="md:w-1/3 px-3 mb-6 md:mb-4">
                                <FloatLabel>
                                    <InputText
                                        id="location"
                                        value={formData.location}
                                        onChange={(e) =>
                                            setData("location", e.target.value)
                                        }
                                    />
                                    <label htmlFor="location">Location</label>
                                </FloatLabel>
                            </div>
                            <div className="md:w-1/3 px-3 mb-6 md:mb-4">
                                <FloatLabel>
                                    <InputText
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                    />
                                    <label htmlFor="phone">Phone No</label>
                                </FloatLabel>
                            </div>
                            <div className="md:w-1/3 px-3 mb-6 md:mb-4">
                                <FloatLabel>
                                    <InputText
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <label htmlFor="email">Email</label>
                                </FloatLabel>
                            </div>
                            <div className="md:w-1/3 px-3 mb-6 md:mb-4">
                                <FloatLabel>
                                    <InputText
                                        type="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <label htmlFor="password">Password</label>
                                </FloatLabel>
                            </div>
                            <div className="md:w-1/3 px-3 mb-6 md:mb-4">
                                <FloatLabel>
                                    <Dropdown
                                        id="userType"
                                        value={formData.userType}
                                        options={userTypes}
                                        onChange={(e) =>
                                            setData("userType", e.value)
                                        }
                                        placeholder="Choose an option"
                                    />
                                    <label htmlFor="userType">User Type</label>
                                </FloatLabel>
                            </div>

                            <div className="w-7 h-5 px-3 mb-7 md:mb-4">
                                <FloatLabel>
                                    <InputTextarea
                                        id="bio"
                                        value={formData.bio}
                                        onChange={(e) =>
                                            setData("bio", e.target.value)
                                        }
                                        rows={5}
                                    />
                                    <label htmlFor="bio">Bio</label>
                                </FloatLabel>
                            </div>

                            <div className="md:w-1/3 px-3 mb-6 md:mb-4">
                                <label
                                    htmlFor="image"
                                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                                >
                                    Image
                                </label>
                                <FileUpload
                                    name="image"
                                    customUpload
                                    uploadHandler={(e) =>
                                        setData("image", e.files[0])
                                    }
                                    auto
                                />
                            </div>
                            <div className="md:w-1/3 px-3 mb-6 md:mb-4">
                                <label
                                    htmlFor="passport"
                                    className="block uppercase tracking-wide  text-xs font-bold mb-2"
                                >
                                    Passport
                                </label>
                                <FileUpload
                                    name="passport"
                                    customUpload
                                    uploadHandler={(e) =>
                                        setData("passport", e.files[0])
                                    }
                                    auto
                                />
                            </div>
                            <div className="w-full h-5 px-3 mb-7 md:mb-4">
                                <Button
                                    type="submit"
                                    label="Save"
                                    className="mt-6 bg-primary"
                                    disabled={processing}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Vission />
            <Footer />
        </>
    );
};

export default SighnUser;
