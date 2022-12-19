import { useState, useEffect } from 'react'
import '../../../styles/progressBar.css'

export default function ProgressBar({total=30, actual=10}){
    const [progress, setProgress] = useState(0)

    useEffect(()=>{
        const value = (actual/total)*100 > 100 ? 100 : (actual/total)*100
        setProgress(value)
    }, [actual, total])

    return(
        <div className='progress-bar-container'>
            <div className='progress-bar-title'>
                <span>Progreso</span>
            </div>
            <div className='progress-bar-container-progress'>
                <div className="progress-bar">
                    <div className="progress-bar-progress" style={{width: `${progress}%`}}></div>
                </div>
                <span>{progress.toFixed(2)}%</span>
            </div>
        </div>
    )
}