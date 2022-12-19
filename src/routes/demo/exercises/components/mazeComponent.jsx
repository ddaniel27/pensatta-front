import React from "react"

function MazeComponent({matrix, recorridoMain, imgPath, pos=[1,1], start, isFinished, setScore, setLoaded}){
    const canvasRef = React.useRef(null)
    const imgRef = React.useRef(null)
    const posRef = React.useRef([...pos])
    // const initPos = React.useRef(pos)

    function drawMaze(ctx,canvas){
        const hashMap = {
            "0": "#FFFFFF",
            "1": "#00635D",
            "2": "#00FFAA",
            "3": "#30DCFF",
            "4": "#00FFFF"
        }
        
        ctx.fillStyle = "#008E86"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        for(let i = 0; i < matrix.length; i++){
            for(let j = 0; j < matrix[i].length; j++){
            ctx.fillStyle = hashMap[matrix[i][j]]
            if(matrix[i][j] === 2){
                ctx.fillRect(j*canvas.width/7 + 2, i*canvas.width/7 + 2, canvas.width/7 - 4, canvas.height/7 - 4)
            }else{
                ctx.fillRect(j*canvas.width/7 + 5, i*canvas.width/7 + 5, canvas.width/7 - 10, canvas.height/7 - 10)
            }
            }
        }
    }

    function nextMove(ctx, canvas, recorrido, cb, img){
  
        const recorridoMap = {
          "arriba": [-1,0],
          "abajo": [1,0],
          "izquierda": [0,-1],
          "derecha": [0,1]
        }
        
    return new Promise((resolve, reject)=>{
            let i = 0
            let [m,n] = [0,0]
            
          const newInter = setInterval(()=>{
            if(matrix[posRef.current[0]][posRef.current[1]] === 3){
                resolve("Done")
                clearInterval(newInter)
            }else if(matrix[posRef.current[0]][posRef.current[1]] !== 1){
                clearInterval(newInter)
                reject("Error")
            }else if(i > recorrido.length){
                clearInterval(newInter)
                reject("Error")
            }else if( m !== 0){
                posRef.current[0] += m/Math.abs(m)
                m -= m/Math.abs(m)
            }else if( n !== 0){
                posRef.current[1] += n/Math.abs(n)
                n -= n/Math.abs(n)
            }else{
                try{
                    [m, n] = recorridoMap[recorrido[i][0]].map(curr => curr*recorrido[i][1])
                    ++i
                }catch(e){
                    console.log(e)
                    clearInterval(newInter)
                    reject("Error")
                }
            }
            cb(ctx, canvas)
            ctx.drawImage(img, posRef.current[1]*canvas.width/7 + 5, posRef.current[0]*canvas.height/7 + 5, canvas.width/7 - 10, canvas.width/7 - 10)
          },600)
    })
          
    }

    React.useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        const image = imgRef.current
        drawMaze(context, canvas)
        context.drawImage(image, posRef.current[1]*canvas.width/7 + 5, posRef.current[0]*canvas.height/7 + 5, canvas.width/7 - 10, canvas.width/7 - 10)
        async function test(){
            try{
                setScore(0)
                const result = await nextMove(context, canvas, recorridoMain, drawMaze, image)
                if(result === "Done"){
                    setScore(1)
                    // posRef.current = initPos.current
                    setTimeout(()=>{
                        isFinished("end")
                    },3000)
                }
            }catch(e){
                setScore(0)
            }
        }
        if(start && recorridoMain.length > 0){
            test()
        }
        if(!start){
            posRef.current = [...pos]
        }
        
        return()=>{
            const interval_id = setInterval(function(){}, Number.MAX_SAFE_INTEGER);
            for (let i = 1; i < interval_id; i++) {
                clearInterval(i)
            }
        }

    }, [start, recorridoMain])


    const onLoadImg = () => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.drawImage(imgRef.current, posRef.current[1]*canvas.width/7 + 5, posRef.current[0]*canvas.height/7 + 5, canvas.width/7 - 10, canvas.width/7 - 10)

    }
    

    return(
        <div className="maze">
            <canvas ref={canvasRef} id={"mazeId"} width={1000} height={1000}></canvas>
            <img ref={imgRef} src={imgPath} alt="img-source" onLoad={onLoadImg} hidden/>
        </div>
    )
}


export default React.memo(MazeComponent)