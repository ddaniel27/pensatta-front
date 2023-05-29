import React from 'react'
import Information from './information'
import ActivityContext from '../../context/ActivityContext'
import RouterActivity from '../exercises/routerActivity'
import StudentProfileViewer from './studentProfileViewer'
import '../../styles/mainArea.css'

export default function StudentView () {
  const { activity, setTitle, setBackground, setActivity, profile } = React.useContext(ActivityContext)

  const [randomId, setRandomId] = React.useState(0)

  const handleMessages = () => {
    setActivity(false)
    setRandomId(
      [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '31',
        '32',
        '33',
        '34',
        '35',
        '36',
        '37',
        '38',
        '39',
        '40',
        '41',
        '42',
        '43',
        '44',
        '45',
        '46',
        '47',
        '48',
        '49',
        '50',
        '51',
        '52',
        '53',
        '54',
        '55',
        '56',
        '57',
        '58',
        '59',
        '60',
        '61',
        '62',
        '63',
        '64',
        '65',
        '66',
        '67',
        '68',
        '69',
        '70',
        '71',
        '72',
        '73',
        '75',
        '76',
        '77',
        '78',
        '79',
        '80',
        '81',
        '82',
        '83',
        '84',
        '85',
        '86',
        '87',
        '88',
        '89',
        '90',
        '91',
        '93',
        '94',
        '95',
        '96',
        '97',
        '98',
        '99',
        '100',
        '101',
        '102',
        '103',
        '104',
        '105',
        '106',
        '107',
        '108'
      ][Math.floor(Math.random() * 105)]
    )
  }

  React.useEffect(() => {
    if (activity) {
      setTitle('HUB')
      setBackground('#E0E0E0')
    }
  }, [activity, setBackground, setTitle])

  return (
    <div className='main-area'>
      {
        profile
          ? <StudentProfileViewer />
          : (
            activity
              ? <>
                <Information messages={['¡Qué gusto tenerte por acá!']} />
                <button className='button-play' onClick={handleMessages}>JUGAR</button>
              </>
              : <RouterActivity idExercise={randomId} />
          )
      }
    </div>
  )
}
