import React from "react"
import "../../../styles/slider.css"

export default function Slider({ data, enableButton }){

    const [currentImg, setCurrentImg] = React.useState(0);

    const handleClick = ({target}) => {

        if(enableButton){ enableButton(false) }

        if(target.id === "decrease"){
            if(currentImg === 0){
                setCurrentImg(data.slides.length - 1);
            }else{
                setCurrentImg(currentImg - 1)
            }
        } else if(target.id === "increase"){
            if(currentImg === data.slides.length - 1){
                setCurrentImg(0);
            }else{
                setCurrentImg(currentImg + 1)
            }
        }
    }

    return(
    <div className="slider">
        <div className="decrease">
            <span onClick={handleClick} id="decrease" style={{display:`${currentImg ? "block":"none"}`}} ></span>
        </div>
        <div className="images-site">
            <div className="prev-image" style={{display:`${currentImg ? "grid":"none"}`}}>
                <img src={`./images/exercises/${data.path}/${data.slides[currentImg - 1]?.img}`} alt={data.slides[currentImg - 1]?.img}/>
                <p style={{color:`${data.slides[currentImg - 1]?.color}`}}>{data.slides[currentImg - 1]?.legend1}<br/>{data.slides[currentImg - 1]?.legend2}</p>
            </div>
            <div className="curr-image">
                <img src={`./images/exercises/${data.path}/${data.slides[currentImg].img}`} alt={data.slides[currentImg].img}/>
                <p style={{color:`${data.slides[currentImg]?.color}`}}><span>{data.slides[currentImg].legend1}</span><span>{data.slides[currentImg].legend2}</span></p>
            </div>
        </div>
        <div className="increase">
            <span onClick={handleClick} id="increase" style={{display:`${currentImg === (data.slides.length - 1) ? "none":"block"}`}} ></span>
        </div>
    </div>

    ) 
}