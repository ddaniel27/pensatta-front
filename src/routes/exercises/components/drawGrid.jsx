import { useRef, useEffect } from "react"
import { useTranslation } from 'react-i18next'
import "../../../styles/drawGrid.css"

export default function DrawGrid({sequence, initPos, endPos, start, correctSequence, returnScore, isFinished}) {

    const canvasRef = useRef(null)
    const objectiveRef = useRef(null)
  const { t } = useTranslation("drawGrid")


    function delay(n) {
        return new Promise(function (resolve) {
            setTimeout(resolve, n)
        })
    }

    function drawGrid(canvas, ctx){

        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.beginPath()
        ctx.strokeStyle = "#E0E0E0"
        ctx.lineWidth = 5
        for(let i = 0; i < canvas.width; i+=canvas.width/20){
            ctx.moveTo(i, 0)
            ctx.lineTo(i, canvas.height)
        }
        for(let i = 0; i < canvas.height; i+=canvas.height/20){
            ctx.moveTo(0, i)
            ctx.lineTo(canvas.width, i)
        }
        ctx.stroke()

        ctx.beginPath()
        ctx.fillStyle = "#000000"
        ctx.arc(initPos.x * canvas.width/20, initPos.y * canvas.height/20, 10, 0, 2*Math.PI)
        ctx.arc(endPos.x * canvas.width/20, endPos.y * canvas.height/20, 10, 0, 2*Math.PI)
        ctx.fill()
    }

    async function drawLine(canvas, ctx, sequencePath, userInput){

        let currentPos = {...initPos}
        currentPos.x = currentPos.x * canvas.width/20
        currentPos.y = currentPos.y * canvas.height/20
        
      const movementMap = {}
      movementMap[t("left")] = {x: -1, y: 0}
      movementMap[t("right")] = {x: 1, y: 0}
      movementMap[t("up")] = {x: 0, y: -1}
      movementMap[t("down")] = {x: 0, y: 1}


      const colorMap = {}
      colorMap[t("red")] = "#FF0000"
      colorMap[t("green")] = "#00FF00"
      colorMap[t("blue")] = "#0000FF"
      colorMap[t("yellow")] = "#FFFF00"

        const obj = {
            color: t("red"),
            direction: t("right"),
            action: "move"
        }


        ctx.beginPath()
        ctx.lineWidth = 5
        ctx.strokeStyle = "#FF0000"
        ctx.moveTo(currentPos.x, currentPos.y)

        for(const action of sequencePath){
            switch (action[0]) {
                case "move":
                    obj.direction = action[1]
                    obj.action = action[0]
                    await delay(1000)
                    break
                case "draw":
                    obj.direction = action[1]
                    obj.action = action[0]
                    await delay(1000)
                    break
                case "color":
                    obj.color = colorMap[action[1]]
                    ctx.strokeStyle = obj.color
                    await delay(1000)
                    break
                case "steps":
                    currentPos.x = currentPos.x + (movementMap[obj.direction].x * action[1]*canvas.width/20)
                    currentPos.y = currentPos.y + (movementMap[obj.direction].y * action[1]*canvas.height/20)
                    if(obj.action === "move"){
                        ctx.moveTo(currentPos.x, currentPos.y)
                    }else{
                        ctx.lineTo(currentPos.x, currentPos.y)
                        ctx.stroke()
                        ctx.moveTo(currentPos.x, currentPos.y)
                    }
                    await delay(1000)
                    break
            }
        }

        if(userInput){
            if(JSON.stringify(sequence) === JSON.stringify(correctSequence)){
                returnScore(1)
                await delay(1000)
                isFinished(true)
            }else{
                returnScore(0)
                await delay(1000)
                isFinished(true)
            }
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        const canvasObjective = objectiveRef.current
        const ctxObjective = canvasObjective.getContext("2d")

        drawGrid(canvas, ctx)
        drawGrid(canvasObjective, ctxObjective)

        drawLine(canvasObjective, ctxObjective, correctSequence)

        if(start){
            drawLine(canvas, ctx, sequence, true)
        }
    }, [start])

    return(
        <div className="maze">
            <canvas ref={canvasRef} id={"mazeId"} width={1000} height={1000}></canvas>
            <canvas ref={objectiveRef} id={"mazeId"} width={1000} height={1000}></canvas>
        </div>
    )

}
