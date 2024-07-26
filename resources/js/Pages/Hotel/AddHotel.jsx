import Layout from "@/Layouts/layout/layout";
import { router, useForm, usePage } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";

const AddHotel = (props) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        address: "",
        province: "",
        photoAddress: "",
        status: "deactive",
        sight_seeing_id: null,
    });

    const [photoAddress, setPhotoAddress] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [sightseeingOptions, setSightseeingOptions] = useState([]);
    const toast = React.useRef(null);

    useEffect(() => {
        fetchSightseeingOptions();
        return () => {
            reset("photoAddress", "password_confirmation");
        };
    }, []);

    const fetchSightseeingOptions = async () => {
        try {
            const response = await fetch("getSightSeeing");
            const data = await response.json();
            const formattedOptions = data.data.map((item) => ({
                label: item.name,
                value: item.id,
            }));
            setSightseeingOptions(formattedOptions);
        } catch (error) {
            console.error("Error fetching sightseeing options:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("hotel.store"), {
            onSuccess: () => {
                setSubmitted(true);
                toast.current.show({
                    severity: "success",
                    summary: "Success",
                    detail: "Hotel added successfully",
                    life: 3000,
                });
                reset();
            },
        });
    };

    const handleFileUpload = (event) => {
        const file = event.files[0];
        setData("photoAddress", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoAddress(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Layout>
            <Toast ref={toast} />
            <div className="  sm:rounded-lg card">
                <h3 className="max-w-md mb-5 mx-auto mt-5">ADD NEW HOTEL</h3>
                <form className="" onSubmit={handleSubmit}>
                    <div className="w-full row-auto justify-center text-center grid grid-cols-2 gap-4">
                        <div className="field col-span-3">
                            <span className="p-float-label">
                                <Dropdown
                                    id="Admin_Sightseeing_Select"
                                    value={data.sight_seeing_id}
                                    options={sightseeingOptions}
                                    onChange={(e) =>
                                        setData("sight_seeing_id", e.value)
                                    }
                                    optionLabel="label"
                                    optionValue="value"
                                    placeholder="Select a Sightseeing"
                                    className={classNames({
                                        "p-invalid": errors.sight_seeing_id,
                                    })}
                                />
                                <label htmlFor="Admin_Sightseeing_Select">
                                    Sightseeing
                                </label>
                            </span>
                            {errors.sight_seeing_id && (
                                <small className="p-error">
                                    {errors.sight_seeing_id}
                                </small>
                            )}
                        </div>
                        <div className="field col-span-1">
                            <span className="p-float-label">
                                <InputText
                                    id="Admin_Hotel_Name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className={classNames({
                                        "p-invalid": errors.name,
                                    })}
                                />
                                <label htmlFor="Admin_Hotel_Name">Name</label>
                            </span>
                            {errors.name && (
                                <small className="p-error">{errors.name}</small>
                            )}
                        </div>
                        <div className="field col-span-1">
                            <span className="p-float-label">
                                <InputText
                                    id="Admin_Hotel_Address"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    className={classNames({
                                        "p-invalid": errors.address,
                                    })}
                                />
                                <label htmlFor="Admin_Hotel_Address">
                                    Address
                                </label>
                            </span>
                            {errors.address && (
                                <small className="p-error">
                                    {errors.address}
                                </small>
                            )}
                        </div>
                        <div className="field col-span-1">
                            <span className="p-float-label">
                                <InputText
                                    id="Admin_Hotel_Province"
                                    value={data.province}
                                    onChange={(e) =>
                                        setData("province", e.target.value)
                                    }
                                    className={classNames({
                                        "p-invalid": errors.province,
                                    })}
                                />
                                <label htmlFor="Admin_Hotel_Province">
                                    Province
                                </label>
                            </span>
                            {errors.province && (
                                <small className="p-error">
                                    {errors.province}
                                </small>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="field col-span-2">
                            <FileUpload
                                name="photoAddress"
                                customUpload
                                uploadHandler={handleFileUpload}
                                auto
                                chooseLabel="Choose an image"
                                className={classNames({
                                    "p-invalid": errors.photoAddress,
                                })}
                            />
                            {errors.photoAddress && (
                                <small className="p-error">
                                    {errors.photoAddress}
                                </small>
                            )}
                        </div>
                        <div className="col-span-1 flex justify-center items-center">
                            <Button
                                type="submit"
                                label="Save"
                                icon="pi pi-check"
                                className="p-button-success"
                                disabled={processing}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default AddHotel;
