import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Coupling } from './pages/Coupling/Coupling'
// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Coupling />
  </StrictMode>,
)
