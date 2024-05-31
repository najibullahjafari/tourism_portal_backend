import React, { useContext } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import { Link } from "@inertiajs/react";

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model = [
        {
            label: "Home",
            items: [
                {
                    label: "Dashboard",
                    icon: "pi pi-fw pi-home",
                    to: route("dashboard"),
                },
                {
                    label: "Button",
                    icon: "pi pi-fw pi-id-card",
                    to: route("button"),
                },
                {
                    label: "Hotel",
                    icon: "pi pi-fw pi-id-card",
                    items: [
                        {
                            label: "Hotel List",
                            icon: "pi pi-fw pi-home",
                            to: route("hotelList"),
                        },
                        {
                            label: "Hotel Request",
                            icon: "pi pi-fw pi-home",
                            to: route("hotelRequest"),
                        },
                        {
                            label: "Add Hotel",
                            icon: "pi pi-fw pi-home",
                            to: route("addHotel"),
                        },
                        {
                            label: "Categoy Foot",
                            icon: "pi pi-fw pi-home",
                            to: route("addFootCategory"),
                        },
                    ],
                },
                {
                    label: "Transportation",
                    icon: "pi pi-fw pi-id-card",
                    items: [
                        {
                            label: "Cars",
                            icon: "pi pi-fw pi-car",
                            to: route("cars"),
                        },
                        {
                            label: "Request",
                            icon: "pi pi-fw pi-request",
                            to: route("cars/requests"),
                        },
                    ],
                },
                {
                    label: "Tour Guide",
                    icon: "pi pi-fw pi-id-card",
                    items: [
                        {
                            label: "Tour Guide",
                            icon: "pi pi-fw pi-user",
                            to: route("tourGuide"),
                        },
                        {
                            label: "Request",
                            icon: "pi pi-fw pi-user",
                            to: route("tourGuideRequest"),
                        },
                        {
                            label: "Add TourGuide",
                            icon: "pi pi-fw pi-user-plus",
                            to: route("addTourGuide"),
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? (
                        <AppMenuitem
                            item={item}
                            root={true}
                            index={i}
                            key={item.label}
                        />
                    ) : (
                        <li className="menu-separator"></li>
                    );
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
