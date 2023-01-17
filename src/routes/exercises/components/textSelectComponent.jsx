import { useEffect,useState } from "react";
import Select from "react-select";
import styles from "../../../styles/textSelect.module.css"

const TextSelectComponent = ({text,options})=>{
    const [answers, setAnswers] = useState(options.map(option=>({value:option.value, answer:null, isCorrect:false})))
    const [allAnswered, setAllAnswered] = useState(false)
    const [isFinish, setIsFinish] = useState(false)

    const handleChange = (event,index)=>{
        const newAnswers = answers.map(
            ans =>{
                if(ans.value == index){
                    return {...ans, answer:event.value}
                }
                return ans
            }
        )
        setAnswers(newAnswers)
        console.log(event)
        console.log(index)
        if(index==event.value){
            console.log("correcta")
        }
    }

    useEffect(()=>{
        if(answers.filter((obj) => obj.answer != null).length >= options.length){
            console.log("todo ha sido respondido")
            setAllAnswered(true)
        }
        console.log(answers)
    },[answers])

    const handleResponder = ()=>{
            setIsFinish(true)
            const newAnswers = answers.map(
                ans =>{
                    if(ans.value == ans.answer){
                        return {...ans, isCorrect:true}
                    }
                    return ans
                }
            )
            setAnswers(newAnswers)
        }
    

    return(
        <>
            <div>
            {
                text.map((str,index) =>{
                    return str == "%INSERTTEXT%" ? <div className={styles.selects}> <Select key={index} options={options} onChange={(e)=>handleChange(e,index)} defaultValue={{label:"-", value:"empty"}}
                    styles={{
                        singleValue: (base) => ({
                          ...base,
                          padding: 5,
                          borderRadius: 5,
                          background: !isFinish? "#F2F2F2":answers.find(ans=>ans.value==index).isCorrect?'#69E485':'#FF7171',                
                          display: 'flex',
                        }),
                      }}
                      components={!isFinish?null:
                                            {
                                                Menu: () => null,
                                                MenuList: () => null,
                                                DropdownIndicator: () => null,
                                                IndicatorSeparator: () => null
                                            }
                        }/> </div>: str
                })
            }
            </div>
            {allAnswered&&!isFinish && <button onClick={handleResponder}>RESPONDER</button>}
            {isFinish && <button>SIGUIENTE</button>}
        </>
    )

}
export default TextSelectComponent