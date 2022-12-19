import "../../../styles/avatarCreator.css"

export default function AvatarCreator({ body=0, eyes=0, glass=0, acc1=0, acc2=0 }){



    return(
        <div className="avatar-container">
            <img src={`./images/exercises/43/body/${body > 7 ? 7: body}.png`} alt="body" className="body"/>
            <img src={`./images/exercises/43/eyes/${eyes > 5 ? 5 : eyes}.png`} alt="eyes" className="eyes"/>
            <img src={`./images/exercises/43/glass/${glass > 3 ? 3 : glass}.png`} alt="glass" className="glass"/>
            <img src={`./images/exercises/43/acc1/${acc1 > 4 ? 4 : acc1}.png`} alt="acc1" className="acc1"/>
            <img src={`./images/exercises/43/acc2/${acc2 > 3 ? 3 : acc2}.png`} alt="acc2" className="acc2"/>
        </div>
    )

}