import React from 'react'
import LoginForm from './components/loginForm'
import '../styles/loginScreen.css'

export default function LoginScreen(){
    return (
        <div className='login-screen'>
            <img src='./images/Group.svg' alt='logo-pensatta'/>
            <LoginForm />
        </div>
    )
}

