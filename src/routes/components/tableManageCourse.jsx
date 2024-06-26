import '../../styles/tableManageCourse.css'
import { useState } from 'react'
import NewStudentModal from './coordinatorProfile/newStudentModal'
import EditStudentModal from './coordinatorProfile/editStudentModal'
import ReasignTeacher from './coordinatorProfile/reasignTeacher'
import DeleteStudentModal from './coordinatorProfile/deleteStudentModal'

const defaultCourseInfo = {
  title: '6 A',
  teacher: 'Ramirez',
  students: [
    { name: 'Student 1' },
    { name: 'Student 2' },
    { name: 'Student 3' },
    { name: 'Student 4' },
    { name: 'Student 5' },
    { name: 'Student 6' },
    { name: 'Student 7' },
    { name: 'Student 8' },
    { name: 'Student 9' },
    { name: 'Student 10' },
    { name: 'Student 11' },
    { name: 'Student 12' },
    { name: 'Student 13' },
    { name: 'Student 14' },
    { name: 'Student 15' },
    { name: 'Student 16' },
    { name: 'Student 17' },
    { name: 'Student 18' },
    { name: 'Student 19' },
    { name: 'Student 20' },
    { name: 'Student 21' },
    { name: 'Student 22' }
  ]
}

const defaultData = [
  defaultCourseInfo,
  defaultCourseInfo,
  defaultCourseInfo,
  defaultCourseInfo,
  defaultCourseInfo,
  defaultCourseInfo,
  defaultCourseInfo
]

export default function TableManageCourse ({ title = 'Grado', data = defaultData, coordinator = true, userId }) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showReasignModal, setShowReasignModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [studentId, setStudentId] = useState(false)
  const [course, setCourse] = useState(false)
  const [courseId, setCourseId] = useState(false)
  const [studentName, setStudentName] = useState('')

  return (
    <div className='TableManageCourse'>
      <div className='TableManageCourse__title'>
        <div className='TableManageCourse__title__text'>{title}</div>
        {coordinator && !showAddModal && course && <div className='TableManageCourse__button' onClick={() => { setShowAddModal(true) }}>NUEVO USUARIO</div>}
      </div>
      <div className='TableManageCourse__container'>
        {data.map((courseData, index) => (
          <CourseInfo data={courseData} id={index} showCourses={course === `${index}`} courseSelected={setCourse} key={index} coordinator={coordinator} courseId={courseData.course_id} setCourseId={setCourseId} setStudentId={setStudentId} setShowEditModal={setShowEditModal} setShowReasignModal={setShowReasignModal} setStudentName={setStudentName} setShowDeleteModal={setShowDeleteModal}/>
        ))}
      </div>
      {showAddModal && <NewStudentModal close={setShowAddModal} userId={userId} courseId={courseId} />}
      {showEditModal && <EditStudentModal close={setShowEditModal} userId={userId} courseId={courseId} studentId={studentId} />}
      {showReasignModal && <ReasignTeacher close={setShowReasignModal} userId={userId} courseId={courseId} />}
      {showDeleteModal && <DeleteStudentModal close={setShowDeleteModal} userId={userId} courseId={courseId} student={ { id: studentId, name: studentName } }/>}
    </div>
  )
}

/**
  * @param {string} title
  * @param {string} teacher
  * @param {array} students
  **/

function CourseInfo ({ data = defaultCourseInfo, showCourses = false, courseSelected = () => {}, id = 0, coordinator = true, courseId, setCourseId, setStudentId, setShowEditModal, setShowReasignModal, setStudentName, setShowDeleteModal }) {
  const handleCourseSelected = ({ target }) => {
    courseSelected(target.id)
    setCourseId(courseId)
  }
  const handleClick = (id) => {
    setStudentId(id)
    setShowEditModal(true)
  }
  const handleClickEliminar = (id, name) => {
    setStudentId(id)
    setStudentName(name)
    setShowDeleteModal(true)
  }
  return (
    <div className={`CourseInfo ${!showCourses && 'hiddeCourseInfo'}`}>
      <label className='CourseInfo__selector'>
        <input type='radio' name='course' id={id} onChange={handleCourseSelected} />
        <div className='CourseInfo__title'>{data.title}</div>
      </label>
      {
        showCourses && (
          <div className='CourseInfo__container'>
            <div className='CourseInfo__header'>
              <div className='CourseInfo__header__User'>Usuario</div>
              {coordinator && <div className='CourseInfo__teacher_group'>
                <div className='CourseInfo__header__Teacher'>Docente: {data.teacher}</div>
                <div className='CourseInfo__header__Reasign' onClick={() => { setShowReasignModal(true) }}>Reasignar</div>
              </div>}
            </div>
            <div className='CourseInfo__body'>
              {data.students.map((student, index) => (
                <div className='CourseInfo__body__row' key={index}>
                  <div className='CourseInfo__body__row__name'>{student.username}</div>
                  <div className='CourseInfo__body__row__repass' onClick={() => { handleClick(student.id) }}>Reestablecer contraseña</div>
                  <div className='CourseInfo__body__row__delete' onClick={() => { handleClickEliminar(student.id, student.name) }}>Eliminar</div>
                </div>
              ))}
            </div>
          </div>
        )
      }
    </div>
  )
}
