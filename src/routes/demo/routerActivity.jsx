import Ex12 from "./exercises/ex12/ex12"
import Ex03 from "./exercises/ex03/ex03"
import Ex10 from "./exercises/ex10/ex10"
import Ex16 from "./exercises/ex16/ex16"
import Ex34 from "./exercises/ex34/ex34"
import Ex41 from "./exercises/ex41/ex41"
export default function RouterActivity({ idExercise }){

    return (
        <> 
            {idExercise === 0 && <div>No es un id valido</div>}
            {idExercise === 12 && <Ex12 />}
            {idExercise === 3 && <Ex03 />}
            {idExercise === 10 && <Ex10 />}
            {idExercise === 16 && <Ex16 />}
            {idExercise === 34 && <Ex34 />}
            {idExercise === 41 && <Ex41 />}
        </>
    )
}