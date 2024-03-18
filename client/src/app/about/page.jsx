'use client';
import { toast } from 'react-toastify';


function About () {
    const testToast = () => {
        toast.success('🦄 Wow so easy!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    
    return (
        <>
            <div style={{
                backgroundColor: "darkgrey",
            }}>
                About
                {/*<AboutSection/>*/}
            </div>
            <div>
                <button onClick={testToast}>
                    click Me
                </button>
            </div>
        </>
    )
}

export default About;