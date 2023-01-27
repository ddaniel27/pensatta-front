import { useEffect, useState,useRef } from "react";
import WhiteBoard from "./whiteBoard";
import styles from "../../../styles/boardDrawing.module.css"



const BoardDrawing = ()=>{
    const canvasRef = useRef(null)
    const ctxRef = useRef(null)
    const [tool, setTool] = useState("pencil")
    const [color, setColor] = useState("black")
    const [elements, setElements] = useState([])


    return(
        <div>
            <div className={styles["whiteboard-container"]}>
                <WhiteBoard tool={tool} color={color} canvasRef={canvasRef} ctxRef={ctxRef} elements={elements} setElements={setElements}/>
            </div>
            <div>
                <div>
                    <label for="pencil">Pencil<input type="radio" name="tool" value="pencil" checked={tool==="pencil"} onChange={(e)=>setTool(e.target.value)}/></label>
                </div>
                <div>
                    <label for="line">Line<input type="radio" name="tool" value="line" checked={tool==="line"} onChange={(e)=>setTool(e.target.value)}/></label>
                </div>
                <div>
                    <label for="rect">Rectangle<input type="radio" name="tool" value="rect" checked={tool==="rect"} onChange={(e)=>setTool(e.target.value)}/></label>
                </div>
                <div>
                    <label for="circle">Circle<input type="radio" name="tool" value="circle" checked={tool==="circle"} onChange={(e)=>setTool(e.target.value)}/></label>
                </div>
                <div>
                    <label for="ellipse">Ellipse<input type="radio" name="tool" value="ellipse" checked={tool==="ellipse"} onChange={(e)=>setTool(e.target.value)}/></label>
                </div>
                <div>
                    <label for="triangle">Triangle<input type="radio" name="tool" value="triangle" checked={tool==="triangle"} onChange={(e)=>setTool(e.target.value)}/></label>
                </div>
                <div>
                    <label for="star">Star<input type="radio" name="tool" value="star" checked={tool==="star"} onChange={(e)=>setTool(e.target.value)}/></label>
                </div>
                <div>
                    <label for="color">Color<input type="color" name="color" value={color} onChange={e=>setColor(e.target.value)}/></label>
                </div>
            </div>
            <div>
                <button>Undo</button>
                <button>Redo</button>
            </div>
            <div>
                <button>Clear</button>
            </div>

           
        </div>
    )

}
export default BoardDrawing