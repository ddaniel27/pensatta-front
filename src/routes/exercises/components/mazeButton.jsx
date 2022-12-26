import React, {useEffect, useState} from "react";
import styles from "../../../styles/mazeButton.module.css"

const MazeButton = ({onMouseDown, onMouseUp, onMouseLeave,direction})=>{
    let icon
    if(direction==="right"){
        icon =  <span className={styles.iconR}></span>
    } 
    
    if(direction==="left"){
        icon =  <span className={styles.iconL}></span>
    }     
    if(direction==="up"){
        icon =  <span className={styles.iconU}></span>
    }
    if(direction=="down"){
        icon =  <span className={styles.iconD}></span>
    }

    return(
        <div className={styles.box} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave}> 
            {icon}
        </div>
    )

}

export default MazeButton