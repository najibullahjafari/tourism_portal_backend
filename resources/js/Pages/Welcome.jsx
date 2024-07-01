import { Link, Head } from "@inertiajs/react";
import {
    LayoutContext,
    LayoutProvider,
} from "@/Layouts/layout/context/layoutcontext.jsx";
import styled from "styled-components";
import { PrimeReactProvider } from "primereact/api";
import { Button } from "primereact/button";
import React, { useContext } from "react";
import SightSeeing from "./SightSeeing";

const ImgStyled = styled.img`
    clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%);
    transform: scale(1.1);
    transition: ease-in;
    transition-duration: 0.5s;
`;

export default function Welcome({ auth }) {
    const { layoutConfig } = useContext(LayoutContext);
    return (
        <>
            <PrimeReactProvider>
                <LayoutProvider>
                    <Head title="Welcome" />
                    <SightSeeing />
                    <Navbar />
                </LayoutProvider>
            </PrimeReactProvider>
        </>
    );
}
