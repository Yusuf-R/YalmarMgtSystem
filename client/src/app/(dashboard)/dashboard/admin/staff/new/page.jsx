'use client';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/navigation";
import {useQuery} from '@tanstack/react-query';
import {privateCheck} from "@/utils/authLogin";
import CircularProgress from "@mui/material/CircularProgress";
import {useState} from "react";

function New() {
    const router = useRouter();
    const {data, isLoading, isError} = useQuery({
        queryKey: ['privateCheck'],
        queryFn: privateCheck,
    });
    const [decryptedAccessToken
        , setDecryptedAccessToken] = useState('');
    const [verifiedAccessToken, setVerifiedAccessToken] = useState({});
    const [message, setMessage] = useState('');
    const [redisStatus, setRedisStatus] = useState(false);
    const [dbStatus, setDbStatus] = useState(false);
    
    
    const testConn = async () => {
        if (isLoading) {
            return <CircularProgress/>;
        }
        if (isError || !data) {
            // Ideally, handle this more gracefully
            console.error('Error fetching user data');
            return <div>Error loading user data</div>;
        }
        setDbStatus(data.dbStatus);
        setRedisStatus(data.redisStatus);
        setMessage(data.message);
        setDecryptedAccessToken(data.decryptedAccessToken);
        setVerifiedAccessToken(data.verifiedAccessToken);
        console.log(data);
    };
    return (
        <Box sx={{
            padding: '20px',
            width: 'calc(100% - 250px)',
            position: 'absolute',
            top: '70px',
            left: '250px',
        }}>
            <Typography>Add New Staff</Typography>
            <Stack direction='row' spacing={2}>
                <Button
                    onClick={() => router.push('/dashboard/admin/staff')}
                    variant="contained"
                    color='success'
                >
                    Back
                </Button>
                <Button
                    onClick={() => router.push('/dashboard/admin/staff')}
                    variant="contained"
                    color='error'
                >
                    Save
                </Button>
                <Button
                    onClick={testConn}
                    variant="contained"
                    color='success'
                >
                    Test-Connection
                </Button>
            </Stack>
            {/* display the data of the tested connection */}
            <Stack direction='column' spacing={2}>
                <Typography variant='h4'>{message ? message : ''}</Typography>
                <Typography variant='h4'>{redisStatus ? redisStatus : null}</Typography>
                <Typography variant='h4'>{dbStatus ? dbStatus : null}</Typography>
                <Typography variant='h6'>{decryptedAccessToken ? decryptedAccessToken : ''}</Typography>
                {/*verifiedAccessToken is an object, ,map over it and display it content */}
                {verifiedAccessToken && Object.keys(verifiedAccessToken).map((key, index) => {
                    return <Typography variant='h4' key={index}>{key}: {verifiedAccessToken[key]}</Typography>;
                })}
            </Stack>
        </Box>
    )
}


export default New;