import { useState } from 'react'
import EditorModal from './editorModal'
import NewInstModal from './newInstModal'
import NewUserModal from './newUserModal'
import { useTranslation } from 'react-i18next'
import '../../styles/institutionScreen.css'

export default function InstitutionScreen ({ institutionList }) {
  const [currInst, setCurrInst] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showInstModal, setShowInstModal] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [data, setData] = useState({ institution: '', field: '' })
  const { t } = useTranslation("institutionScreen")

  const handleChange = ({ target }) => {
    if (target.checked) {
      setCurrInst(target.value)
    }
  }

  const handleShowModal = ({ institution, field }) => {
    setData({ institution, field })
    setShowModal(true)
  }

  const handleDownloadCSV = () => {
    const url = 'https://informes.pensatta.net/general'
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const file = window.URL.createObjectURL(blob)
        window.location.assign(file)
      })
  }

  return (
    <div className='institution-screen'>
      <div className='institutions-list'>
        <ul>
          {institutionList.map((institution, index) => {
            return (
              <li key={index}>
                <input type='radio' name='institution' id={institution.id} value={index} onChange={handleChange} />
                <label htmlFor={institution.id}>{institution.codigo}</label>
              </li>
            )
          })}
        </ul>
      </div>
      <div className='institution-info'>
        <div className='editable-info'>
          <p>{t("name")}{institutionList[currInst]?.nombre && <span>{institutionList[currInst]?.nombre} <i className='fas fa-edit' onClick={() => { handleShowModal({ institution: institutionList[currInst]?.id, field: t("name") }) }} /></span>}</p>
          <p>{t("email")}{institutionList[currInst]?.email && <span>{institutionList[currInst]?.email} <i className='fas fa-edit' onClick={() => { handleShowModal({ institution: institutionList[currInst]?.id, field: t("email") }) }} /></span>}</p>
          <p>{t("country")}{institutionList[currInst]?.pais && <span>{institutionList[currInst]?.pais} <i className='fas fa-edit' onClick={() => { handleShowModal({ institution: institutionList[currInst]?.id, field: t("country") }) }} /></span>}</p>
          <p>{t("province")}{institutionList[currInst]?.provincia && <span>{institutionList[currInst]?.provincia} <i className='fas fa-edit' onClick={() => { handleShowModal({ institution: institutionList[currInst]?.id, field: t("province") }) }} /></span>}</p>
          <p>{t("city")}{institutionList[currInst]?.ciudad && <span>{institutionList[currInst]?.ciudad} <i className='fas fa-edit' onClick={() => { handleShowModal({ institution: institutionList[currInst]?.id, field: t("city") }) }} /></span>}</p>
        </div>
        <div className='non-editable-info'>
          <p>{t("students")}{institutionList[currInst]?.num_students}</p>
          <p>{t("score")}{institutionList[currInst]?.average_score}</p>
        </div>
      </div>
      <div className='buttons-container'>
        {!showInstModal && !showUserModal &&
          <>
            <button onClick={() => { setShowInstModal(true) }}>{t("new-institution")}</button>
            <button onClick={() => { setShowUserModal(true) }}>{t("new-user")}</button>
            <button onClick={handleDownloadCSV}>{t("download-report")}</button>
          </>}
      </div>
      {showModal && <EditorModal institution={data.institution} field={data.field} close={setShowModal} />}
      {showInstModal && <NewInstModal close={setShowInstModal} />}
      {showUserModal && <NewUserModal close={setShowUserModal} />}
    </div>
  )
}
