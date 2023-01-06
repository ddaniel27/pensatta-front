import React, {useEffect,useState} from "react";
import "../../../styles/boardDfd.css"

const BoardDfd = ({column,targetId})=>{
    const [columnObjs, setColumnObjs] = useState(column)
    console.log(targetId)
    console.log(columnObjs)

    
    return(
        <>
            <div className="board">
                {
                    columnObjs.map( (obj) =>{
                        console.log(obj.sentence)
                        if(obj.sentence == "if"){
                            const text = obj.text.replace('¿','').replace('?','')
                            return(<p style={targetId == obj.id ? {color:"#00D8CC"}:{color:"#F2F2F2"}}>{ `
                            IF(${text})
                            ` }</p>)

                        }
                        if(obj.sentence == "ifyes"){
                            return(
                                <>
                                    <p style={targetId == obj.id ? {color:"#00D8CC"}:{color:"#F2F2F2"}}>&nbsp;{`{`}</p>
                                    <p style={targetId == obj.id ? {color:"#00D8CC"}:{color:"#F2F2F2"}}>&nbsp;&nbsp;{obj.text} ;</p>
                                    <p style={targetId == obj.id ? {color:"#00D8CC"}:{color:"#F2F2F2"}}>&nbsp;{` }`}</p>
                                </>
                            )
                        }
                        if(obj.sentence == "ifelse"){
                            return(
                                <>  
                                    <p style={targetId == obj.id ? {color:"#00D8CC"}:{color:"#F2F2F2"}}>ELSE</p>
                                    <p style={targetId == obj.id ? {color:"#00D8CC"}:{color:"#F2F2F2"}}>&nbsp;{`{`}</p>
                                    <p style={targetId == obj.id ? {color:"#00D8CC"}:{color:"#F2F2F2"}}>&nbsp;&nbsp;{obj.text} ;</p>
                                    <p style={targetId == obj.id ? {color:"#00D8CC"}:{color:"#F2F2F2"}}>&nbsp;{` }`}</p>
                                </>
                            )
                        }
                        if(obj.sentence == "assign"){
                            return (<p style={targetId == obj.id ? {color:"#00D8CC"}:{color:"#F2F2F2"}}> {obj.text}; </p>)
                        }


                    })
                }

            </div>
        </>
    )

}
export default BoardDfd