import '../../../styles/battery.css'

export default function Battery({text = "Novela escrita"}){

    return(
        <div className="battery">
            <div className="battery-text">
                <p>{text}</p>
            </div>
        </div>
    )
}