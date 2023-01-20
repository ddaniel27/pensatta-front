import { useState } from "react";
import styles from "../../../styles/origami.module.css"

const ImageUpload = ({setIsFinish}) => {
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
        <label for="file">ADJUNTAR</label>
      </form>
    );
  };
  

const Card = ({opt,cl})=>{
    const style = {
        backgroundImage: `url(${opt.link})`
    }
    return(
        <div className={styles[cl]}style={style}></div>
    )
}

const OrigamiComponent = ({data,setPhase})=>{
    const[isFinish,setIsFinish] = useState(false)
    return(
        <>
            
            <div className={styles.gameOrigamiContainer}>
                <div className={styles["primary-origami-container"]}>
                    <Card opt={data.primary} cl={"primary-card"}/>
                </div>
                <div className={styles["secondaries-origami-container"]}>
                    {data.secondaries.map(opt=>{
                        return <Card opt={opt} cl={"secondary-card"}/>
                    })}
                </div>
            </div>
            {!isFinish&&<ImageUpload setIsFinish={setIsFinish}/>}
            {isFinish&&<button onClick={()=>setPhase("end")}>SIGUIENTE</button>}
        </>
    )
}
export default OrigamiComponent