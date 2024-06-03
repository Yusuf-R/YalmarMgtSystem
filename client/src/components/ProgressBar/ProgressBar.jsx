import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
// import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

//
// function LinearProgressWithLabel(props) {
//     return (
//         <Box sx={{display: 'flex', alignItems: 'center'}}>
//             <Box sx={{width: '100%', mr: 1}}>
//                 <LinearProgress variant="determinate" {...props} />
//             </Box>
//             <Box sx={{minWidth: 35}}>
//                 <Typography variant="body2" color="text.secondary">{`${Math.round(
//                     props.value,
//                 )}%`}</Typography>
//             </Box>
//         </Box>
//     );
// }
//
// LinearProgressWithLabel.propTypes = {
//     /**
//      * The value of the progress indicator for the determinate and buffer variants.
//      * Value between 0 and 100.
//      */
//     value: PropTypes.number.isRequired,
// };
//
// export default function ProgressBar() {
//     const [progress, setProgress] = React.useState(10);
//
//     React.useEffect(() => {
//         const timer = setInterval(() => {
//             setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
//         }, 800);
//         return () => {
//             clearInterval(timer);
//         };
//     }, []);
//
//     return (
//         <Box sx={{width: '100%'}}>
//             <LinearProgressWithLabel value={progress}/>
//         </Box>
//     );
// }
//


function CircularProgressWithLabel(props) {
    return (
        <Box sx={{position: 'relative', display: 'inline-flex'}}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="#FFF">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
};

export default function ProgressBar() {
    const [progress, setProgress] = React.useState(10);
    
    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 5));
        }, 900);
        return () => {
            clearInterval(timer);
        };
    }, []);
    
    return <CircularProgressWithLabel value={progress}/>;
}
