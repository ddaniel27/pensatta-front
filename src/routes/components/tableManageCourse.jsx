import '../../styles/tableManageCourse.css'
import { useState } from 'react'

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

export default function TableManageCourse ({ title = 'Grado', data = defaultData }) {
  const [course, setCourse] = useState(false)

  return (
    <div className='TableManageCourse'>
      <div className='TableManageCourse__title'>
        <div className='TableManageCourse__title__text'>{title}</div>
        <div className='TableManageCourse__button'>NUEVO USUARIO</div>
      </div>
      <div className='TableManageCourse__container'>
        {data.map((courseData, index) => (
          <CourseInfo data={courseData} id={index} showCourses={course === `${index}`} courseSelected={setCourse} key={index} />
        ))}
      </div>
    </div>
  )
}

/**
  * @param {string} title
  * @param {string} teacher
  * @param {array} students
  **/

function CourseInfo ({ data = defaultCourseInfo, showCourses = false, courseSelected = () => {}, id = 0 }) {

  const handleCourseSelected = ({ target }) => {
    courseSelected(target.id)
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
              <div className='CourseInfo__teacher_group'>
                <div className='CourseInfo__header__Teacher'>Docente: {data.teacher}</div>
                <div className='CourseInfo__header__Reasign'>Reasignar</div>
              </div>
            </div>
            <div className='CourseInfo__body'>
              {data.students.map((student, index) => (
                <div className='CourseInfo__body__row' key={index}>
                  <div className='CourseInfo__body__row__name'>{student.name}</div>
                  <div className='CourseInfo__body__row__repass'>Reestablecer contraseña</div>
                  <div className='CourseInfo__body__row__delete'>Eliminar</div>
                </div>
              ))}
            </div>
          </div>
        )
      }
    </div>
  )
}