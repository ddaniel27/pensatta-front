import React from 'react'
import '../../styles/errorMessage.css'

export default function ErrorMessage({ children, type }){
    return (
        <div className={`error-message ${type}`}>
            {children}
        </div>
    )
}