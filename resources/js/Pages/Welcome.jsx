import { Link, Head } from "@inertiajs/react";
import {
    LayoutContext,
    LayoutProvider,
} from "@/Layouts/layout/context/layoutcontext.jsx";
import styled from "styled-components";
import { PrimeReactProvider } from "primereact/api";
import { Button } from "primereact/button";
import React, { useContext } from "react";
const ImgStyled = styled.img`
    clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%);
    transform: scale(1.1);
    transition: ease-in;
    transition-duration: 0.5s;
`;

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const { layoutConfig } = useContext(LayoutContext);
    return (
        <>
            <PrimeReactProvider>
                <LayoutProvider>
                    <Head title="Welcome" />
                    <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                        <div className="sm:fixed sm:top-0 sm:left-0 p-6">
                            <div className="flex align-items-center">
                                <img
                                    src={`/images/logo/logo.png`}
                                    width="100.22px"
                                    height={"35px"}
                                    alt="logo"
                                    className="mr-3"
                                />

                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                        >
                                            Log in
                                        </Link>

                                        <Link
                                            href={route("register")}
                                            className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-nogutter surface-0 text-800">
                            <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                                <section>
                                    <span className="block text-6xl font-bold mb-1">
                                        Join Now!
                                    </span>
                                    <div className="text-6xl text-primary font-bold mb-3">
                                        To Explore Afghanistan!
                                    </div>
                                    <p className="mt-0 mb-4 text-700 line-height-3">
                                        The system provide you with the best way
                                        to explore Afghanistan. You can find the
                                        best places to visit, the best hotels to
                                        stay, the best restaurants to eat and
                                        the best transportation to travel.
                                    </p>
                                    {/* <Button
                                        label="Live Demo"
                                        type="button"
                                        className="p-button-outlined mr-2"
                                    />
                                    <Button
                                        label="Live Demo"
                                        type="button"
                                        className="p-button-outlined"
                                    /> */}
                                </section>
                            </div>
                            <div className="col-12 md:col-6 overflow-hidden">
                                <ImgStyled
                                    src="/images/hero/b8.jpg"
                                    alt="hero-1"
                                    className="md:ml-auto block md:h-full"
                                    style={{
                                        clipPath:
                                            "polygon(8% 0, 100% 0%, 100% 100%, 0 100%)",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </LayoutProvider>
            </PrimeReactProvider>
        </>
    );
}
