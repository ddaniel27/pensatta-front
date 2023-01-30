import React, {useState, useEffect, useRef, useLayoutEffect} from "react";
import enemigo from "/images/exercises/09/enemigo.svg"


const Enemigos = ({positions}) =>{
    
    const canvas = positions.map( (position,index) => {
        const enemiedraw = {
            position:"absolute",
            top : `${position.y}%`,
            left : `${position.x}%`,
            width :`5%`,
            height : `5%`          
        };

         return <img key={`enemie-${index}`} src={enemigo} alt="enemigo" style={enemiedraw}/>
})

return(
    <>
        {canvas}
    </>
)
}
export default Enemigos