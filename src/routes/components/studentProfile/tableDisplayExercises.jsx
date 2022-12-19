import '../../../styles/tableDisplayExercises.css';

export default function TableDisplayExercises({registers, headers_titles=['Ejercicios', 'Tiempo', 'Puntos'], resumen=false} ) {
    return(
        <div className="table-display-exercises">
            <div className={`table-display-exercises-headers ${resumen ? 'table-custom-style-resumen':'table-custom-style'} `}>
                {
                    headers_titles.map((header, index) => (
                        <p key={index}>{header}</p>
                    ))
                }
            </div>
            <div className="table-display-exercises-rows">
                {registers.map((register,idx) => {
                    const colorsMap = {
                        'green': '#82C993',
                        'yellow': '#EDCA71',
                        'red': '#F87777'
                    }
                    const color = register?.score >= 80 ? 'green' : 
				                  register?.score >= 60 ? 'yellow' : 'red'
                    return(
                        <div 
            			  className={`table-display-exercises-row ${resumen ? 'table-custom-style-resumen':'table-custom-style'}`}
            			  key={idx} 
            			  style={{backgroundColor:colorsMap[color]}}
            			>
                            <p>{register?.exercise_id}</p>
                            <p>{register?.time}</p>
                            <p>{register?.score}</p>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}
