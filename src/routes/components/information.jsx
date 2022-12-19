import '../../styles/information.css'

export default function Information({ messages }){
    return(
        <div className="information">
            <img src='./images/Katty 1.svg' alt="Katty" />
            <div className="messages">
                {
                    messages.map((message,index) => {
                        return(
                            <div className="message" key={index}>
                                <p>{message}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}