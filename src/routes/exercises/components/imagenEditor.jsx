import React from "react"
import "../../../styles/imagenEditor.css"

export default function ImagenEditor({ sequence, startSequence, isFinished, setScore, correctSequence, reset, isFinishedGlobal }) {

    const img = React.useRef(null)
    const [bg, setBg] = React.useState(null)
    const [opacity, setOpacity] = React.useState(null)
    const [color, setColor] = React.useState(null)
    const [initBackground, setInitBackground] = React.useState(null)


    function delay(n) {
        return new Promise(function (resolve) {
            setTimeout(resolve, n)
        });
    }

    React.useEffect(()=>{
        if(reset){
            opacity.removeAttribute("opacity")
            color.removeAttribute("opacity")
            bg.setAttribute("fill", initBackground)
        }
    },[reset])

    React.useEffect(() => {
        async function test(){
            while(!img.current.contentWindow.document.querySelector("#Bg")) {
                await new Promise(r => setTimeout(r, 500));
            }
            setBg(img.current.contentWindow.document.querySelector("#Bg"))
            setOpacity(img.current.contentWindow.document.querySelector("#Oscuro"))
            setColor(img.current.contentWindow.document.querySelector("#Color"))
            setInitBackground(img.current.contentWindow.document.querySelector("#Bg").attributes.fill.value)
        }
        test()
    }, [])

    React.useEffect(() => {
        if(bg && opacity && color && startSequence){
            async function init(){
                const obj = correctSequence.reduce((o, key) => ({ ...o, [key]: 0}), {})

                for(let i = 0; i < sequence.length; i++){
                    if(sequence[i][0] == "brillo"){ opacity.setAttribute("opacity", "0") }
                    else if(sequence[i][0] == "color"){ color.setAttribute("opacity", "0") }
                    else if(sequence[i][0] == "nuevo"){ bg.setAttribute("fill", "#008E86") }
                    else if(sequence[i][0] == "eliminar"){ bg.setAttribute("fill", "#FFFFFF") }
                    
                    await delay(2000)

                    if(obj[sequence[i][0]] !== undefined){
                        obj[sequence[i][0]]++
                    }else{
                        break
                    }

                }

                if(Object.values(obj).every(v => v == 1)){
                    setScore(1)
                    await delay(2000)
                    isFinishedGlobal("end")
                }else{
                    setScore(0)
                }
                await delay(500)
                isFinished(true)
                console.log(img.current, opacity, color, bg, initBackground)
            }
            init()
        }
    }, [bg, opacity, color, startSequence])


    return(
        <div className="imagenEditor">
            <iframe src="images/exercises/11/Foto.svg" ref={img} />
            <img src="images/exercises/11/Guide.svg" alt="Modificar" />
        </div>
    )
}