import React from 'react'

export default function PixelPaint({loadMatrix, size, setCurrMatrix}){

    const canvasRef = React.useRef(null)
    
    const [matrix, setMatrix] = React.useState(loadMatrix)


    const handleClick = (e) => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const pos = {x: Math.floor(x/canvas.width*8), y: Math.floor(y/canvas.height*8)}

        ctx.beginPath()
        ctx.fillStyle = matrix[pos.x][pos.y] === 0 ? "#000000" : "#FFFFFF"
        ctx.fillRect(pos.x*canvas.width/8, pos.y*canvas.height/8, canvas.width/8, canvas.height/8)
        setMatrix(matrix.map((row, i) => {
            return row.map((cell, j) => {
                if(i === pos.x && j === pos.y){
                    return matrix[pos.x][pos.y] === 0 ? 1 : 0
                }
                return cell
            })
        }))

    }

    function drawGrid(canvas, ctx, numCells = 20){

        ctx.fillStyle = "#FFFFFF"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    
        ctx.beginPath()
        ctx.strokeStyle = "#E0E0E0"
        ctx.lineWidth = 1
        for(let i = 0; i < canvas.width; i+=canvas.width/numCells){
            ctx.moveTo(i, 0)
            ctx.lineTo(i, canvas.height)
        }
        for(let i = 0; i < canvas.height; i+=canvas.height/numCells){
            ctx.moveTo(0, i)
            ctx.lineTo(canvas.width, i)
        }
        ctx.stroke()
    }

    React.useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        drawGrid(canvas, ctx, 8)
    }, [])

    React.useEffect(()=>{
        if(setCurrMatrix){
            setCurrMatrix(matrix)
        }
    }, [matrix])

    return <canvas ref={canvasRef} onClick={handleClick} height={size} width={size}/>

}