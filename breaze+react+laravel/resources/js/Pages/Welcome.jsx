import { Link, Head } from "@inertiajs/react";
import React, { useState } from "react";

import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
// import Link from "@mui/joy/Link";
import Favorite from "@mui/icons-material/Favorite";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Switch from "@mui/joy/Switch";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [layout, setLayout] = React.useState(undefined);
    const [scroll, setScroll] = React.useState(true);

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleComment = (comment) => {
        setComments([...comments, comment]);
        comment = "";
    };

    const deleteComment = (index) => {
        const newComments = [...comments];
        newComments.splice(index, 1);
        setComments(newComments);
    };
    return (
        <>
            <Head title="Welcome" />

            <div className="relative bg-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className=" md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {auth.user ? (
                                        <Link
                                            href={route("dashboard")}
                                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route("login")}
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                Log in
                                            </Link>

                                            <Link
                                                href={route("register")}
                                                className="ml-4 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Card
                variant="outlined"
                className="post bg-white shadow-md rounded-23 p-6 m-4"
            >
                <CardOverflow>
                    <AspectRatio ratio="2">
                        <img
                            src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                            srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                            loading="lazy"
                            alt=""
                        />
                    </AspectRatio>
                    <IconButton
                        aria-label="Like minimal photography"
                        size="md"
                        variant="solid"
                        color="danger"
                        onClick={handleLike}
                        sx={{
                            position: "absolute",
                            zIndex: 2,
                            borderRadius: "50%",
                            right: "1rem",
                            bottom: 0,
                            transform: "translateY(50%)",
                        }}
                    >
                        <Favorite />
                    </IconButton>
                </CardOverflow>
                <CardContent>
                    <Typography level="title-md">
                        <Link href="#multiple-actions" overlay underline="none">
                            Yosemite National Park
                        </Link>
                    </Typography>
                    <Typography level="body-sm">
                        <Link
                            href="#multiple-actions"
                            onClick={() => {
                                setLayout("fullscreen");
                            }}
                        >
                            California
                        </Link>
                    </Typography>
                </CardContent>
                <CardOverflow variant="soft">
                    <Divider inset="context" />
                    <CardContent orientation="horizontal">
                        <Typography level="body-xs">6.3k views</Typography>
                        <Divider orientation="vertical" />
                        <Typography level="body-xs">1 hour ago</Typography>
                        <Divider orientation="vertical" />
                        <Typography level="body-xs">
                            {likes + " "}likes
                        </Typography>
                        <Divider orientation="vertical" />
                        <Typography level="body-xs">
                            {comments}comment
                        </Typography>
                        <Divider orientation="vertical" />
                        {/* the full screen  */}
                        <Typography
                            level="body-xs"
                            color="e5e7eb"
                            style={{ mouse: "pointer" }}
                            onClick={() => {
                                setLayout("fullscreen");
                            }}
                        >
                            Full screen
                        </Typography>
                    </CardContent>
                </CardOverflow>
                <div className="container">
                    <React.Fragment>
                        <Modal
                            open={!!layout}
                            onClose={() => {
                                setLayout(undefined);
                            }}
                        >
                            <ModalDialog layout={layout}>
                                <ModalClose />
                                <DialogTitle>
                                    Vertical scroll example
                                </DialogTitle>
                                <FormControl
                                    orientation="horizontal"
                                    sx={{
                                        bgcolor: "background.level2",
                                        p: 1,
                                        borderRadius: "sm",
                                    }}
                                >
                                    <FormLabel>Container overflow</FormLabel>
                                    <Switch
                                        checked={scroll}
                                        onChange={(event) =>
                                            setScroll(event.target.checked)
                                        }
                                        sx={{ ml: "auto" }}
                                    />
                                </FormControl>
                                <List
                                    sx={{
                                        overflow: scroll ? "scroll" : "initial",
                                        mx: "calc(-1 * var(--ModalDialog-padding))",
                                        px: "var(--ModalDialog-padding)",
                                    }}
                                >
                                    {[...Array(100)].map((item, index) => (
                                        <ListItem key={index}>
                                            I&apos;m in a scrollable area.
                                        </ListItem>
                                    ))}
                                </List>
                            </ModalDialog>
                        </Modal>
                    </React.Fragment>
                </div>
            </Card>
        </>
    );
}
