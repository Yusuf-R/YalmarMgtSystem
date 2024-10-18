'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import style404 from './E404.module.css'

function E404() {
    const GoHome = () => {
        window.location.href = "/home"
    }
    return (
        <>
            <div className={style404.parentBody}>
                <div className={style404.message}>
                    You are not authorized.
                </div>
                <div className={style404.message2}>
                    You tried to access a page you did not have prior authorization for.
                    <div className={style404.goHome}>
                        <button onClick={GoHome}>
                            Go Home
                        </button>
                    </div>
                </div>

                <div className={style404.container}>
                    <div className={style404.neon}>404</div>
                    <div className={style404.doorFrame}>
                        <div className={style404.door}>
                            <div className={style404.rectangle}>
                            </div>
                            <div className={style404.handle}>
                            </div>
                            <div className={style404.window}>
                                <div className={style404.eye}>
                                </div>
                                <div className={`${style404.eye} ${style404.eye2}`}>
                                </div>
                                <div className={style404.leaf}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default E404