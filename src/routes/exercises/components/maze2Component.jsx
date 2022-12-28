import React, {useState, useEffect, useRef, useLayoutEffect} from "react";
import zorrito from "/images/exercises/09/zorrito.svg"
import laberintoN from "/images/exercises/09/laberinto1.svg"
import styles from "../../../styles/maze2Component.module.css"
import laberintos from "../ex09/laberintos.json"
import MazeButton from "./mazeButton";
import corazon from "/images/exercises/09/corazon.svg"

const maze2Styles = {
    zorrito :{
        position: "absolute",
        left:"4%",
        top: "4%",
        width: "5%",
        height:"5%"   
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
const LaberintoN = ()=> (<img src={laberintoN} alt="laberintoN"/>)
const Maze = ({style})=>{
    const canvas = laberintos.laberinto9.map( line => {
            const linedraw = {
                position:"absolute",
                top : `${line.y}%`,
                left : `${line.x}%`,
                width :`${line.width}%`,
                height : `${line.height}%`,
                background : "#008E86"
            };

             return <canvas style={linedraw}></canvas>
    })
  
    return(
        <div style={ {display: "flex", position:"relative",width:"100%", height:"100%"}}>
            {canvas}
        </div>
    )
}




const Maze2Component = ({}) => {
    const [posx, setPosx] = useState(4);
    const [posy, setPosy] = useState(4);
    const intervalRef = useRef(null);
    const [styleZorrito, setStyleZorrito] = useState(maze2Styles.zorrito)
    const [styleMaze, setStyleMaze] = useState(maze2Styles.canvas1)
    const [zorritoHitbox, setZorritoHitbox]= useState({x: posx ,y: posy ,width: 5 ,height: 5 })
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
                top : `${posy}%`
        })
 }

    }, [posy])

    useEffect( ()=>{
       
        setZorritoHitbox({...zorritoHitbox, x : posx})
       if(!isCollide){
            setStyleZorrito( {
                ...styleZorrito,
                left : `${posx}%`
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
                    laberintos.laberinto6.some( line => { 
                    if(collisionDetection({...zorritoHitbox, x :  counter + 2*incremento },line)){
                        return true
                    }
                })){
                    
                    setPosx((prevCounter) => {
                        return prevCounter - incremento});
                    setIsCollide(false);
                    clearInterval(intervalRef.current);
                }
               
            
            }}, 10);
 
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
                laberintos.laberinto6.some( line => { 
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
        }, 10);
        

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
        <div className={styles.allContainer}>
            <div className={styles.mazeContainer}>
                <div className={styles.maze}>
                    <div style={{display: "flex", position:"relative",width:"90.83275862%", height:"90.83275862%", top:"4%", left:"3.6%"}}>
                        <Maze style={styleMaze}/>
                        <Zorrito style = {styleZorrito} />
                    </div>
                </div>
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.intentosContainer}>
                    Intentos:
                    <div>
                        <img src={corazon}/>
                        <img src={corazon}/>
                        <img src={corazon}/>
                    </div>
                </div>
                <div className={styles.buttonsContainer}>
                    <div className={styles.btnR}>
                        <MazeButton onMouseDown = {!isCollide ? ()=>startCounterX(0.2): ()=>correcciónX(0.2)}
                            onMouseUp = {stopCounter}
                            onMouseLeave = {stopCounter}
                            direction="right" /> 
                    </div>
                    <div className={styles.btnD}>
                        <MazeButton onMouseDown = {!isCollide ? ()=>startCounterY(0.2) : ()=>correcciónY(0.2)}
                            onMouseUp = {stopCounter}
                            onMouseLeave = {stopCounter}
                            direction="down" />
                    </div>
                    <div className={styles.btnL}>
                        <MazeButton onMouseDown = {!isCollide ? ()=>startCounterX(-0.2) : ()=>correcciónY(-0.2)}
                            onMouseUp = {stopCounter}
                            onMouseLeave = {stopCounter}
                            direction = "left" /> 
                    </div>
                    <div className={styles.btnU}>
                        <MazeButton onMouseDown = {!isCollide ? ()=>startCounterY(-0.2) : ()=>correcciónY(-0.2)}
                            onMouseUp = {stopCounter}
                            onMouseLeave = {stopCounter} 
                            direction = "up"/>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Maze2Component

