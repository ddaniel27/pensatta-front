import { useState, useEffect } from 'react'
import '../../../styles/badgeDisplayer.css'
export default function BadgeDisplayer({actual=1, total=30}) {

    const [progress, setProgress] = useState(actual)

    useEffect(()=>{
        const value = (actual/total)*100 > 100 ? 100 : (actual/total)*100
        setProgress(value)
    }, [actual, total])

  return(
    <div className="badge-displayer">
      <div className="badge-displayer-header">
        <h3>Insignias</h3>
      </div>
        {
          progress >= 0.0 && progress < 50.0 ?
          <div className='badge-placeholder-text'>
            <span>Completa ejercicios para desbloquear insignias</span>
          </div>:
          <div className='badge-displayer-body'>

            <div className="badge-container" style={ progress >= 50 ? {} : {display:'none'} }>
	            <img src="./images/3.png" alt="badge" />
      	    </div>
            <div className="badge-container" style={ progress >= 75 ? {} : {display:'none'} }>
	            <img src="./images/2.png" alt="badge" />
      	    </div>
            <div className="badge-container" style={ progress >= 100 ? {} : {display:'none'} }>
	            <img src="./images/1.png" alt="badge" />
            </div>

          </div>
        }
    </div>
  )
}
