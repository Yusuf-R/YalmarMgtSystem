'use client';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {usePathname, useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";

function Optimization() {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("/dashboard/admin/settings/optimization");

    // Media Queries for responsiveness
    const isXSmall = useMediaQuery("(max-width:599.99px)");

    // useEffect or handling navigation between view and edits
    useEffect(() => {
        if (pathname.includes('leave-request')) {
            setActiveTab('/dashboard/admin/settings/leave-request');
        } else if (pathname.includes('optimization')) {
            setActiveTab("/dashboard/admin/settings/optimization");
        } else if (pathname.includes('biodata')) {
            setActiveTab("/dashboard/admin/settings/biodata");
        } else {
            setActiveTab('/dashboard/admin/settings');
        }
    }, [pathname]);


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
        <>
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
                <br/>
                <Typography sx={{
                    color: '#FFF',
                    fontSize: 26,
                    fontWeight: 'bold',
                    letterSpacing: 0.05,
                }}>
                    Under Construction
                </Typography>
            </Box>
        </>
    )
}

export default Optimization;