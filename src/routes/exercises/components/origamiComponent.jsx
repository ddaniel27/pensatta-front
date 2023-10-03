import { useState } from "react";
import { useTranslation } from 'react-i18next'
import styles from "../../../styles/origami.module.css"
import {
    GridContextProvider,
    GridDropZone,
    GridItem
  } from "react-grid-dnd";
import { useEffect } from "react";

const ImageUpload = ({setIsFinish}) => {
  const { t } = useTranslation("origamiComponent")
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    
    const handleImageChange = e => {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setIsFinish(true);
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      // aqui puedes enviar el archivo image al servidor
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} name="file" id="file" className={styles.inputFile} />
        <label htmlFor="file">{t("attatch")}</label>
      </form>
    );
  };
  

const Card = ({opt,cl,pos,isFinish,isCorrect})=>{
    const style = {
        backgroundImage: !isFinish || pos == 0?`url(${opt.link}.svg)`:`url(${opt.link}R.svg)`
    }
    return(
        <>
        {pos == 1 &&
            <div className={`${styles.cardSecondaryContainer} ${!isFinish?"":(isCorrect?styles.cardSecondaryTrue:styles.cardSecondaryFalse)}`}>
                <div className={styles[cl]}style={style}></div>
            </div>
        }
        {
            pos== 0 && <div className={styles[cl]}style={style}></div>
        }
        </>
    )
}

const JigsawOrigami = ({data,isFinish,setScore,dimensions})=>{
    const [items, setItems] = useState(data)
    const [corrects, setCorrects] = useState(data.map(d => ({id: d.id, isCorrect:null })))
    const [checkTrigger, setCheckTrigger] = useState(isFinish)

    const sortCards = ()=>{
        const shuffleItems = [...items]
        shuffleItems.sort( () => Math.random() - 0.5)
        setItems(shuffleItems)
    }

    useEffect(()=>{
        sortCards()
    },[])

    useEffect(()=>{
        setScore(corrects.filter(c => c.isCorrect).length == corrects.length ? 1 : 0)
    },[checkTrigger])

    useEffect(()=>{
            
                setCorrects( items.map(
                   (item,index )=> ({
                    id: item.id,
                    isCorrect: item.id-1 == index
                   })            
                ))
            
    },[items])

    function onChange(sourceId, sourceIndex, targetIndex, targetId) {
        if(!isFinish){
            const newState = [...items];
            if(targetIndex<items.length){
                [newState[sourceIndex],newState[targetIndex]] = [newState[targetIndex],newState[sourceIndex]]
            }
            setItems(newState);
        }
      }

    return(
        <GridContextProvider onChange={onChange}>
                    <GridDropZone
                    id="items"
                    boxesPerRow={dimensions.columns}
                    rowHeight={dimensions.sizeH}
                    style={{ height: `${dimensions.rows*dimensions.sizeH}px`, width:`${dimensions.columns*dimensions.sizeW}px`}}
                    >
                    {items.map((item) => (
                        <GridItem key={item.id} className={`griditemUI ${styles.gridItemOwn}` }>
                        
                            <Card opt={item} cl={"secondary-card"} pos={1} isFinish={isFinish} isCorrect={corrects.find(i =>item.id == i.id).isCorrect}/>
            
                        </GridItem>
                    ))}
                    </GridDropZone>
        </GridContextProvider>
    )
}

const OrigamiComponent = ({data,setPhase,setScore})=>{
    const[isFinish,setIsFinish] = useState(false)
  const { t } = useTranslation("origamiComponent")

    const handleResponder = ()=>{
        setIsFinish(true)
    }
    return(
        <>           
            <div className={styles.gameOrigamiContainer}>
                <div className={styles["primary-origami-container"]}>
                    <Card opt={data.primary} cl={"primary-card"} pos={0}/>
                </div>
                <div className={styles["secondaries-origami-container"]}>
                    <JigsawOrigami data={data.secondaries} isFinish={isFinish} setScore={setScore} dimensions={data.dimensions}/>
                </div>
            </div>
            {!isFinish&&<button onClick={handleResponder}>{t("answer-button")}</button>}
            {isFinish&&<button onClick={()=>setPhase("end")}>{t("next-button")}</button>}
        </>
    )
}
export default OrigamiComponent
