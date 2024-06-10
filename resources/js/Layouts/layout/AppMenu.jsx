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
                // If our user is Hotel Admin Use this link instead of Dashboard
                // {
                //     label: "Hotel Admin",
                //     icon: "pi pi-fw pi-home",
                //     to: route("hotel.dashboard"),
                // },
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
                            label: "Add Categoy Foot",
                            icon: "pi pi-fw pi-home",
                            to: route("addFootCategory"),
                        },
                        {
                            label: "Categoy Foot",
                            icon: "pi pi-fw pi-home",
                            to: route("footCategories"),
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
                            label: "Requests",
                            icon: "pi pi-fw pi-id-card",
                            to: route("cars.requested.cars"),
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
                            label: "Add Tour Guide",
                            icon: "pi pi-fw pi-car",
                            to: route("addTourGuide"),
                        },
                    ],
                },
                {
                    label: "Settings",
                    icon: "pi pi-fw pi-cog",
                    to: route("dashboard"),
                },
            ],
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) =>
                    !item?.separator ? (
                        <AppMenuitem
                            item={item}
                            root={true}
                            index={i}
                            key={item.label}
                        />
                    ) : (
                        <li
                            className="menu-separator"
                            key={`separator-${i}`}
                        ></li>
                    )
                )}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
