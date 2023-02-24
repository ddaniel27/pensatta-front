import React from 'react'
import ErrorMessage from './errorMessage'
import UserContext from '../../context/UserContext'
import DemoContext from '../../context/DemoContext'
import { postRegister, postLogin } from '../../requests'
import '../../styles/loginForm.css'

function validateEmail(email){
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}


export default function LoginForm(){
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [repeatedPassword, setRepeatedPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const [institute, setInstitute] = React.useState('')
    const [borned, setBorned] = React.useState('')

    const [emailLogin, setEmailLogin] = React.useState('')
    const [passwordLogin, setPasswordLogin] = React.useState('')

    const [createAccount, setCreateAccount] = React.useState(false)
    const [firstRegister, setFirstRegister] = React.useState(true)

    const [errorMessage, setErrorMessage] = React.useState('')
    const [successMessage, setSuccessMessage] = React.useState('')

    const [demoValidation, setDemoValidation] = React.useState(false)
    const [demoPass, setDemoPass] = React.useState('')

    const { setLoginUser } = React.useContext(UserContext)
    const { setDemo } = React.useContext(DemoContext)

    const register = () => {
        if (!institute.length){
            setErrorMessage('La institución es obligatoria')
            document.getElementById('instituteRegisterInput').style.color = '#F97D61'
            document.getElementById('instituteRegisterInput').style.borderColor = '#F97D61'
            return
        }else if(!name.length){
            setErrorMessage('El nombre es obligatorio')
            document.getElementById('instituteRegisterInput').style.color = '#008E86'
            document.getElementById('instituteRegisterInput').style.borderColor = 'transparent'
            document.getElementById('nameRegisterInput').style.color = '#F97D61'
            document.getElementById('nameRegisterInput').style.borderColor = '#F97D61'
            return
        }else if(!borned.length){
            document.getElementById('instituteRegisterInput').style.color = '#008E86'
            document.getElementById('instituteRegisterInput').style.borderColor = 'transparent'
            document.getElementById('nameRegisterInput').style.color = '#008E86'
            document.getElementById('nameRegisterInput').style.borderColor = 'transparent'
            document.getElementById('bornedRegisterInput').style.color = '#F97D61'
            document.getElementById('bornedRegisterInput').style.borderColor = '#F97D61'
            setErrorMessage('La fecha de nacimiento es obligatoria')
            return
        }else{
            const params = {
                email: email,
                password: password,
                name: name,
                inst: institute,
                borned_on: borned
            }

            postRegister(
                params,
                function (response) {
                    document.getElementById('instituteRegisterInput').style.color = '#008E86'
                    document.getElementById('instituteRegisterInput').style.borderColor = 'transparent'
                    document.getElementById('nameRegisterInput').style.color = '#008E86'
                    document.getElementById('nameRegisterInput').style.borderColor = 'transparent'
                    document.getElementById('bornedRegisterInput').style.color = '#008E86'
                    document.getElementById('bornedRegisterInput').style.borderColor = 'transparent'
                    if(response.exists){
                        setCreateAccount(false)
                        setFirstRegister(true)
                        setErrorMessage('El email ya existe')
                    }
                    if(response.registered){
                        setCreateAccount(false)
                        setFirstRegister(true)
                        setErrorMessage('')
                        setSuccessMessage('Usuario registrado')
                    }
                    setName('')
                    setEmail('')
                    setPassword('')
                    setInstitute('')
                    setBorned('')
                }, 
                setErrorMessage
            )
        }
    }
    const login = () => {
        if(!emailLogin.length || !validateEmail(emailLogin)){
            setErrorMessage('Email invalido')
            setSuccessMessage('')
            document.getElementById('emailLoginInput').style.color = '#F97D61'
            document.getElementById('emailLoginInput').style.borderColor = '#F97D61'
            return
        }else if(!passwordLogin.length){
            setErrorMessage('Contraseña invalida')
            setSuccessMessage('')
            document.getElementById('passwordLoginInput').style.color = '#F97D61'
            document.getElementById('passwordLoginInput').style.borderColor = '#F97D61'
            return
        }else{

            const params = {
                email: emailLogin,
                password: passwordLogin
            }

            postLogin( 
                params,
                function(response){
                if(response.logged){
                    setLoginUser(response.user)
                    console.log(response.user)
                    console.log("si esta logged")
                }else{
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
    
    const handleCreateAccount = () => {
        setCreateAccount(true)
        setErrorMessage('')
        setSuccessMessage('')
    }
    const handleFirstRegister = () => {
        if(!email.length){
            setErrorMessage('El email es obligatorio')
            document.getElementById('emailRegisterInput').style.color = '#F97D61'
            document.getElementById('emailRegisterInput').style.borderColor = '#F97D61'
        }else if(!validateEmail(email)){
            setErrorMessage('El email es invalido')
            document.getElementById('emailRegisterInput').style.color = '#F97D61'
            document.getElementById('emailRegisterInput').style.borderColor = '#F97D61'
        }else if(!password.length || !repeatedPassword.length){
            setErrorMessage('La contraseña es obligatoria')
            document.getElementById('passwordRegisterInput').style.color = '#F97D61'
            document.getElementById('passwordRegisterInput').style.borderColor = '#F97D61'
            document.getElementById('repeatedPasswordRegisterInput').style.color = '#F97D61'
            document.getElementById('repeatedPasswordRegisterInput').style.borderColor = '#F97D61'
            document.getElementById('emailRegisterInput').style.color = '#008E86'
            document.getElementById('emailRegisterInput').style.borderColor = 'transparent'
        }else if(password !== repeatedPassword){
            setErrorMessage('Las contraseñas no coinciden')
            document.getElementById('passwordRegisterInput').style.color = '#F97D61'
            document.getElementById('passwordRegisterInput').style.borderColor = '#F97D61'
            document.getElementById('repeatedPasswordRegisterInput').style.color = '#F97D61'
            document.getElementById('repeatedPasswordRegisterInput').style.borderColor = '#F97D61'
            document.getElementById('emailRegisterInput').style.color = '#008E86'
            document.getElementById('emailRegisterInput').style.borderColor = 'transparent'
        }else{
            document.getElementById('emailRegisterInput').style.color = '#008E86'
            document.getElementById('emailRegisterInput').style.borderColor = 'transparent'
            document.getElementById('passwordRegisterInput').style.color = '#008E86'
            document.getElementById('passwordRegisterInput').style.borderColor = 'transparent'
            document.getElementById('repeatedPasswordRegisterInput').style.color = '#008E86'
            document.getElementById('repeatedPasswordRegisterInput').style.borderColor = 'transparent'
            setErrorMessage('')
            setTimeout(() => {
                setFirstRegister(false)
            } , 100)
        }
    }
    const handleDemoValidation = () =>{
        //Aqui va la validacion del demo preferiblemente con las passwords en db
        if(
            demoPass !== 'katty2020' &&
            demoPass !== 'katty2021' &&
            demoPass !== 'katty2022' &&
            demoPass !== 'katty2023' &&
            demoPass !== 'katty2024' &&
            demoPass !== 'katty2025'
        ){
            console.log(demoPass)
            return setErrorMessage('Error en validacion') }
        setDemo(true)
    }

    return(
        <div className='login-form'>
            { demoValidation ? <>
                <input 
                    type='text' 
                    id='demoPassword'
                    placeholder='Contraseña'
                    value={demoPass}
                    onChange={(e) => setDemoPass(e.target.value)}
                    required
                />
            </> :
                (createAccount ?
                (firstRegister ?
                    <div className = 'registration'>
                        <input type='email'
                                placeholder='Correo'
                                id='emailRegisterInput'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                        />
                        <input type='password'
                                placeholder='Contraseña'
                                id='passwordRegisterInput'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        <input type='password'
                                placeholder='Confirmar contraseña'
                                id='repeatedPasswordRegisterInput'
                                value={repeatedPassword}
                                onChange={(e) => setRepeatedPassword(e.target.value)}
                                required
                            />
                    </div>:
                    <div className = 'registration'>
                        <input type='text'
                                placeholder='Institucion'
                                id='instituteRegisterInput'
                                value={institute}
                                onChange={(e) => setInstitute(e.target.value)}
                                required
                            />
                        <input type='text'
                                placeholder='Nombre y apellidos'
                                id='nameRegisterInput'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                        />
                        <input type='date'
                                placeholder='Fecha de nacimiento'
                                id='bornedRegisterInput'
                                value={borned}
                                onChange={(e) => setBorned(e.target.value)}
                                required
                            />
                    </div>):

                <div className='login'>
                    <input type='text'
                        placeholder='Correo'
                        id='emailLoginInput'
                        value={emailLogin}
                        onChange={(e) => setEmailLogin(e.target.value)}
                        required
                    />
                    <input type='password'
                        placeholder='Contraseña'
                        id='passwordLoginInput' 
                        value={passwordLogin}
                        onChange={(e) => setPasswordLogin(e.target.value)}
                        required
                    />
                    {/* <span>¿Olvidaste tu contraseña?</span> */}
                </div>)
            }
            <div className='buttons-login'>
                { demoValidation ?
                <>
                        <button className='solid-button' onClick={handleDemoValidation}>VALIDAR</button>
                </> :
                    (
                    !createAccount ?
                    <>
                        <button className='solid-button' onClick={login} >INICIAR SESIÓN</button>
                        <button className = 'demo-button' onClick={() => setDemoValidation(true)}>DEMO</button>
                    </>:
                    (firstRegister ?
                        <button className='solid-button' onClick={handleFirstRegister}>CONTINUAR</button>:
                        <button className='solid-button' onClick={register}>REGISTRAR</button>
                    )
                    )
                }  
            </div>
            {errorMessage &&
                <ErrorMessage type='error'>
                    {errorMessage}
                </ErrorMessage>
            }
            {successMessage &&
                <ErrorMessage type='success'>
                    {successMessage}
                </ErrorMessage>
            }
        </div>
    )
}
