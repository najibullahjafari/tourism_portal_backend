import { PrimeReactContext } from "primereact/api";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { RadioButton } from "primereact/radiobutton";
import { Sidebar } from "primereact/sidebar";
import { classNames } from "primereact/utils";
import React, { useContext, useEffect, useState } from "react";

import AppConfigButton from "@/Components/AppConfigButton.jsx";
import { LayoutContext } from "@/Layouts/layout/context/layoutcontext";

const Config = (props) => {
    const [scales] = useState([12, 13, 14, 15, 16]);
    const { layoutConfig, setLayoutConfig, layoutState, setLayoutState } =
        useContext(LayoutContext);
    const { setRipple, changeTheme } = useContext(PrimeReactContext);

    const onConfigButtonClick = () => {
        setLayoutState((prevState) => ({
            ...prevState,
            configSidebarVisible: true,
        }));
    };

    const onConfigSidebarHide = () => {
        setLayoutState((prevState) => ({
            ...prevState,
            configSidebarVisible: false,
        }));
    };

    const changeInputStyle = (e) => {
        setLayoutConfig((prevState) => ({ ...prevState, inputStyle: e.value }));
    };

    const changeRipple = (e) => {
        setRipple(e.value);
        setLayoutConfig((prevState) => ({ ...prevState, ripple: e.value }));
    };

    const changeMenuMode = (e) => {
        setLayoutConfig((prevState) => ({ ...prevState, menuMode: e.value }));
    };

    const _changeTheme = (theme, colorScheme) => {
        changeTheme?.(layoutConfig.theme, theme, "theme-css", () => {
            setLayoutConfig((prevState) => ({
                ...prevState,
                theme,
                colorScheme,
            }));
        });
    };

    const decrementScale = () => {
        setLayoutConfig((prevState) => ({
            ...prevState,
            scale: prevState.scale - 1,
        }));
    };

    const incrementScale = () => {
        setLayoutConfig((prevState) => ({
            ...prevState,
            scale: prevState.scale + 1,
        }));
    };

    const applyScale = () => {
        document.documentElement.style.fontSize = layoutConfig.scale + "px";
    };

    useEffect(() => {
        applyScale();
    }, [layoutConfig.scale]);

    return (
        <>
            <button
                className="config-button bg-primary config-link p-2 rounded"
                type="button"
                onClick={onConfigButtonClick}
            >
                <i className="pi pi-palette"></i>
            </button>

            <Sidebar
                visible={layoutState.configSidebarVisible}
                onHide={onConfigSidebarHide}
                position="right"
                className="layout-config-sidebar w-20rem"
            >
                <h5>Tailwind</h5>
                <div className="grid">
                    <AppConfigButton
                        img="/images/layout/themes/tailwind-light.png"
                        imgAlt="Tailwind Light"
                        onClick={() => _changeTheme("tailwind-light", "light")}
                    />
                </div>

                <h5>PrimeOne Design - 2021</h5>
                <div className="grid">
                    <AppConfigButton
                        img="/images/layout/themes/saga-blue.png"
                        imgAlt="Saga Blue"
                        onClick={() => _changeTheme("saga-blue", "light")}
                    />
                    <AppConfigButton
                        img="/images/layout/themes/saga-green.png"
                        imgAlt="Saga Green"
                        onClick={() => _changeTheme("saga-green", "light")}
                    />
                    <AppConfigButton
                        img="/images/layout/themes/saga-orange.png"
                        imgAlt="Saga Orange"
                        onClick={() => _changeTheme("saga-orange", "dark")}
                    />
                    <AppConfigButton
                        img="/images/layout/themes/saga-purple.png"
                        imgAlt="Saga Purple"
                        onClick={() => _changeTheme("saga-purple", "light")}
                    />
                    <AppConfigButton
                        img="/images/layout/themes/vela-blue.png"
                        imgAlt="Vela Blue"
                        onClick={() => _changeTheme("vela-blue", "dark")}
                    />
                    <AppConfigButton
                        img="/images/layout/themes/vela-green.png"
                        imgAlt="Vela Green"
                        onClick={() => _changeTheme("vela-green", "dark")}
                    />
                    <AppConfigButton
                        img="/images/layout/themes/vela-orange.png"
                        imgAlt="Vela Orange"
                        onClick={() => _changeTheme("vela-orange", "dark")}
                    />
                    <AppConfigButton
                        img="/images/layout/themes/vela-purple.png"
                        imgAlt="Vela Purple"
                        onClick={() => _changeTheme("vela-purple", "dark")}
                    />
                    <AppConfigButton
                        img="/images/layout/themes/arya-blue.png"
                        imgAlt="Arya Blue"
                        onClick={() => _changeTheme("arya-blue", "dark")}
                    />
                    <AppConfigButton
                        img="/images/layout/themes/arya-green.png"
                        imgAlt="Arya Green"
                        onClick={() => _changeTheme("arya-green", "dark")}
                    />
                    <AppConfigButton
                        img="/images/layout/themes/arya-orange.png"
                        imgAlt="Arya Orange"
                        onClick={() => _changeTheme("arya-orange", "dark")}
                    />
                    <AppConfigButton
                        img="/images/layout/themes/arya-purple.png"
                        imgAlt="Arya Purple"
                        onClick={() => _changeTheme("arya-purple", "dark")}
                    />
                </div>
            </Sidebar>
        </>
    );
};

export default Config;
