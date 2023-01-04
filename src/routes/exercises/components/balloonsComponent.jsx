import React,{useEffect, useState} from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "../../../styles/balloon.css"



const BalloonSVG = ({color,text,id,position,nameClass}) => {
    

    
    return (
        
           
             <g className={nameClass} transform={`translate(${position.x - 100},${position.y})`} id={`balloon-${id}`}>
            <circle  cx="40" cy="40" r="40" fill={color}/>
            <text x="9%" y="9%" textAnchor="middle" fill="#333333" fontSize="80%" fontFamily="Montserrat" dy=".3em" fontWeight="bold">{text}</text>
            <path d="M32.4853 83.7254L39.8462 70.1538L48.115 83.2462C49.3556 85.2104 47.9889 87.7786 45.6668 87.8469L35.2106 88.1544C32.8985 88.2224 31.3825 85.7587 32.4853 83.7254Z" fill={color}/>
            <path d="M39.9773 80C48.8474 99.3939 45.1915 108.284 35.0834 122.727C19.1783 145.455 45.7887 168.485 44.5652 180" stroke="#F2F2F2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M40.2671 80.2406C33.4978 75.0098 22.1131 79.9329 24.2669 84.856C26.4208 89.7791 35.9593 87.3175 40.2671 80.2406Z" stroke="#F2F2F2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M39.9592 80.5483C47.551 75.0576 58.3748 82.4575 55.9593 87.6252C53.5437 92.7929 44.7903 87.9769 39.9592 80.5483Z" stroke="#F2F2F2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
           
            
            
          
       
    
        

    )

}

const BalloonsComponent = ({data,setPhase,setScore})=>{
    const [balloons, setBalloons] = useState(data.balloons)
    const [positions, setPositions] = useState(data.positions)
    const [corrects, setCorrects] = useState(data.isSo)
    const [colors, setColors] = useState(balloons.map( (balloon)=>({id: balloon.id, color:"#3FDFE9"})))
    const [isFinish, setIsFinish] = useState(false)
    const [sco, setSco] = useState(0)

    const collisionDetection = (r1, r2) => (
      !(r2.left > r1.right || 
        r2.right < r1.left || 
        r2.top > r1.bottom ||
        r2.bottom < r1.top)
  )

    const getBalloonsFinalPositions = ()=>{
        setIsFinish(true);
        const finalPositions = balloons.map((balloon)=>{
              const rectBalloon = document.getElementById(`balloon-${balloon.id}`).getBoundingClientRect()              
              return  {id: balloon.id, position: rectBalloon}
        })
        const rectOS = document.getElementById("rect-os").getBoundingClientRect()

        const collisions = finalPositions.map((rect)=>{
            return {id:rect.id, position: collisionDetection(rect.position, rectOS)}
        })
        let score = 0;
        const finalColors = balloons.map(
            (balloon)=>{
              
              if(corrects.includes(balloon.id)){ 
                if(collisions.find(x=> x.id==balloon.id).position){
                  score+=1
                }
                return {id:balloon.id, color:"#69E485"}}
              if(collisions.find(x=> x.id==balloon.id).position){
                score-=1
                return {id:balloon.id, color:"#FF7171"}
              }
              
              return {id:balloon.id, color:"#BDBDBD"}

            }
        )
        setColors(finalColors)
        if(score > 0){
          setSco(score)          
        }
        
    }
    

    function makeDraggable(evt) {
        var svg = evt.target;
        
        
        svg.onmousedown=startDrag;
        svg.onmousemove=drag;
        svg.onmouseup= endDrag;
        svg.onmouseleave = endDrag;
        //svg.addEventListener('touchstart', startDrag);
        //svg.addEventListener('touchmove', drag);
        //svg.addEventListener('touchend', endDrag);
        //svg.addEventListener('touchleave', endDrag);
        //svg.addEventListener('touchcancel', endDrag);

        function getMousePosition(evt) {
          var CTM = svg.getScreenCTM();
          if (evt.touches) { evt = evt.touches[0]; }
          return {
            x: (evt.clientX - CTM.e) / CTM.a,
            y: (evt.clientY - CTM.f) / CTM.d
          };
        }

        var selectedElement, offset, transform;

        function initialiseDragging(evt) {
            offset = getMousePosition(evt);

            // Make sure the first transform on the element is a translate transform
            var transforms = selectedElement.transform.baseVal;

            if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
              // Create an transform that translates by (0, 0)
              var translate = svg.createSVGTransform();
              translate.setTranslate(0, 0);
              selectedElement.transform.baseVal.insertItemBefore(translate, 0);
            }

            // Get initial translation
            transform = transforms.getItem(0);
            offset.x -= transform.matrix.e;
            offset.y -= transform.matrix.f;
        }

        function startDrag(evt) {
          
          if (evt.target.classList.contains('draggable')) {
            selectedElement = evt.target;
            initialiseDragging(evt);
          } else if (evt.target.parentNode.classList.contains('draggable-group')) {
            selectedElement = evt.target.parentNode;
            initialiseDragging(evt);
          }
        }

        function drag(evt) {
            
          if (selectedElement) {
            evt.preventDefault();
            var coord = getMousePosition(evt);
            transform.setTranslate(coord.x - offset.x, coord.y - offset.y);

            
          }
        }

        function endDrag(evt) {
          selectedElement = false;
                   
        }
      }
    

    return(
      <>
        <div>
          <svg className="svg-game" onClick={makeDraggable} viewBox="0 0 450 450" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(480.04, 30.9686)" id="rect-os">        
                <rect width="340" height="400" rx="20" fill="#333333"/>
                <text x="38%" y="9%" textAnchor="middle" fill="#E0E0E0" fontSize="90%" fontFamily="Montserrat" dy=".3em" fontWeight="bold">Sistemas Operativos</text>
              </g>
              {
                  balloons.map((balloon,index)=>{return <BalloonSVG text = {balloon.text} color = {colors.find(x => x.id == balloon.id).color} id={balloon.id} position={positions[index]} nameClass={!isFinish ? "draggable-group": "non-dragable-group"}/>})
              }
          </svg>
        </div>
        <div className="buttonsContainer">
        {
          !isFinish? <button id="buttonFinish" onClick={getBalloonsFinalPositions}>FINALIZAR</button>: 
                      <button id="buttonFinish" onClick={()=>{  setPhase("end")
                                              setScore(sco)}}>SIGUIENTE</button>
        }
        </div>
        </>     
    
    )
}

export default BalloonsComponent