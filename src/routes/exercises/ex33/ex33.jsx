import { useState, useEffect } from "react"
import PixelPaint from "../components/pixelPaint"
import ScoringComponent from "../components/scoringComponent"
import useData from "../../../hooks/useData"
import "../../../styles/ex33.css"

export default function ExTest(){
  const { data } = useData("ex33")
    const [ myData, setMyData ] = useState({
        ...data,
        drawMatrix: data.drawMatrix.sort(() => 0.5 - Math.random()).slice(0, 1)[0]

    })
  useEffect(() => {
    setMyData({
      ...data,
        drawMatrix: data.drawMatrix.sort(() => 0.5 - Math.random()).slice(0, 1)[0]
    })
  }, [data])
    const [ currMatrix, setCurrMatrix ] = useState([])

    const handleClick = (cb1, cb2) => {
        const value = currMatrix.every((row,i)=> row.every((item,j) => item === myData.drawMatrix[j][i])) ? 1 : 0
        cb1(value)
        cb2("end")
    }

    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id}>
        {(setScore,setPhase)=>(
            <div className="ex33">
                <table cellSpacing="0">
                    <tbody>
                        {
                            myData.drawMatrix.map((row, i) => {
                                return(
                                    <tr key={i}>
                                        {
                                            row.map((cell, j) => {
                                                return(
                                                    <td key={j}>
                                                        <span>{cell}</span>
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <PixelPaint 
                loadMatrix={[
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0]
                ]}
                size={350}
                setCurrMatrix={setCurrMatrix}
                />

                <button onClick={()=>{handleClick(setScore, setPhase)}}>{data["finish-button"]}</button>

            </div>
        )}
        </ScoringComponent>
    )

}
