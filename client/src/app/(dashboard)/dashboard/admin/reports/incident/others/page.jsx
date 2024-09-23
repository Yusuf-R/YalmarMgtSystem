import {Suspense, lazy} from "react";
import LazyLoading from "@/components/LazyLoading/LazyLoading";

const AllOtherIncident =
    lazy(() =>
        import("@/components/ReportComponents/IncidentComponents/All/AllOthersIncident/AllOtherIncident")
    );

function IncidentOthers() {
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <AllOtherIncident/>
            </Suspense>
        </>
    )
    
}

export default IncidentOthers;