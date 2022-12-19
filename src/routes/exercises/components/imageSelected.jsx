import "../../../styles/imageSelected.css"

export default function ImageSelected({img, hasBackground=true}){
    return <p className={`image-selected ${hasBackground && 'show-background'}`} style={{backgroundImage:img ? `url(${img})`:'', backgroundColor: img ? null: "#E0E0E0"}}></p>
}