import {lazy, Suspense} from "react";
import LazyLoading from "@/components/LazyLoading/LazyLoading";

const AllServiceIncident =
    lazy(() =>
        import("@/components/ReportComponents/IncidentComponents/All/AllServiceIncident/AllServiceIncident")
    );

function IncidentService() {
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <AllServiceIncident/>
            </Suspense>
        </>
    )
    
}

export default IncidentService;