import React, {useState, useEffect, useRef, useLayoutEffect} from "react";
import zorrito from "/images/exercises/09/zorrito.svg"
import styles from "../../../styles/maze2Component.module.css"
import laberintos from "../ex09/laberintos.json"

const maze2Styles = {
    zorrito :{
        position: "absolute",
        left:"5px",
        top: "5px"   
    },
    mazeContainer:{
        display : "flex",
        backgroundColor : ""
    },
    canvas1:{
        padding:0,
        margin:0,
        boxSizing: "border-box",
        border: "5px solid black",
        position: "absolute",
        top:"50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        background: "blue"
    }


}



const Zorrito = ({style}) => (<img src={zorrito} alt="zorrito" style={style}/>)

const Maze = ({style})=>{
    const canvas = laberintos.laberinto1.map( line => {
            const linedraw = {
                position:"absolute",
                top : `${line.y}px`,
                left : `${line.x}px`,
                width :`${line.width}px`,
                height : `${line.height}px`,
                background : "black"
            };

             return <canvas style={linedraw}></canvas>
    })
  
    return(
        <div>
            {canvas}
        </div>
    )
}




const Maze2Component = ({}) => {
    const [posx, setPosx] = useState(5);
    const [posy, setPosy] = useState(5);
    const intervalRef = useRef(null);
    const [styleZorrito, setStyleZorrito] = useState(maze2Styles.zorrito)
    const [styleMaze, setStyleMaze] = useState(maze2Styles.canvas1)
    const [zorritoHitbox, setZorritoHitbox]= useState({x: posx ,y: posy ,width: 35 ,height: 26 })
    const [isCollide, setIsCollide] =useState(false)

    const collisionDetection = (rect1, rect2) => (
        rect1.x <= rect2.x +rect2.width &&
        rect1.x + rect1.width >= rect2.x &&
        rect1.y <= rect2.y +rect2.height &&
        rect1.height +rect1.y >= rect2.y
    )

    useEffect( ()=>{

        setZorritoHitbox({...zorritoHitbox, y : posy})
        
       if(!isCollide){
        

            setStyleZorrito({ 
                ...styleZorrito,
                top : `${posy}px`
        })
 }

    }, [posy])

    useEffect( ()=>{
       
        setZorritoHitbox({...zorritoHitbox, x : posx})
       if(!isCollide){
            setStyleZorrito( {
                ...styleZorrito,
                left : `${posx}px`
           })
           
       }
    }, [posx])

    
    const stopCounter = () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };

    
    const startCounterX = (incremento) => {
            let counter = 0;
            if (intervalRef.current) return;
            
            intervalRef.current = setInterval(() => {
            if(!isCollide){
                setPosx((prevCounter) => {
                    counter = prevCounter
                    return prevCounter + incremento});
                setZorritoHitbox({
                    ...zorritoHitbox,
                    x :  counter + incremento
                })
                
                if(
                    laberintos.laberinto1.some( line => { 
                    if(collisionDetection({...zorritoHitbox, x :  counter + 2*incremento },line)){
                        return true
                    }
                })){
                    
                    setPosx((prevCounter) => {
                        return prevCounter - incremento});
                    setIsCollide(false);
                    clearInterval(intervalRef.current);
                }
               
            
            }}, 20);
 
      };

      
    


      const startCounterY = (incremento) => {
        let counter = 0;
        if (intervalRef.current) return;
        intervalRef.current = setInterval(() => {
        if(!isCollide){
            setPosy((prevCounter) => {
                counter = prevCounter
                return prevCounter + incremento});
            setZorritoHitbox({
                ...zorritoHitbox,
                y :  counter + incremento
            })
            if(
                laberintos.laberinto1.some( line => { 
                if(collisionDetection({...zorritoHitbox, y :  counter + 2*incremento},line)){
                    return true
                }
            })){
                
                setPosy((prevCounter) => {
                    return prevCounter - incremento });
                setIsCollide(false);              
                clearInterval(intervalRef.current);
            }
           
        } 
        }, 20);
        

  };
  const correcciónX = (incremento) => {
    setPosx(posx - 2*incremento )
    setIsCollide(false)
  }
  const correcciónY = (incremento) => {
    setPosy(posy - 2*incremento)
    setIsCollide(false)
  }
    

 
    return(
        <div>
            <Maze style={styleMaze}/>
            <Zorrito style = {styleZorrito} />
            <button onMouseDown = {!isCollide ? ()=>startCounterX(1): ()=>correcciónX(1)}
                    onMouseUp = {stopCounter}
                    onMouseLeave = {stopCounter}> Right</button>
            <button onMouseDown = {!isCollide ? ()=>startCounterY(1) : ()=>correcciónY(1)}
                    onMouseUp = {stopCounter}
                    onMouseLeave = {stopCounter}>Down</button>
            <button onMouseDown = {!isCollide ? ()=>startCounterX(-1) : ()=>correcciónY(-1)}
                    onMouseUp = {stopCounter}
                    onMouseLeave = {stopCounter}> Left</button>
            <button onMouseDown = {!isCollide ? ()=>startCounterY(-1) : ()=>correcciónY(-1)}
                    onMouseUp = {stopCounter}
                    onMouseLeave = {stopCounter}>Up</button>
        </div>
    )

}

export default Maze2Component

