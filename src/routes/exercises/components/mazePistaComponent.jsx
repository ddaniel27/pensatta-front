import React, {useState, useEffect, useRef, useLayoutEffect} from "react";
import carrito from "/images/exercises/32/carrito.svg"
import styles from "../../../styles/mazePistaComponent.module.css"
import pistas from "../ex32/pistas.json"
import starts from "../ex32/starts.json"
import MazeButton from "./mazeButton";
import corazon from "/images/exercises/09/corazon.svg"
import Cono from "./mazePistaConosComponent"
import positionEnemies from "../ex32/enemies.json"

const Carrito = ({style}) => (<img src={carrito} alt="carrito" style={style}/>)
const Maze = ({ pista,colorLine})=>{
    const canvas = pista.map( line => {
            const linedraw = {
                position:"absolute",
                top : `${line.y}%`,
                left : `${line.x}%`,
                width :`${line.width}%`,
                height : `${line.height}%`,
                background : `${colorLine}`
            };

             return <canvas style={linedraw}></canvas>
    })
  
    return(
        <div style={ {display: "flex", position:"relative",width:"100%", height:"100%"}}>
            {canvas}
        </div>
    )
}
const Hearts = ({vidas,style}) =>{ 
    let hearts = [];

    for( var i = 1; i <= vidas; i++) {
            hearts.push(
            <div>
                <img src={corazon} style={style} />
            </div>  );
        }
    return hearts
}


