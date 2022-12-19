import React from "react"
import NoScoringComponent from "../components/noScoringComponent"
import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib'
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css'
import data from "./data.json"
import "../../../styles/ex29.css"

export default function Ex29(){

    // eslint-disable-next-line no-unused-vars
    const [ myData, setMyData ] = React.useState({
        ...data,
        imgSrc: data.imgSrc.sort(() => 0.5 - Math.random()).slice(0, 1)[0]
    })

    function delay(n) {
        return new Promise(function (resolve) {
            setTimeout(resolve, n)
        })
    }

    return(
        <NoScoringComponent initMessages={myData.initMessages} background={myData.color} title={myData.name}>
            {
                (setPhase) => (
                    <div className="jigsaw-ex29">
                    {
                        myData.imgSrc && (
                            <JigsawPuzzle
                                imageSrc={myData.imgSrc}
                                rows={4}
                                columns={4}
                                onSolved={async () => {await delay(3500);setPhase("end")}}
                            />
                        )
                    }
                    </div>
                )
            }
        </NoScoringComponent>
    )
}