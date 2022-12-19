import React from "react"
import EditorModal from "./editorModal"
import NewInstModal from "./newInstModal"
import "../../styles/institutionScreen.css"

export default function InstitutionScreen({institutionList}){

    const [currInst, setCurrInst] = React.useState(null)
    const [showModal, setShowModal] = React.useState(false)
    const [showAddModal, setShowAddModal] = React.useState(false)
    const [data, setData] = React.useState({ institution: "", field: "" })

    const handleChange = ({target}) => {
        if(target.checked){
            setCurrInst(target.value)
        }
    }

    const handleShowModal = ({institution, field}) => {
        setData({institution, field})
        setShowModal(true)
    }

    return(
        <div className="institution-screen">
            <div className="institutions-list">
                <ul>
                    {institutionList.map((institution, index)=>{
                        return (
                            <li key={index}>
                                <input type="radio" name="institution" id={institution.id} value={index} onChange={handleChange} />
                                <label htmlFor={institution.id}>{institution.codigo}</label>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="institution-info">
                <div className="editable-info">
                    <p>Nombre: {institutionList[currInst]?.nombre && <span>{institutionList[currInst]?.nombre} <i className="fas fa-edit" onClick={()=>{handleShowModal({ institution:institutionList[currInst]?.id, field:"nombre" })}}></i></span> }</p>
                    <p>Email: {institutionList[currInst]?.email && <span>{institutionList[currInst]?.email} <i className="fas fa-edit" onClick={()=>{handleShowModal({ institution:institutionList[currInst]?.id, field:"email" })}}></i></span>}</p>
                    <p>Pais: {institutionList[currInst]?.pais && <span>{institutionList[currInst]?.pais} <i className="fas fa-edit" onClick={()=>{handleShowModal({ institution:institutionList[currInst]?.id, field:"pais" })}}></i></span>}</p>
                    <p>Provincia: {institutionList[currInst]?.provincia && <span>{institutionList[currInst]?.provincia} <i className="fas fa-edit" onClick={()=>{handleShowModal({ institution:institutionList[currInst]?.id, field:"provincia" })}}></i></span>}</p>
                    <p>Ciudad: {institutionList[currInst]?.ciudad && <span>{institutionList[currInst]?.ciudad} <i className="fas fa-edit" onClick={()=>{handleShowModal({ institution:institutionList[currInst]?.id, field:"ciudad" })}}></i></span>}</p>
                </div>
                <div className="non-editable-info">
                    <p>Estudiantes: {institutionList[currInst]?.num_students}</p>
                    <p>Puntuación: {institutionList[currInst]?.average_score}</p>
                </div>
            </div>
            {!showAddModal && <button onClick={()=>{setShowAddModal(true)}}>Nueva Institución</button>}
            {showModal && <EditorModal institution={data.institution} field={data.field} close={setShowModal} />}
            {showAddModal && <NewInstModal close={setShowAddModal} />}
        </div>
    )
}