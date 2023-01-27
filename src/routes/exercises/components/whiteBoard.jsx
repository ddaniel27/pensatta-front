import { useState, useEffect,useLayoutEffect } from 'react'
import rough from "roughjs"
import styles from "../../../styles/boardDrawing.module.css"

const roughGenerator = rough.generator();

const WhiteBoard = ({canvasRef, ctxRef, elements, setElements, tool}) => {

    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(()=>{
        const canvas = canvasRef.current;
        canvas.height = 400;
        canvas.width = 400;
        const ctx = canvas.getContext("2d");

        ctxRef.current = ctx;
    },[])

    useLayoutEffect(()=>{

        const roughCanvas = rough.canvas(canvasRef.current);

        if(elements.length > 0){
            ctxRef.current.clearRect(
                0, 
                0, 
                canvasRef.current.width, 
                canvasRef.current.height);
        }

        elements.forEach(ele=>{
            if(ele.type==="pencil"){
                roughCanvas.linearPath(ele.path)
            }else if(ele.type==="line"){
                roughCanvas.draw(
                    roughGenerator.line(ele.offsetX, ele.offsetY, ele.width, ele.height)
                )
            }else if(ele.type==="rect"){
                roughCanvas.draw(
                    roughGenerator.rectangle(ele.offsetX, ele.offsetY, ele.width, ele.height)
                )
            }else if(ele.type==="circle"){
                roughCanvas.draw(
                    roughGenerator.circle(ele.offsetX, ele.offsetY, ele.diameter)
                )
            }else if(ele.type==="ellipse"){
                roughCanvas.draw(
                    roughGenerator.ellipse(ele.offsetX, ele.offsetY, ele.width, ele.height)
                )
            }
        });

    },[elements])


    const handleMouseDown = (e)=>{
        const {offsetX, offsetY} = e.nativeEvent;
        console.log(tool)

        if(tool === "pencil"){
            setElements(prev=>[
                ...prev, 
                {
                    type: "pencil",
                    offsetX,
                    offsetY,
                    path: [[offsetX, offsetY]],
                    stroke: "black",
                }
            ])
        }else if(tool === "line"){
            setElements(prev=>[
                ...prev, 
                {
                    type: "line",
                    offsetX,
                    offsetY,
                    width: offsetX,
                    height: offsetY,
                    stroke: "black",
                }
            ])
        }else if(tool === "rect"){
            setElements(prev=>[
                ...prev, 
                {
                    type: "rect",
                    offsetX,
                    offsetY,
                    width: 0,
                    height: 0,
                    stroke: "black",
                }
            ])
        }else if(tool === "circle"){
            setElements(prev=>[
                ...prev,
                {
                    type: "circle",
                    offsetX,
                    offsetY,
                    diameter: 0,
                    stroke: "black",
                }
            ])
        }else if(tool === "ellipse"){
            setElements(prev=>[
                ...prev,
                {
                    type: "ellipse",
                    offsetX,
                    offsetY,
                    width: 0,
                    height: 0,
                    stroke: "black",
                }
            ])
        }

        setIsDrawing(true);
    }
    const handleMouseMove = (e)=>{
        const {offsetX, offsetY} = e.nativeEvent;
        if(isDrawing){        
            if(tool === "pencil"){
                 // pencil by default as static
                const {path}= elements[elements.length-1];
                const newPath = [...path, [offsetX, offsetY]];
                setElements(prev=>{
                        return prev.map(
                            (ele, index)=>{
                                if(index === elements.length-1){
                                    return{
                                        ...ele,
                                        path: newPath,
                                    }
                                }else{
                                    return ele;
                                }
                            })
                    })
            }else if(tool === "line"){
                setElements(prev=>{
                    return prev.map(
                        (ele, index)=>{
                            if(index === elements.length-1){
                                return{
                                    ...ele,
                                    width: offsetX,
                                    height: offsetY,
                                }
                            }else{
                                return ele;
                            }
                        })
                })
            }else if(tool === "rect"){
                setElements(prev=>{
                    return prev.map(
                        (ele, index)=>{
                            if(index === elements.length-1){
                                return{
                                    ...ele,
                                    width: offsetX - ele.offsetX,
                                    height: offsetY - ele.offsetY,
                                }
                            }else{
                                return ele;
                            }
                        })
                })
            }else if(tool === "circle"){
                setElements(prev=>{
                    return prev.map(
                        (ele, index)=>{
                            if(index === elements.length-1){
                                return{
                                    ...ele,
                                    diameter: offsetX - ele.offsetX,
                                }
                            }else{
                                return ele;
                            }
                        })
                })
            }else if(tool === "ellipse"){
                setElements(prev=>{
                    return prev.map(
                        (ele, index)=>{
                            if(index === elements.length-1){
                                return{
                                    ...ele,
                                    width: offsetX - ele.offsetX,
                                    height: offsetY - ele.offsetY,
                                }
                            }else{
                                return ele;
                            }
                        })
                })
            }
        }
    }

    const handleMouseUp = (e)=>{
        setIsDrawing(false);
    }

    return(
        <div className={styles["canvas-draw"]} 
             id="myCanvas" 
             onMouseDown={handleMouseDown} 
             onMouseMove={handleMouseMove} 
             onMouseUp={handleMouseUp}>
            <canvas ref={canvasRef}
                    className={styles["canvas-draw"]} />
        </div>
        
    )
}
export default WhiteBoard