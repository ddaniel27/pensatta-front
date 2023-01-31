import HorizontalBar from '../../components/horizontalBar'
import GradeInfoCard from '../../components/gradeInfoCard'
// import data from './data.json'

export default function ExTest () {
  const listaGrados = [
    {
      grade: '6 A',
      teacher: 'Ramirez'
    },
    {
      grade: '6 B',
      teacher: 'Ramirez'
    },
    {
      grade: '6 C',
      teacher: 'Ramirez'
    },
    {
      grade: '6 D',
      teacher: 'Ramirez'
    }
  ]
  return (
    <>
      <HorizontalBar label='Hola' />
      <GradeInfoCard title='Grado sexto' lista={listaGrados} />
    </>
  )
}
