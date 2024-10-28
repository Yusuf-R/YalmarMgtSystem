'use client';
import React, {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

function SettingsLandingPage() {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("/dashboard/admin/settings");

    // Media Queries for responsiveness
    const isXSmall = useMediaQuery("(max-width:599.99px)");

    useEffect(() => {
        const matchedTab = headerItems.find((item) => pathname.includes(item.route.split('/').pop()));
        setActiveTab(matchedTab ? matchedTab.route : "/dashboard/admin/settings");
    }, [pathname]);

    // Shared data for Tabs
    const headerItems = [
        {title: "Settings", src: "/Settings.svg", route: "/dashboard/admin/settings", label: "Settings"},
        {title: "BioData", src: "/BioData.svg", route: "/dashboard/admin/settings/biodata", label: "BioData"},
        {
            title: "Leave-Request",
            src: "/Leave-req-1.svg",
            route: "/dashboard/admin/settings/leave-request",
            label: "Leave-Request"
        },
        {
            title: "Optimization",
            src: "/Settings.svg",
            route: "/dashboard/admin/settings/optimization",
            label: "Optimization"
        },
    ];

    return (
        <Box sx={{padding: {xs: "10px", sm: "15px", md: "20px"}, marginTop: "10px"}}>
            {/* Tabs for Settings Sections */}
            <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                variant={isXSmall ? "scrollable" : "standard"}
                scrollButtons="auto"
                sx={{
                    "& .MuiTabs-indicator": {backgroundColor: "#46F0F9"},
                    marginBottom: 3,
                }}
            >
                {headerItems.map((item) => (
                    <Tab
                        key={item.label}
                        label={item.label}
                        component={Link}
                        href={item.route}
                        value={item.route}
                        sx={{
                            color: "#FFF",
                            fontWeight: "bold",
                            fontSize: {xs: "0.7rem", sm: "0.8rem", md: "0.9rem"},
                            "&.Mui-selected": {color: "#46F0F9"},
                        }}
                    />
                ))}
            </Tabs>

            {/* Grid for Header Items (excluding Settings) */}
            <Grid container spacing={3} justifyContent="flex-start">
                {headerItems
                    .filter((item) => item.title !== "Settings")
                    .map((item) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={item.label}>
                            <Box
                                onClick={() => router.push(item.route)}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    "&:hover": {
                                        "& .MuiTypography-root": {
                                            backgroundColor: "green",
                                            color: "#FFF",
                                        },
                                    },
                                }}
                            >
                                <Avatar
                                    alt={item.title}
                                    src={item.src}
                                    sx={{
                                        width: {xs: "120px", sm: "150px", md: "180px", lg: "200px"},
                                        height: {xs: "120px", sm: "150px", md: "180px", lg: "200px"},
                                        marginBottom: {xs: "10px", sm: "15px", md: "20px"},
                                    }}
                                />
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "#FFF",
                                        fontSize: {xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem"},
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                        transition: "background-color 0.3s, color 0.3s",
                                    }}
                                >
                                    {item.title}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
}

export default SettingsLandingPage;
