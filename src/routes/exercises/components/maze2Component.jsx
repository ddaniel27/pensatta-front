import React, {useState, useEffect, useRef, useLayoutEffect} from "react";
import zorrito from "/images/exercises/09/zorrito.svg"
import laberintoN from "/images/exercises/09/laberinto1.svg"
import styles from "../../../styles/maze2Component.module.css"
import laberintos from "../ex09/laberintos.json"
import starts from "../ex09/starts.json"
import MazeButton from "./mazeButton";
import corazon from "/images/exercises/09/corazon.svg"
import Enemigos from "./maze2EnemieComponent"
import positionEnemies from "../ex09/enemies.json"







const Zorrito = ({style}) => (<img src={zorrito} alt="zorrito" style={style}/>)
const LaberintoN = ()=> (<img src={laberintoN} alt="laberintoN"/>)
const Maze = ({style, laberinto})=>{
    const canvas = laberinto.map( line => {
            const linedraw = {
                position:"absolute",
                top : `${line.y}%`,
                left : `${line.x}%`,
                width :`${line.width}%`,
                height : `${line.height}%`,
                background : "#00D8CC"
            };

             return <canvas style={linedraw}></canvas>
    })
  
    return(
        <div style={ {display: "flex", position:"relative",width:"100%", height:"100%"}}>
            {canvas}
        </div>
    )
}


