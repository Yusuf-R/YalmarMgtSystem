import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AdminUtilities from "@/utils/AdminUtilities";
import {useRouter} from "next/navigation";
import VoidStaff from "@/components/LostInSpace/LostInSpace";

function ViewStaff({id, staffData}) {
    const router = useRouter();
    const editStaff = async () => {
        const encryptedUserID = await AdminUtilities.encryptUserID(id);
        // encrypt the data and store it in the session storage
        const encryptedData = await AdminUtilities.encryptData(staffData);
        if (sessionStorage.getItem('staffData')) {
            sessionStorage.removeItem('staffData');
        }
        if (sessionStorage.getItem('staffID')) {
            sessionStorage.removeItem('staffID');
        }
        sessionStorage.setItem('staffData', encryptedData);
        sessionStorage.setItem('staffID', encryptedUserID);
        router.push("/dashboard/admin/staff/edit");
    };
    return (
        <>
            <Box sx={{
                padding: '20px',
                width: 'calc(100% - 250px)',
                position: 'absolute',
                top: '70px',
                left: '250px',
            }}>
                <Typography variant='h4'>Staff Profile</Typography>
                <Typography variant='h6'>ID: {id}</Typography>
                <Typography variant='h6'>First Name: {staffData.firstName}</Typography>
                <Typography variant='h6'>Middle Name: {staffData.middleName ? staffData.middleName : ''}</Typography>
                <Typography variant='h6'>Last Name: {staffData.lastName}</Typography>
                <Typography variant='h6'>Email: {staffData.email}</Typography>
                <Typography variant='h6'>Role: {staffData.role}</Typography>
                <Stack direction='row' gap={2} sx={{marginBottom: '75px'}}>
                    <Link href="/dashboard/admin/staff">
                        <Button variant="contained" color='success' title='Back'> Back </Button>
                    </Link>
                    <Link href="/dashboard/admin/staff/edit">
                        <Button variant="contained" color='error' title='Edit' onClick={editStaff}> Edit </Button>
                    </Link>
                </Stack>
            </Box>
        </>
    )
}

export default ViewStaff;