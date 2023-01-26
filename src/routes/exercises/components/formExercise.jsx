import { useState, useEffect } from "react";
import Select from "react-select"
import styles from "../../../styles/formExercise.module.css"

const FormExercise = ({inputs,setPhase})=>{

	const [inputsState, setInputsState] = useState([])
	const [answers, setAnswers] = useState(inputs.map(i => ({id:i.id, ans:"", isAnswer:false})))
	const [isAllAnswered, setAllAnswered] = useState(false)
	const customStyle = {
		singleValue: (base) => ({
			...base,
			borderRadius: 10,
			background: "#F2F2F2",                
			display: 'flex',
			color:'#008E86',
			padding:0,
			fontWeight:"bold"

			}),
		menu: (provided, state) => ({
			...provided,
			backgroundColor: '#F2F2F2',
			zIndex:30,
			color:'#008E86',
			fontWeight:"bold"
		}),
		control: (provided) => ({
			...provided,
			border: 'none',
			borderRadius: 30,
			background: '#F2F2F2',
			height:40,
			padding:"0 20px"
		}),
		indicatorSeparator: (provided) => ({
			...provided,
			display: 'none'
		}),
		valueContainer: (provided) => ({
			...provided,
			height:40
		})
			

	}

	const handleChangeSelect = (event,id)=>{
			setAnswers(prev=>prev.map(a=>{
				console.log(a)
				if(a.id == id){
					return {id:a.id, ans:event.label, isAnswer:true}
				}
				return a
			}))
	}
	const handleChange = (event)=>{
		setAnswers(prev=>prev.map(a=>{
			if(a.id == event.target.id){
				if(event.target.value != ""){
					return {id:a.id, ans:event.target.value, isAnswer:true}
				}else{
					return {id:a.id, ans:event.target.value, isAnswer:false}
				}
			}
			return a
		}))
}
useEffect(()=>{
	setAllAnswered(answers.filter(a=>a.isAnswer == true).length == answers.length)
},[answers])

	return(
			<div className={styles.gameContainer}>
				<div className={styles["login-form-exercise"]}>
					<div className={styles["login-exercise"]}>
							<form>
							{inputs.map((element,index) =>{
											return (<div key={index}>
																	<label>
																		{element.placeholder}
																		{element.tag=="select"?
																													<Select options={element.options} 
																																	onChange={(e)=>handleChangeSelect(e,element.id)}
																																	styles={customStyle}/>:
																													<input  id={element.id}
																																	type={element.type}
																																	name={element.name} 
																																	placeholder={element.placeholder} 
																																	onChange={handleChange}/>}
																	</label>
															</div>
									)})}
							</form>
					</div>
					<div className={styles["buttons-login-exercise"]}>
							<button className={styles["solid-button-exercise"]} disabled={!isAllAnswered} onClick={()=>setPhase("end")}>FINALIZAR</button>
					</div>
			</div>
			</div>
	)

}
export default FormExercise