const Maze2Component = ({lab,setPhase,setScore}) => {
    const enemiX = starts[`laberinto${lab}`].startPosition.x;
    const enemiY = starts[`laberinto${lab}`].startPosition.y;
    const maze2Styles = {
        zorrito :{
            position: "absolute",
            left:`${enemiX}%`,
            top: `${enemiY}%`,
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
    const start = starts[`laberinto${lab}`].startHitbox;
    const finish = starts[`laberinto${lab}`].finishHitbox;
    
    

    const laberinto = laberintos[`laberinto${lab}`];
    const velocidad = 10;
    const [posx, setPosx] = useState(enemiX);
    const [posy, setPosy] = useState(enemiY);
    const intervalRef = useRef(null);
    const [styleZorrito, setStyleZorrito] = useState(maze2Styles.zorrito)
    const [styleMaze, setStyleMaze] = useState(maze2Styles.canvas1)
    const [zorritoHitbox, setZorritoHitbox]= useState({x: posx ,y: posy ,width: 5 ,height: 5 })
    const [isCollide, setIsCollide] =useState(false)
    const [isWin, setIsWin] = useState(false);
    const [vidas,setVidas] = useState(3);
    const [isRestart,setIsRestart] =useState(false)
    const [posEnemies, setPosEnemies] = useState(positionEnemies[`laberinto${lab}`]);
    const [loop, setLoop] = useState(0);
    const [trigger, setTrigger] = useState(0)
    

    const collisionDetection = (rect1, rect2) => (
        rect1.x <= rect2.x +rect2.width &&
        rect1.x + rect1.width >= rect2.x &&
        rect1.y <= rect2.y +rect2.height &&
        rect1.height +rect1.y >= rect2.y
    )

    useEffect(()=>{
        setPosEnemies(positionEnemies[`laberinto${lab}`]);
        setPosx(enemiX);
        setPosy(enemiY);
        setZorritoHitbox({...zorritoHitbox, y : enemiY,
                                            x : enemiX});
        setStyleZorrito({ 
                ...styleZorrito,
                top : `${enemiY}%`,
                left: `${enemiX}%`
        })

    }, [isRestart])

    useEffect( ()=>{
       
        setTimeout(()=>{
            setLoop(loop+1)
        },10)

    },[trigger])

    useEffect(()=>{
    
       
        const incremento = 0.2;
        const newposEnemies = posEnemies.map((pos)=>{
            if(pos.direction == "right"){
                if(
                    laberinto.some( line => { 
                    if(collisionDetection({...pos , x: pos.x + incremento },line)){
                        return true
                    }
                })|| collisionDetection({...pos , x: pos.x + incremento },start)
                || collisionDetection({...pos , x: pos.y + incremento },finish)
                || collisionDetection({...pos , x: pos.x + incremento },zorritoHitbox)
                ){
                    if(collisionDetection({...pos , x: pos.x + incremento },zorritoHitbox)){
                        setPosEnemies(positionEnemies[`laberinto${lab}`]);
                        setPosx(enemiX);
                        setPosy(enemiY);
                        setZorritoHitbox({...zorritoHitbox, y : enemiY,
                                                            x : enemiX});
                        setStyleZorrito({ 
                                ...styleZorrito,
                                top : `${enemiY}%`,
                                left: `${enemiX}%`
                        })
                        setVidas(vidas-1)
                        setIsRestart(!isRestart)
                    }
                    
                    const direction = ["up", "left", "down", "right"][Math.floor(Math.random() * 4)];
                    return({...pos , direction: direction})
                }
                return({...pos , x: pos.x + incremento})

            }else if(pos.direction == "down"){
                if(
                    laberinto.some( line => { 
                    if(collisionDetection({...pos , y: pos.y + incremento },line)){
                        return true
                    }
                })|| collisionDetection({...pos , y: pos.y + incremento },start)
                || collisionDetection({...pos , y: pos.y + incremento },finish)
                || collisionDetection({...pos , y: pos.y + incremento },zorritoHitbox)
                ){
                    if(collisionDetection({...pos , y: pos.y + incremento },zorritoHitbox)){
                        setPosEnemies(positionEnemies[`laberinto${lab}`]);
                        setPosx(enemiX);
                        setPosy(enemiY);
                        setZorritoHitbox({...zorritoHitbox, y : enemiY,
                                                            x : enemiX});
                        setStyleZorrito({ 
                                ...styleZorrito,
                                top : `${enemiY}%`,
                                left: `${enemiX}%`
                        })
                        setVidas(vidas-1)
                        setIsRestart(!isRestart)
                    }
                    
                    const direction = ["up", "left", "down", "right"][Math.floor(Math.random() * 4)];
                    return({...pos , direction: direction})
                }
                return({...pos , y: pos.y + incremento})
            }else if(pos.direction == "up"){
                if(
                    laberinto.some( line => { 
                    if(collisionDetection({...pos , y: pos.y - incremento },line)){
                        return true
                    }
                })|| collisionDetection({...pos , y: pos.y - incremento },start)
                || collisionDetection({...pos , y: pos.y - incremento },finish)
                || collisionDetection({...pos , y: pos.y - incremento },zorritoHitbox)){
                    if(collisionDetection({...pos , y: pos.y - incremento },zorritoHitbox)){
                        setPosEnemies(positionEnemies[`laberinto${lab}`]);
                        setPosx(enemiX);
                        setPosy(enemiY);
                        setZorritoHitbox({...zorritoHitbox, y : enemiY,
                                                            x : enemiX});
                        setStyleZorrito({ 
                                ...styleZorrito,
                                top : `${enemiY}%`,
                                left: `${enemiX}%`
                        })
                        setVidas(vidas-1)
                        setIsRestart(!isRestart)
                    }
                    
                    const direction = ["up", "left", "down", "right"][Math.floor(Math.random() * 4)];
                    return({...pos , direction: direction})
                }
                return({...pos , y: pos.y - incremento})
            }else{
                if(
                    laberinto.some( line => { 
                    if(collisionDetection({...pos , x: pos.x - incremento },line)){
                        return true
                    }
                })|| collisionDetection({...pos , x: pos.x - incremento },start)
                || collisionDetection({...pos , x: pos.x - incremento },finish
                || collisionDetection({...pos , x: pos.x - incremento },zorritoHitbox))
                ){
                    if(collisionDetection({...pos , x: pos.x - incremento },zorritoHitbox)){
                        setPosEnemies(positionEnemies[`laberinto${lab}`]);
                        setPosx(enemiX);
                        setPosy(enemiY);
                        setZorritoHitbox({...zorritoHitbox, y : enemiY,
                                                            x : enemiX});
                        setStyleZorrito({ 
                                ...styleZorrito,
                                top : `${enemiY}%`,
                                left: `${enemiX}%`
                        })
                        setVidas(vidas-1)
                        setIsRestart(!isRestart)
                    }
                    const direction = ["up", "left", "down", "right"][Math.floor(Math.random() * 4)];
                    return({...pos , direction: direction})
                }
                return({...pos , x: pos.x - incremento})

            }

        })
        setPosEnemies(newposEnemies);
        setTrigger(trigger+1)
       

    },[loop])

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
                    laberinto.some( line => { 
                    if(collisionDetection({...zorritoHitbox, x :  counter + 2*incremento },line)){
                        return true
                    }
                }) 
                || collisionDetection( {...zorritoHitbox, x :  counter + 2*incremento},start)
                || collisionDetection( {...zorritoHitbox, x :  counter + 2*incremento},finish)
                || posEnemies.some( enemie => { 
                    if(collisionDetection({...zorritoHitbox, x :  counter + 2*incremento},enemie)){
                        return true
                    }
                })){
                    
                    setPosx((prevCounter) => {
                        return prevCounter - incremento });
                    setIsCollide(false);
                    if( collisionDetection( {...zorritoHitbox, x :  counter + 2*incremento},finish)){
                        setIsWin(true);
                    }  
                    if(posEnemies.some( enemie => { 
                        if(collisionDetection({...zorritoHitbox, x :  counter + 2*incremento},enemie)){
                            return true
                        }
                    })){
                        console.log("collision")
                        setPosEnemies(positionEnemies[`laberinto${lab}`]);
                        setPosx(enemiX);
                        setPosy(enemiY);
                        setZorritoHitbox({...zorritoHitbox, y : enemiY,
                                                            x : enemiX});
                        setStyleZorrito({ 
                                ...styleZorrito,
                                top : `${enemiY}%`,
                                left: `${enemiX}%`
                        })
                        setVidas(vidas-1);
                        clearInterval(intervalRef.current);
                        return
                    }
                    clearInterval(intervalRef.current);
                }
                
               
            } 
            }, velocidad);
 
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
                laberinto.some( line => { 
                if(collisionDetection({...zorritoHitbox, y :  counter + 2*incremento},line)){
                    return true
                }
            })
            || collisionDetection( {...zorritoHitbox, y :  counter + 2*incremento},start) 
            || collisionDetection( {...zorritoHitbox, y :  counter + 2*incremento},finish)
            || posEnemies.some( enemie => { 
                if(collisionDetection({...zorritoHitbox, y :  counter + 2*incremento},enemie)){
                    return true
                }
            })){
                
                setPosy((prevCounter) => {
                    return prevCounter - incremento });
                setIsCollide(false);
                if( collisionDetection( {...zorritoHitbox, y :  counter + 2*incremento},finish)){
                    setIsWin(true);
                }  
                if(posEnemies.some( enemie => { 
                    if(collisionDetection({...zorritoHitbox, y :  counter + 2*incremento},enemie)){
                        return true
                    }
                })){
                    setPosEnemies(positionEnemies[`laberinto${lab}`]);
                    setPosx(enemiX);
                    setPosy(enemiY);
                    setZorritoHitbox({...zorritoHitbox, y : enemiY,
                                                        x : enemiX});
                    setStyleZorrito({ 
                            ...styleZorrito,
                            top : `${enemiY}%`,
                            left: `${enemiX}%`
                    })
                    setVidas(vidas-1);
                    clearInterval(intervalRef.current);
                    return
                }
                clearInterval(intervalRef.current);
            }
            
           
        } 
        }, velocidad);
        

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
                        <Maze style={styleMaze} laberinto={laberinto}/>
                        <Zorrito style = {styleZorrito} />
                        <Enemigos positions={posEnemies}/>
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
                    <div> {isWin ? <p>Ganaste</p>: <></>}</div>
                </div>
                <div className={styles.buttonsContainer}>
                    <div className={styles.btnR}>
                        <MazeButton onMouseDown = { !isWin ? ()=>startCounterX(0.2):null }
                            onMouseUp = {stopCounter}
                            onMouseLeave = {stopCounter}
                            direction="right" /> 
                    </div>
                    <div className={styles.btnD}>
                        <MazeButton onMouseDown = { !isWin ? ()=>startCounterY(0.2):null }
                            onMouseUp = {stopCounter}
                            onMouseLeave = {stopCounter}
                            direction="down" />
                    </div>
                    <div className={styles.btnL}>
                        <MazeButton onMouseDown = { !isWin ? ()=>startCounterX(-0.2):null }
                            onMouseUp = {stopCounter}
                            onMouseLeave = {stopCounter}
                            direction = "left" /> 
                    </div>
                    <div className={styles.btnU}>
                        <MazeButton onMouseDown = { !isWin? ()=>startCounterY(-0.2) :null}
                            onMouseUp = {stopCounter}
                            onMouseLeave = {stopCounter} 
                            direction = "up"/>
                    </div>
                </div>
            </div>
            {isWin ? <button onClick={()=>{setPhase("end")
                                            setScore(vidas)}}>SIGUIENTE</button>:<></>}
        </div>
    )

}

export default Maze2Component

