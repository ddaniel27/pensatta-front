import React from "react"

function PickerComponent({matrix, recorridoMain, imgPath, collectPath, pos=[1,1], start, isFinished, setScore, piecesCounter, reset }){
    const canvasRef = React.useRef(null)
    const imgRef = React.useRef(null)
    const collectPathRef = React.useRef(null)
    const [imgLoaded, setImgLoaded] = React.useState(false)
    const [collectPathLoaded, setCollectPathLoaded] = React.useState(false)
    const [initLoaded, setInitLoaded] = React.useState(false)

    const posRef = React.useRef([...pos])
    const matrixRef = React.useRef(JSON.parse(JSON.stringify(matrix)))

    function drawMaze(ctx,canvas,collectImg){
        const hashMap = {
            "0": "#FFFFFF",
            "1": "#FFFFFF",
            "2": "#00FFAA",
            "3": "#FFFFFF",
            "4": "#00FFFF"
        }

        ctx.fillStyle = "#EAEDE1"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        for(let i = 0; i < matrixRef.current.length; i++){
            for(let j = 0; j < matrixRef.current[i].length; j++){
                ctx.fillStyle = hashMap[matrixRef.current[i][j]]
                if(matrixRef.current[i][j] === 2){
                    ctx.fillRect(j*canvas.width/7 + 2, i*canvas.width/7 + 2, canvas.width/7 - 4, canvas.height/7 - 4)
                }else if(matrixRef.current[i][j] === 3){
                    ctx.fillRect(j*canvas.width/7 + 5, i*canvas.width/7 + 5, canvas.width/7 - 10, canvas.height/7 - 10)
                    ctx.drawImage(collectImg, j*canvas.width/7 + 5, i*canvas.height/7 + 5, canvas.width/7 - 10, canvas.width/7 - 10)
                }else{
                    ctx.fillRect(j*canvas.width/7 + 5, i*canvas.width/7 + 5, canvas.width/7 - 10, canvas.height/7 - 10)
                }
            }
        }
    }

    function nextMove(ctx, canvas, recorrido, cb, img, collectImg){
  
        const recorridoMap = {
          "arriba": [-1,0],
          "abajo": [1,0],
          "izquierda": [0,-1],
          "derecha": [0,1]
        }
        
    return new Promise((resolve, reject)=>{
            let i = 0
            let [m,n] = [0,0]
            let counter = piecesCounter
            
          const newInter = setInterval(()=>{
            if(matrixRef.current[posRef.current[0]][posRef.current[1]] === 3){
                matrixRef.current[posRef.current[0]][posRef.current[1]] = 1
                --counter
                if(counter === 0){
                    clearInterval(newInter)
                    resolve("Done")
                }

            }else if(matrixRef.current[posRef.current[0]][posRef.current[1]] !== 1){
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
            cb(ctx, canvas, collectImg)
            ctx.drawImage(img, posRef.current[1]*canvas.width/7 + 5, posRef.current[0]*canvas.height/7 + 5, canvas.width/7 - 10, canvas.width/7 - 10)
          },300)
    })
          
    }

    function delay(n) {
        return new Promise(function (resolve) {
            setTimeout(resolve, n)
        })
    }

    async function startGame(context, canvas, colImg, image){
        drawMaze(context, canvas, colImg)
        await delay(1000)
        context.drawImage(image, posRef.current[1]*canvas.width/7 + 5, posRef.current[0]*canvas.height/7 + 5, canvas.width/7 - 10, canvas.width/7 - 10)
    }

    React.useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        const image = imgRef.current
        const colImg = collectPathRef.current
        
        if(imgLoaded && collectPathLoaded && !initLoaded){ startGame(context, canvas, colImg, image); setInitLoaded(true)}

        async function test(){
            try{
                const result = await nextMove(context, canvas, recorridoMain, drawMaze, image, colImg)
                if(result === "Done"){
                    setScore(1)
                    setTimeout(()=>{
                        isFinished(true)
                    },1500)
                }
            }catch(e){
                setScore(0)
                setTimeout(()=>{
                    isFinished(true)
                },1500)
            }
        }
        if(start && recorridoMain.length > 0){
            test()
        }
        if(!start){
            matrixRef.current = JSON.parse(JSON.stringify(matrix))
            posRef.current = [...pos]
            startGame(context, canvas, colImg, image)
        }
        
        return()=>{
            // posRef.current = initPos.current
            // Get a reference to the last interval + 1
            const interval_id = setInterval(function(){}, Number.MAX_SAFE_INTEGER);

            // Clear any timeout/interval up to that id
            for (let i = 1; i < interval_id; i++) {
            clearInterval(i)
            }
        }

    }, [start, recorridoMain, collectPathLoaded, imgLoaded])

    return(
        <div className="maze">
            {!collectPathLoaded && !imgLoaded && <div className="spinner-3"/>}
            <canvas style={(collectPathLoaded && imgLoaded) ? {} : { display: 'none' }} ref={canvasRef} id={"mazeId"} width={1000} height={1000}></canvas>
            <img ref={collectPathRef} src={collectPath} alt="collect-source" id="mancha" onLoad={()=>{setCollectPathLoaded(true)}} hidden/>
            <img ref={imgRef} src={imgPath} alt="img-source" id="cleaner" onLoad={()=>{setImgLoaded(true)}} hidden/>
        </div>
    )
}


export default React.memo(PickerComponent)