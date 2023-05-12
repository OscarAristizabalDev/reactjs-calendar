import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles.css'
import { CalendarApp } from './CalendarApp.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CalendarApp />
  </React.StrictMode>,
)
