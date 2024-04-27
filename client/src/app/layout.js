import ReactQueryProvider from "@/components/ReactQuery/ReactQueryProvider";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {Inter} from "next/font/google";
import {Roboto} from 'next/font/google'
import "./globals.css";
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import theme from "@/utils/theme";
import {ThemeProvider} from "@mui/material/styles";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ['100', '300', '400', '500', '700', '900'],
    display: 'swap',
});

export const metadata = {
    title: "Yalmar Management System",
    description: "The smart system for managing staff and client operations.",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={roboto.className}>
        <ReactQueryProvider>
            <AppRouterCacheProvider>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </AppRouterCacheProvider>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
            />
        </ReactQueryProvider>
        </body>
        </html>
    );
}
