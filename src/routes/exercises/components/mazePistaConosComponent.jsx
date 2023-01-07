import React, {useState, useEffect, useRef, useLayoutEffect} from "react";


const Cono = ({positions,imagePath}) =>{
    
    const canvas = positions.map( position => {
        const enemiedraw = {
            position:"absolute",
            top : `${position.y}%`,
            left : `${position.x}%`,
            width :`5%`,
            height : `5%` ,
        };

         return <img src={position.dir =="V" ? imagePath.V : imagePath.H} alt="enemigo" style={enemiedraw}/>
})

return(
    <>
        {canvas}
    </>
)
}
export default Cono