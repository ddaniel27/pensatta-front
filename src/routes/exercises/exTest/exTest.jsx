import HorizontalBar from '../../components/horizontalBar'
import GradeInfoCard from '../../components/gradeInfoCard'
import RowTwentyColors from '../../components/rowTwentyColors'
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
      <RowTwentyColors label='User1' list={[0.4, 0.65, 0.85]} />
    </>
  )
}
