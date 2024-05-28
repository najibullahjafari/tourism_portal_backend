import { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Layout from "@/Layouts/layout/layout.jsx";
import InputError from "@/Components/InputError";

export default function Transportation() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        father_name: "",
        tazkira_no: "",
        passport: "",
        phone: "",
        description: "",
        image: "",
        location: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("transportation.requests"));
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setData("passport", file);
    };

    return (
        <Layout>
            <Head title="Transportation" />
            <div className="flex items-center justify-center flex-col">
                <div className="bg-white p-6 sm:p-4 shadow-md rounded-lg w-full max-w-3xl">
                    <div className="text-center mb-5">
                        <div className="text-3xl font-medium mb-3">
                            Register a car services
                        </div>
                    </div>
                    <form onSubmit={submit}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                    htmlFor="father_name"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Father Name
                                </label>
                                <InputText
                                    id="father_name"
                                    type="text"
                                    placeholder="Father Name"
                                    className="w-full"
                                    value={data.father_name}
                                    onChange={(e) =>
                                        setData("father_name", e.target.value)
                                    }
                                />
                                <InputError message={errors.father_name} />
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
                            <div className="mb-3">
                                <label
                                    htmlFor="tazkira_no"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Tazkira Number
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
                                    htmlFor="passport"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Passport Image
                                </label>
                                <InputText
                                    type="file"
                                    id="passport"
                                    className="w-full"
                                    name="passport"
                                    onChange={handleFileUpload}
                                />
                                <InputError message={errors.passport} />
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
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Email
                                </label>
                                <InputText
                                    id="email"
                                    type="text"
                                    placeholder="Email"
                                    className="w-full"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="password"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Password
                                </label>
                                <InputText
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    className="w-full"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError message={errors.password} />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="password_confirmation"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Confirm Password
                                </label>
                                <InputText
                                    id="password_confirmation"
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="w-full"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>
                            <div className="col-span-3 text-right">
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
