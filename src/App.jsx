import React, { useEffect } from 'react'
import LoginScreen from './routes/loginScreen'
import Dashboard from './routes/dashboard'
import DemoDashboard from './routes/demo/dashboard'
import UserContext from './context/UserContext'
import DemoContext from './context/DemoContext'
import Footer from './routes/components/footer'
import { getLogin } from './requests'
import './styles/App.css'
import i18n from 'i18next'

function App () {
  const [loginUser, setLoginUser] = React.useState({})
  const [demo, setDemo] = React.useState(false)

  React.useLayoutEffect(() => {
    getLogin(setLoginUser)
  }, [])
  useEffect(() => {
    i18n.changeLanguage(loginUser.language || 'es')
  }
  , [loginUser.language])

  return (
    <div className='App'>
      <DemoContext.Provider value={{ demo, setDemo }}>
        <UserContext.Provider value={{ loginUser, setLoginUser }}>
          { demo ? <DemoDashboard /> : (loginUser.username ? <Dashboard /> : <LoginScreen />) }
        </UserContext.Provider>
      </DemoContext.Provider>
      <Footer />
    </div>
  )
}

export default App
