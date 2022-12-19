import React from "react"
import { addInstitution } from "../../requests"
import "../../styles/editorModal.css"

export default function NewInstModal({close}){

    const [code, setCode] = React.useState("")
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [country, setCountry] = React.useState("")
    const [province, setProvince] = React.useState("")
    const [city, setCity] = React.useState("")

    const [enabled, setEnabled] = React.useState(false)
    const [done, setDone] = React.useState(false)
    const [textDone, setTextDone] = React.useState("")

    React.useEffect(()=>{
        if(code !== "" && name !== "" && email !== "" && country !== "" && province !== "" && city !== ""){
            setEnabled(false)
        }else{
            setEnabled(true)
        }
    },[code, name, email, country, province, city])
    const handleClick = () => {
        addInstitution(
            { institution_code: code, name: name, email: email, country: country, province: province, city: city },
            (data)=>{
                if( data.registered ){
                    setTextDone("Se ha añadido correctamente")
                }else{
                    setTextDone("No se ha podido añadir")
                }
                setDone(true)
            },
            ()=>{
                alert("Error")
            })
    }

    return(
        <div className="big-container">
            <div className="editor-modal">
                {
                    done ?
                    <>
                        <h2>{textDone}</h2>
                        <button onClick={()=>{window.location.reload()}}>ACTUALIZAR</button>
                    </> :
                    <>
                        <span onClick={()=>{close(false)}}></span>
                        <h2>Llene los siguientes campos</h2>
                        <input type="text" placeholder={"Código"} value={code} onChange={(e)=>{setCode(e.target.value)}} />
                        <input type="text" placeholder={"Nombre"} value={name} onChange={(e)=>{setName(e.target.value)}} />
                        <input type="text" placeholder={"Email"} value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                        <input type="text" placeholder={"País"} value={country} onChange={(e)=>{setCountry(e.target.value)}} />
                        <input type="text" placeholder={"Provincia"} value={province} onChange={(e)=>{setProvince(e.target.value)}} />
                        <input type="text" placeholder={"Ciudad"} value={city} onChange={(e)=>{setCity(e.target.value)}} />
                        <button onClick={handleClick} disabled={enabled}>Guardar</button>
                    </>
                }
            </div>
        </div>
    )
}