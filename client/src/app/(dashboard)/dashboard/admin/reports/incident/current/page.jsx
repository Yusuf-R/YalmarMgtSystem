import {lazy, Suspense} from "react";
import LazyLoading from "@/components/LazyLoading/LazyLoading";

const ReportLandingPage = lazy(() => import ("@/components/ReportComponents/ReportLandingPage/ReportLandingPage"))
