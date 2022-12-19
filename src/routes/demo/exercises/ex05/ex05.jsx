import React from "react"
import ScoringComponent from "../components/scoringComponent"
import data from "./data.json"
import "../../../../styles/ex05.css"

export default function Ex05(){

    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
        message: data.message.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect),
        dictionary: data.dictionary.sort(() => 0.5 - Math.random()).slice(0, data.threshold.perfect)
    })
    const [encryptedMessage, setEncryptedMessage] = React.useState("")
    const [value, setValue] = React.useState("")
    
    React.useEffect(() => {
        if(myData.message){
            const message = myData.message[0].toUpperCase()
            const hashMap = Object.fromEntries(myData.dictionary[0])
            const encryptedMessageT = []
            for (let i = 0; i < message.length; i++) {
                let hashed = hashMap[message[i]] || " "
                encryptedMessageT.push(hashed.length  > 1 ? <div className="square" style={{backgroundColor:`${hashed}`}}></div>:hashMap[message[i]])
            }
            setEncryptedMessage(encryptedMessageT)
        }
    }, [myData])

    const handleChange = ({target}) => {
        setValue(target.value)
    }

    const handleClick = (cb1,cb2) => {
        if(value.toUpperCase() === myData.message[0].toUpperCase()){
            cb1(1)
        }else{
            cb1(0)
        }
        cb2("end")
    }

    return(
        <ScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name} threshold={myData.threshold} exerciseId={myData.id} dim={myData.dim} apr={myData.apr}>
            {
                (setScore, setPhase) => (
                    <div className="cypher">
                        <div className="cypher-map">
                            {myData.dictionary[0].map((item, idx)=>(
                                <div key={idx} className="cypher-map-item">
                                    <span className="symbol">{item[1].length > 1 ? <div className="square" style={{backgroundColor:`${item[1]}`}}></div> : item[1]}</span>
                                    <span className="letter">{item[0]}</span>
                                </div>
                            ))}
                        </div>
                        <div className="cypher-test">
                            <p>{encryptedMessage}</p>
                            <input type="text" placeholder="Escribe aquí tu mensaje" value={value} onChange={handleChange} />
                        </div>
                        <button className="button-play" onClick={()=>{handleClick(setScore, setPhase)}} disabled={!value.length}>FINALIZAR</button>
                    </div>
                )
            }
        </ScoringComponent>
    )
}