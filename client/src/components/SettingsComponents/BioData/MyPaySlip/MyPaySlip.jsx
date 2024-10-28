'use client';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";

function MyPaySlip() {
    const pathname = usePathname();
    const router = useRouter();
    // Break Points
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const xxLarge = useMediaQuery('(min-width:1200px) and (max-width:1439.999px)');
    const wide = useMediaQuery('(min-width:1440px) and (max-width:1679.999px)');
    const xWide = useMediaQuery('(min-width:1680px) and (max-width:1919.999px)');
    const ultraWide = useMediaQuery('(min-width:1920px)');


    const [activeTab, setActiveTab] = useState('/dashboard/admin/settings/biodata/payslip');

    // useEffect or handling navigation between view and edits
    useEffect(() => {
        if (pathname.includes('edit')) {
            setActiveTab('/dashboard/admin/settings/biodata/edit');
        } else if (pathname.includes('payslip')) {
            setActiveTab('/dashboard/admin/settings/biodata/payslip');
        } else if (pathname.includes('picture')) {
            setActiveTab('/dashboard/admin/settings/biodata/picture');
        } else if (pathname.includes('biodata')) {
            setActiveTab('/dashboard/admin/settings/biodata');
        } else {
            setActiveTab('/dashboard/admin/settings');
        }
    }, [pathname]);
    return (
        <>
            <Box
                component='form'
                // onSubmit={handleSubmit(UpdateProfile)}
                noValidate
                sx={{
                    padding: xSmall || small ? '5px' : medium || large ? '10px' : '5px',
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '100%', // This ensures nothing overflows
                    overflow: 'hidden', // Handles overflowing content
                }}
            >
                {/*Nav Section*/}
                <Stack direction='row' spacing={2} sx={{
                    justifyContent: 'flex-start',
                }}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        centered
                        sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#46F0F9',
                            },
                        }}
                    >
                        <Tab
                            label="Settings"
                            component={Link}
                            href="/dashboard/admin/settings"
                            value="/dashboard/admin/settings"

                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="Biodata"
                            component={Link}
                            href="/dashboard/admin/settings/biodata"
                            value="/dashboard/admin/settings/biodata"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="Edit"
                            value="/dashboard/admin/settings/biodata/edit"
                            href="/dashboard/admin/settings/biodata/edit"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="Avatar"
                            value="/dashboard/admin/settings/biodata/picture"
                            href="/dashboard/admin/settings/biodata/picture"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="PaySlip"
                            component={Link}
                            href="/dashboard/admin/settings/biodata/payslip"
                            value="/dashboard/admin/settings/biodata/payslip"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                    </Tabs>
                </Stack>
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

export default MyPaySlip;