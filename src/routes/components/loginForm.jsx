import React from 'react'
import ErrorMessage from './errorMessage'
import UserContext from '../../context/UserContext'
import DemoContext from '../../context/DemoContext'
import { postLogin } from '../../requests'
import '../../styles/loginForm.css'

function validateEmail (email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export default function LoginForm () {
  const [emailLogin, setEmailLogin] = React.useState('')
  const [passwordLogin, setPasswordLogin] = React.useState('')

  const [errorMessage, setErrorMessage] = React.useState('')
  const [successMessage, setSuccessMessage] = React.useState('')

  const [demoValidation, setDemoValidation] = React.useState(false)
  const [demoPass, setDemoPass] = React.useState('')

  const { setLoginUser } = React.useContext(UserContext)
  const { setDemo } = React.useContext(DemoContext)

  const login = () => {
    if (!emailLogin.length || !validateEmail(emailLogin)) {
      setErrorMessage('Email invalido')
      setSuccessMessage('')
      document.getElementById('emailLoginInput').style.color = '#F97D61'
      document.getElementById('emailLoginInput').style.borderColor = '#F97D61'
    } else if (!passwordLogin.length) {
      setErrorMessage('Contraseña invalida')
      setSuccessMessage('')
      document.getElementById('passwordLoginInput').style.color = '#F97D61'
      document.getElementById('passwordLoginInput').style.borderColor = '#F97D61'
    } else {
      const params = {
        email: emailLogin,
        password: passwordLogin
      }

      postLogin(
        params,
        function (response) {
          if (response.logged) {
            setLoginUser(response.user)
            console.log(response.user)
            console.log('si esta logged')
          } else {
            setErrorMessage('Usuario o contraseña incorrectos')
            setSuccessMessage('')
            setEmailLogin('')
            setPasswordLogin('')
          }
        },
        setErrorMessage
      )
    }
  }

  const handleDemoValidation = () => {
    // Aqui va la validacion del demo preferiblemente con las passwords en db
    if (
      demoPass !== 'katty2020' &&
            demoPass !== 'katty2021' &&
            demoPass !== 'katty2022' &&
            demoPass !== 'katty2023' &&
            demoPass !== 'katty2024' &&
            demoPass !== 'katty2025'
    ) {
      console.log(demoPass)
      return setErrorMessage('Error en validacion')
    }
    setDemo(true)
  }

  return (
    <div className='login-form'>
      {demoValidation
        ? <>
          <input
            type='text'
            id='demoPassword'
            placeholder='Contraseña'
            value={demoPass}
            onChange={(e) => setDemoPass(e.target.value)}
            required
          />
        </>
        : <div className='login'>
          <input
            type='text'
            placeholder='Código de usuario'
            id='emailLoginInput'
            value={emailLogin}
            onChange={(e) => setEmailLogin(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Contraseña'
            id='passwordLoginInput'
            value={passwordLogin}
            onChange={(e) => setPasswordLogin(e.target.value)}
            required
          />
        </div>}
      <div className='buttons-login'>
        {demoValidation
          ? <button className='solid-button' onClick={handleDemoValidation}>VALIDAR</button>
          : <>
            <button className='solid-button' onClick={login}>INICIAR SESIÓN</button>
            <button className='demo-button' onClick={() => setDemoValidation(true)}>DEMO</button>
          </>}
      </div>
      {errorMessage &&
        <ErrorMessage type='error'>
          {errorMessage}
        </ErrorMessage>}
      {successMessage &&
        <ErrorMessage type='success'>
          {successMessage}
        </ErrorMessage>}
    </div>
  )
}
