import {Suspense, lazy} from "react";
import LazyLoading from "@/components/LazyLoading/LazyLoading";

const AllStaffIncident = lazy(() => import("@/components/ReportComponents/IncidentComponents/All/AllStaffIncident/AllStaffIncident"));

function IncidentAllStaff() {
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <AllStaffIncident/>
            </Suspense>
        </>
    )
}

export default IncidentAllStaff;