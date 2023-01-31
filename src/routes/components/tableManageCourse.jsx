import '../../styles/tableManageCourse.css'
export default function TableManageCourse ({ title = 'Grado', data = [] }) {
  return (
    <div className='TableManageCourse'>
      <div className='TableManageCourse__title'>
        <div className='TableManageCourse__title__text'>{title}</div>
        <div className='TableManageCourse__button'>NUEVO USUARIO</div>
      </div>
      <div className='TableManageCourse__container'>
        <CourseInfo />
      </div>
    </div>
  )
}

const defaultData = {
  title: '6 A',
  teacher: 'Ramirez',
  students: [
    { name: 'Student 1' },
    { name: 'Student 2' },
    { name: 'Student 3' },
    { name: 'Student 4' },
    { name: 'Student 5' }
  ]
}

/**
  * @param {string} title
  * @param {string} teacher
  * @param {array} students
  **/

function CourseInfo ({ data = defaultData }) {
  return (
    <div className='CourseInfo'>
      <div className='CourseInfo__title'>{data.title}</div>
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
    </div>
  )
}
