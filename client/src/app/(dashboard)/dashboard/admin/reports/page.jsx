import LazyLoading from "@/components/LazyLoading/LazyLoading";
import {Suspense, lazy} from "react";

const ReportLandingPage = lazy(() => import ("@/components/ReportComponents/ReportLandingPage/ReportLandingPage"))

function ReportManagement() {
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <ReportLandingPage/>
            </Suspense>
        </>
    )
}

export default ReportManagement;