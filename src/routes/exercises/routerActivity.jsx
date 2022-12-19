import Ex01 from "./ex01/ex01"
import Ex02 from "./ex02/ex02"
import Ex03 from "./ex03/ex03"
import Ex04 from "./ex04/ex04"
import Ex05 from "./ex05/ex05"
import Ex06 from "./ex06/ex06"
import Ex07 from "./ex07/ex07"
import Ex08 from "./ex08/ex08"
import Ex10 from "./ex10/ex10"
import Ex11 from "./ex11/ex11"
import Ex12 from "./ex12/ex12"
import Ex13 from "./ex13/ex13"
import Ex14 from "./ex14/ex14"
import Ex15 from "./ex15/ex15"
import Ex16 from "./ex16/ex16"
import Ex17 from "./ex17/ex17"
import Ex21 from "./ex21/ex21"
import Ex22 from "./ex22/ex22"
import Ex23 from "./ex23/ex23"
import Ex24 from "./ex24/ex24"
import Ex25 from "./ex25/ex25"
import Ex26 from "./ex26/ex26"
import Ex28 from "./ex28/ex28"
import Ex29 from "./ex29/ex29"
import Ex31 from "./ex31/ex31"
import Ex33 from "./ex33/ex33"
import Ex34 from "./ex34/ex34"
import Ex35 from "./ex35/ex35"
import Ex37 from "./ex37/ex37"
import Ex38 from "./ex38/ex38"
import Ex39 from "./ex39/ex39"
import Ex40 from "./ex40/ex40"
import Ex41 from "./ex41/ex41"
import Ex43 from "./ex43/ex43"
import Ex44 from "./ex44/ex44"
import Ex46 from "./ex46/ex46"
import Ex47 from "./ex47/ex47"
import Ex50 from "./ex50/ex50"
import Ex51 from "./ex51/ex51"
import Ex53 from "./ex53/ex53"
import Ex54 from "./ex54/ex54"
import Ex55 from "./ex55/ex55"
import Ex57 from "./ex57/ex57"
import Ex58 from "./ex58/ex58"
import Ex61 from "./ex61/ex61"
import Ex68 from "./ex68/ex68"
import Ex69 from "./ex69/ex69"
import Ex75 from "./ex75/ex75"
import Ex77 from "./ex77/ex77"
import Ex82 from "./ex82/ex82"
import Ex84 from "./ex84/ex84"
import Ex86 from "./ex86/ex86"
import Ex95 from "./ex95/ex95"
import Ex98 from "./ex98/ex98"
import Ex99 from "./ex99/ex99"
import Ex101 from "./ex101/ex101"
import Ex106 from "./ex106/ex106"
import Ex107 from "./ex107/ex107"
import ExTest from "./exTest/exTest"

export default function RouterActivity({ idExercise }){

    return (
        <> 
            {idExercise === 0 && <div>No es un id valido</div>}
            {idExercise === 1 && <Ex01 />}
            {idExercise === 2 && <Ex02 />}
            {idExercise === 3 && <Ex03 />}
            {idExercise === 4 && <Ex04 />}
            {idExercise === 5 && <Ex05 />}
            {idExercise === 6 && <Ex06 />}
            {idExercise === 7 && <Ex07 />}
            {idExercise === 8 && <Ex08 />}
            {idExercise === 10 && <Ex10 />}
            {idExercise === 11 && <Ex11 />}
            {idExercise === 12 && <Ex12 />}
            {idExercise === 13 && <Ex13 />}
            {idExercise === 14 && <Ex14 />}
            {idExercise === 15 && <Ex15 />}
            {idExercise === 16 && <Ex16 />}
            {idExercise === 17 && <Ex17 />}
            {idExercise === 21 && <Ex21 />}
            {idExercise === 22 && <Ex22 />}
            {idExercise === 23 && <Ex23 />}
            {idExercise === 24 && <Ex24 />}
            {idExercise === 25 && <Ex25 />}
            {idExercise === 26 && <Ex26 />}
            {idExercise === 28 && <Ex28 />}
            {idExercise === 29 && <Ex29 />}
            {idExercise === 31 && <Ex31 />}
            {idExercise === 33 && <Ex33 />}
            {idExercise === 34 && <Ex34 />}
            {idExercise === 35 && <Ex35 />}
            {idExercise === 37 && <Ex37 />}
            {idExercise === 38 && <Ex38 />}
            {idExercise === 39 && <Ex39 />}
            {idExercise === 40 && <Ex40 />}
            {idExercise === 41 && <Ex41 />}
            {idExercise === 43 && <Ex43 />}
            {idExercise === 44 && <Ex44 />}
            {idExercise === 46 && <Ex46 />}
            {idExercise === 47 && <Ex47 />}
            {idExercise === 50 && <Ex50 />}
            {idExercise === 51 && <Ex51 />}
            {idExercise === 53 && <Ex53 />}
            {idExercise === 54 && <Ex54 />}
            {idExercise === 55 && <Ex55 />}
            {idExercise === 57 && <Ex57 />}
            {idExercise === 58 && <Ex58 />}
            {idExercise === 61 && <Ex61 />}
            {idExercise === 68 && <Ex68 />}
            {idExercise === 69 && <Ex69 />}
            {idExercise === 75 && <Ex75 />}
            {idExercise === 77 && <Ex77 />}
            {idExercise === 82 && <Ex82 />}
            {idExercise === 84 && <Ex84 />}
            {idExercise === 86 && <Ex86 />}
            {idExercise === 95 && <Ex95 />}
            {idExercise === 98 && <Ex98 />}
            {idExercise === 99 && <Ex99 />}
            {idExercise === 101 && <Ex101 />}
            {idExercise === 106 && <Ex106 />}
            {idExercise === 107 && <Ex107 />}
            {idExercise === "test" && <ExTest />}
        </>
    )
}