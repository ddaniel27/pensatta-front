import React from "react"
import data from "../../exercisesList.json"
import "../../styles/selectExercise.css"

export default function SelectExercise({setId, disableButton}){
    
    const [exercises] = React.useState(data.exercisesIds)
    React.useEffect(()=>{
        setId(0)
        disableButton(true)
    },[setId, disableButton])

    const handleChange = ({target}) => {
        if(setId && disableButton){
            setId(target.value === "test" ? "test" : Number(target.value))
            disableButton(false)
        }
    }

    return(
        <div className="exercise-selector-area">
            <select defaultValue={0} onChange={handleChange}>
                <option value="0" hidden disabled>Select an exercise</option>
                {
                    exercises.map((exercise, index) => (
                        <option key={index} value={exercise}> Ejercicio {exercise}</option>
                    ))
                }
            </select>
        </div>
    )
}