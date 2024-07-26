import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import "../Content.css";
import { CheckBox } from "@mui/icons-material";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    const handleCheckboxChange = (e) => {
        setData({ ...data, remember: e.checked });
    };

    const handleEmailChange = (e) => {
        const cleanedEmail = e.target.value.trim().toLowerCase();
        setData("email", cleanedEmail);
    };

    return (
        <div className="login-page-div w-screen h-screen justify-center text-center z-0">
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <div className="login-form flex align-items-center justify-content-center flex-column text-center z-50 p-5">
                <div className="surface-card p-23 p-6 sm:p-4 shadow-2 border-round justify-center text-center ">
                    <div className="text-center mb-5">
                        <div className="text-900 text-3xl font-medium mb-3">
                            Welcome Back
                        </div>
                        <span className="text-600 font-medium line-height-3">
                            Don't have an account?
                        </span>
                        <Link
                            href={route("register")}
                            className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                        >
                            Create today!
                        </Link>
                    </div>
                    <form onSubmit={submit}>
                        <div>
                            <div className="mb-3">
                                <label
                                    htmlFor="email"
                                    className="block text-900 font-medium mb-2"
                                >
                                    Email
                                </label>
                                <InputText
                                    id="email"
                                    type="text"
                                    placeholder="Email address"
                                    className="w-full text-primary"
                                    value={data.email}
                                    onChange={handleEmailChange}
                                />
                                <InputError
                                    message={errors.email}
                                    className=""
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="password"
                                    className="block text-900 font-medium mb-2"
                                >
                                    Password
                                </label>
                                <InputText
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    className="w-full text-primary"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className=""
                                />
                            </div>

                            <div className="flex align-items-center justify-content-between mb-6">
                                <div className="flex align-items-center">
                                    <CheckBox
                                        inputId="rememberme-login"
                                        onChange={handleCheckboxChange}
                                        checked={data.remember}
                                        className="mr-2"
                                    />
                                    <label htmlFor="rememberme-login">
                                        Remember me
                                    </label>
                                </div>
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                            </div>

                            <PrimaryButton
                                label="Sign In"
                                className="w-full"
                                disabled={processing}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