const MazePistaComponent = ({lab,setPhase,setScore,colorLine,imagePath}) => {
    const carInitX = starts[`pista${lab}`].startPosition.x;
    const carInitY = starts[`pista${lab}`].startPosition.y;
    const maze2Styles = {
        carrito :{
            position: "absolute",
            left:`${carInitX}%`,
            top: `${carInitY}%`,
            width: "4.6%",
            height:"6%",
            transform:"rotate(0deg)"
        },
        mazeContainer:{
            display : "flex",
            backgroundColor : ""
        },
        corazon:{
            width:"100%",
            height:"auto"
        },
        maze:{
            
                display: "flex",
                position: "relative",
                width: "480px",
                height: "480px",
                backgroundImage: `url("/images/exercises/32/pista${lab}.svg")`
                
            
        }
        
    }
    
    const finish = starts[`pista${lab}`].finishHitbox;
    const enemiesPos = positionEnemies[`pista${lab}`];
    
    

    const pista = pistas[`pista${lab}`];
    const velocidad = 10;
    const [posx, setPosx] = useState(carInitX);
    const [posy, setPosy] = useState(carInitY);
    const intervalRef = useRef(null);
    const [styleCarrito, setStyleCarrito] = useState(maze2Styles.carrito)
    const [carritoHitbox, setCarritoHitbox]= useState({x: posx ,y: posy ,width: 4.6 ,height: 6 })
    const [isCollide, setIsCollide] =useState(false)
    const [isWin, setIsWin] = useState(false);
    const [vidas,setVidas] = useState(3);
    const [isRestart,setIsRestart] =useState(false)
    const [posEnemies, setPosEnemies] = useState(enemiesPos);
    const [dirX, setDirX] = useState(1)
    const [dirY, setDirY] = useState(0)
    
   
    

    const collisionDetection = (rect1, rect2) => (
        rect1.x <= rect2.x +rect2.width &&
        rect1.x + rect1.width >= rect2.x &&
        rect1.y <= rect2.y +rect2.height &&
        rect1.height +rect1.y >= rect2.y
    )
    
    useEffect(()=>{
        setStyleCarrito({...styleCarrito,
            transform: `rotate(${dirX*90}deg)`})

    },[dirX])

    useEffect(()=>{
        setStyleCarrito({...styleCarrito,
            transform: `rotate(${(dirY+1)*90}deg)`})

    },[dirY])

    
    useEffect(()=>{
        setPosEnemies(enemiesPos);
        setPosx(carInitX);
        setPosy(carInitY);
        setCarritoHitbox({...carritoHitbox, y : carInitY,
                                            x : carInitX});
        setStyleCarrito({ 
                ...styleCarrito,
                top : `${carInitY}%`,
                left: `${carInitX}%`
        })

    }, [isRestart])

    

    useEffect( ()=>{

        setCarritoHitbox({...carritoHitbox, y : posy})
        
       if(!isCollide){
        

            setStyleCarrito({ 
                ...styleCarrito,
                top : `${posy}%`
        })
 }

    }, [posy])

    useEffect( ()=>{
       
        setCarritoHitbox({...carritoHitbox, x : posx})
       if(!isCollide){
            setStyleCarrito( {
                ...styleCarrito,
                left : `${posx}%`
           })
           
       }
    }, [posx])

    
    const stopCounter = () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsCollide(false)
        }
      };

    
    const startCounterX = (incremento) => {
            let counter = 0;
            
            if (intervalRef.current) return;
            
            intervalRef.current = setInterval(() => {
            if(!isCollide){
                setDirX(Math.sign(incremento))
                setStyleCarrito({...styleCarrito,
                    transform: `rotate(${(Math.sign(incremento))*90}deg)`})
                setPosx((prevCounter) => {
                    counter = prevCounter
                    return prevCounter + incremento});
                
                setCarritoHitbox({
                    ...carritoHitbox,
                    x :  counter + incremento
                })
                
                if(
                    posEnemies.some( enemie => { 
                        if(collisionDetection({...carritoHitbox, x :  counter + 2*incremento},enemie)){
                            return true
                        }
                    })                     
            
                || collisionDetection( {...carritoHitbox, x :  counter + 2*incremento},finish)
                || pista.some( line => { 
                    if(collisionDetection({...carritoHitbox, x :  counter + 2*incremento },line)){
                        return true
                    }
                })){
                    console.log("colision")
                    setPosx((prevCounter) => {
                        return prevCounter - incremento });
                    setIsCollide(false);
                    if( collisionDetection( {...carritoHitbox, x :  counter + 2*incremento},finish)){
                        setIsWin(true);
                    }  
                    if(posEnemies.some( enemie => { 
                        if(collisionDetection({...carritoHitbox, x :  counter + 2*incremento},enemie)){
                            return true
                        }
                    })){
                        
                        setPosEnemies(enemiesPos);
                        setPosx(carInitX);
                        setPosy(carInitY);
                        setCarritoHitbox({...carritoHitbox, y : carInitY,
                                                            x : carInitX});
                        setStyleCarrito({ 
                                ...styleCarrito,
                                top : `${carInitY}%`,
                                left: `${carInitX}%`
                        })
                        setVidas(vidas-1);
                        setIsCollide(true)
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                        return
                    }
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
                
               
            } 
            }, velocidad);
 
      };

      
    


      const startCounterY = (incremento) => {
        let counter = 0;
        
        if (intervalRef.current) return;
        
        intervalRef.current = setInterval(() => {
        if(!isCollide){
            setDirY(Math.sign(incremento))
            setStyleCarrito({...styleCarrito,
                transform: `rotate(${(Math.sign(incremento)+1)*90}deg)`})
            setPosy((prevCounter) => {
                counter = prevCounter
                return prevCounter + incremento});
            setCarritoHitbox({
                ...carritoHitbox,
                y :  counter + incremento
            })
            if(
                posEnemies.some( enemie => { 
                    if(collisionDetection({...carritoHitbox, y :  counter + 2*incremento},enemie)){
                        return true
                    }
                })                
            
            || collisionDetection( {...carritoHitbox, y :  counter + 2*incremento},finish)
            || pista.some( line => { 
                if(collisionDetection({...carritoHitbox, y :  counter + 2*incremento},line)){
                    return true
                }
            })){
                
                setPosy((prevCounter) => {
                    return prevCounter - incremento });
                setDirY(Math.sign(incremento))
                setIsCollide(false);
                if( collisionDetection( {...carritoHitbox, y :  counter + 2*incremento},finish)){
                    setIsWin(true);
                }  
                if(posEnemies.some( enemie => { 
                    if(collisionDetection({...carritoHitbox, y :  counter + 2*incremento},enemie)){
                        return true
                    }
                })){
                    setPosEnemies(enemiesPos);
                    setPosx(carInitX);
                    setPosy(carInitY);
                    setCarritoHitbox({...carritoHitbox, y : carInitY,
                                                        x : carInitX});
                    setStyleCarrito({ 
                            ...styleCarrito,
                            top : `${carInitY}%`,
                            left: `${carInitX}%`
                            
                    })
                    
                    setVidas(vidas-1);
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    return
                }
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            
           
        } 
        }, velocidad);
        

  };
const cbdown = (event)=>{
    if (event.repeat) return;
    if(isWin || vidas <= 0) return;
    const option = {
        ArrowRight: () => {startCounterX(0.2)},
        ArrowLeft: () => {startCounterX(-0.2)},
        ArrowDown: () => {startCounterY(0.2)},
        ArrowUp: () => {startCounterY(-0.2)}
    }
    option[event.code]()
}
const cbup = (event)=>{
    stopCounter();
}

window.onkeydown = cbdown;
window.onkeyup = cbup;

  
  
    return(
        <div className={styles.allContainer}>
            <div className={styles.mazeContainer}>
                <div style={maze2Styles.maze}>
                    <div style={{display: "flex", position:"relative",width:"100%", height:"100%", top:"0%", left:"0%"}}>
                        <Maze pista={pista} colorLine={colorLine}/>
                        <Carrito style = {styleCarrito} />
                        
                    </div>
                </div>
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.intentosContainer}>
                    Intentos:
                    <div className={styles.corazones}>                        
                        <Hearts vidas={vidas} style={maze2Styles.corazon}/>                   
                    </div>
                </div>
                <div className={styles.containerCross}>
                    <div className={styles.containerBtnsText}>
                        <div className={styles.buttonsContainer}>
                            <div className={styles.btnR}>
                                <MazeButton onMouseDown = { !isWin && vidas > 0 ? ()=>startCounterX(0.2):null }
                                    onMouseUp = {stopCounter}
                                    onMouseLeave = {stopCounter}
                                    direction="right" /> 
                            </div>
                            <div className={styles.btnD}>
                                <MazeButton onMouseDown = { !isWin && vidas > 0 ? ()=>startCounterY(0.2):null }
                                    onMouseUp = {stopCounter}
                                    onMouseLeave = {stopCounter}
                                    direction="down" />
                            </div>
                            <div className={styles.btnL}>
                                <MazeButton onMouseDown = { !isWin && vidas > 0 ? ()=>startCounterX(-0.2):null }
                                    onMouseUp = {stopCounter}
                                    onMouseLeave = {stopCounter}
                                    direction = "left" /> 
                            </div>
                            <div className={styles.btnU}>
                                <MazeButton onMouseDown = { !isWin && vidas > 0? ()=>startCounterY(-0.2) :null}
                                    onMouseUp = {stopCounter}
                                    onMouseLeave = {stopCounter} 
                                    direction = "up"/>
                            </div>
                        </div>
                        <div className={styles.infoText}>
                            Muévete oprimiendo estos botones o presionando las teclas de dirección de tu teclado.
                        </div>

                    </div>
                    {isWin || vidas <= 0 ? <div className={styles.containerBtnNext}>
                                                <button onClick={()=>{  setPhase("end")
                                                                        setScore(vidas)}}
                                                        className={styles.btnNext}>SIGUIENTE</button>
                                            </div> :<></>}
                </div>
            </div>
           
        </div>
    )

}


export default MazePistaComponent

