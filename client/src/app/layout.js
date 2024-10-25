import ReactQueryProvider from "@/components/ReactQuery/ReactQueryProvider";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "@/styles/fonts.css"; // Import the local fonts
import "./globals.css";
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import theme from "@/utils/theme";
import {ThemeProvider} from "@mui/material/styles";

export const metadata = {
    title: "Yalmar Management System",
    description: "The smart system for managing staff and client operations.",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body style={{fontFamily: 'Poppins, sans-serif'}}>
        <ReactQueryProvider>
            <AppRouterCacheProvider>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </AppRouterCacheProvider>
        </ReactQueryProvider>
        <ToastContainer
            position="top-center"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="dark"
            style={{
                color: "#fff",
                width: 600
            }}
        />
        </body>
        </html>
    );
}