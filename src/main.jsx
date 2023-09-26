import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Pdf from './routes/components/studentProfile/pdf'
import './lang-config'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.render(
  <React.Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <Routes>
        <Route path="/pensatta" element={<App />}/>
        <Route path='/resumen/:id' element={<Pdf />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  </React.Suspense>,
  document.getElementById('root')
)
