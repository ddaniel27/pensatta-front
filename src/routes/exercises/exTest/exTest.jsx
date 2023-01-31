// import HorizontalBar from '../../components/horizontalBar'
// import GradeInfoCard from '../../components/gradeInfoCard'
// import RowTwentyColors from '../../components/rowTwentyColors'
import TableManageCourse from '../../components/tableManageCourse'
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
      <TableManageCourse />
    </>
  )
}
