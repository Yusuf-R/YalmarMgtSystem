import style404 from './E404.module.css'

function E404() {
    return (
        <>
            <div className={style404.parentBody}>
                <div className="style404.message">
                    You are not authorized.
                </div>
                <div className="style404.message2">
                    You tried to access a page you did not have prior authorization for.
                </div>
                <div className="style404.container">
                    <div className="style404.neon">403</div>
                    <div className="style404.door-frame">
                        <div className="style404.door">
                            <div className="style404.rectangle">
                            </div>
                            <div className="style404.handle">
                            </div>
                            <div className="style404.window">
                                <div className="style404.eye">
                                </div>
                                <div className="style404.eye eye2">
                                </div>
                                <div className="style404.leaf">
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