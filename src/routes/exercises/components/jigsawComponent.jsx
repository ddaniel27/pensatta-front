import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next'
import {
    GridContextProvider,
    GridDropZone,
    GridItem
  } from "react-grid-dnd";
import styles from "../../../styles/jigsawComponent.module.css"

const TrafficLight = ({isFinish})=>{
    return (<svg width="180" height="80" viewBox="0 0 180 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="180" y="80" width="180" height="80" rx="20" transform="rotate(-180 180 80)" fill="#F2F2F2"/>
    <circle cx="140" cy="40" r="20" transform="rotate(-180 140 40)" fill="#69E485"/>
    {!isFinish&&<circle cx="140" cy="40" r="20" transform="rotate(-180 140 40)" fill="#4F4F4F" fillOpacity="0.75" />}
    <circle cx="40" cy="40" r="20" transform="rotate(-180 40 40)" fill="#FF7171"/>
    {isFinish&&<circle cx="40" cy="40" r="20" transform="rotate(-180 40 40)" fill="#4F4F4F" fillOpacity="0.75" />}
    </svg>)
    
}

const Piece = ({game, screen,src})=>{
    const style = {
        backgroundImage : `url(/images/exercises/29/${game}_${screen}${src}.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize:"cover",
        width:"100%",
        height:"100%"
    }
    return (
        <div style={style}></div>
    )
}

const JigsawComponent = ({game,setPhase})=>{
    const initItems = Array.from({length: 16}, (_, i) => i + 1)
    const [items, setItems] = useState(initItems);
    const [isFinish, setIsFinish] = useState(false)
  const { t } = useTranslation("jigsawComponent")

    const sortCards = ()=>{
        const shuffleItems = [...items]
        shuffleItems.sort( () => Math.random() - 0.5)
        setItems(shuffleItems)
    }

    useEffect(()=>{
        sortCards()
    },[])

    useEffect(()=>{
            let equal = true;
            for (let i = 0; i < initItems.length; i++) {
                if (initItems[i] !== items[i]) {
                    setIsFinish(false)
                    equal = false;
                    break;
                }
            }
            if (equal) {
                setIsFinish(true)
            } 
    },[items])

    function onChange(sourceId, sourceIndex, targetIndex, targetId) {
        if(!isFinish){
            const newState = [...items];
            if(targetIndex<16){
                [newState[sourceIndex],newState[targetIndex]] = [newState[targetIndex],newState[sourceIndex]]
            }
            setItems(newState);
        }
      }
    
      return (
        <>
        <div className={styles.gameContainer}>
            <div className={styles.jigsawContainer}>
                <GridContextProvider onChange={onChange}>
                    <GridDropZone
                    id="items"
                    boxesPerRow={4}
                    rowHeight={125}
                    style={{ height: "500px", width:"500px"}}
                    >
                    {items.map((item) => (
                        <GridItem key={item} className="griditemUI">
                        
                            <Piece game={game} screen={"Desktop"} src={item}/>
            
                        </GridItem>
                    ))}
                    </GridDropZone>
                </GridContextProvider>
            </div>
            <div>
                <TrafficLight isFinish={isFinish}/>
            </div>
        </div>
        {isFinish?<div><button onClick={()=>{setPhase("end")}}>{t("button")}</button></div>:<></>}
        </>
      );
}
export default JigsawComponent
