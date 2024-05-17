'use client';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/navigation";
import {useQuery} from '@tanstack/react-query';
import CircularProgress from "@mui/material/CircularProgress";
import {useState} from "react";
import UserUtils from "@/utils/UserUtilities";

function New() {
    const router = useRouter();
    const {data, isLoading, isError} = useQuery({
        queryKey: ['privateCheck'],
        queryFn: UserUtils.privateCheck,
    });
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
            <Typography>Settings</Typography>
            <Stack direction='row' spacing={2}>
                <Button
                    onClick={() => router.push('/dashboard/admin')}
                    variant="contained"
                    color='success'
                >
                    Back
                </Button>
                
                <Button
                    onClick={testConn}
                    variant="contained"
                    color='error'
                >
                    Test-Connection
                </Button>
            </Stack>
            {/* display the data of the tested connection */}
            <Stack direction='column' spacing={2}>
                <Typography variant='h4'>{message ? message : ''}</Typography>
                <Typography variant='h4'>Redis Status: {redisStatus ? 'True' : 'False'}</Typography>
                <Typography variant='h4'>Db Status: {dbStatus ? 'True' : 'False'}</Typography>
            </Stack>
        </Box>
    )
}


export default New;