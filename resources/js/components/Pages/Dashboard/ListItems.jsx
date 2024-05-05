import * as React from "react";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import Dashboard from "./Dashboard";
import Hotel from "../Hotel/Hotel";
import TourGuide from "../TourGuide/TourGuide";
import Transportation from "../Transportation/Transportation";
import Tourists from "../Tourist/Tourists";
export const mainListItems = (
    <React.Fragment>
        <Link to="/dashboard">
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
        </Link>
        <Link to="/tourists">
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Tourists" />
            </ListItemButton>
        </Link>
        <Link to="/tour-guides">
            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Tour Guides" />
            </ListItemButton>
        </Link>
        <Link to="/transportations">
            <ListItemButton>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Transportations" />
            </ListItemButton>
        </Link>
    </React.Fragment>
);
