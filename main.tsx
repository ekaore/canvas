import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Editor } from './pages/Coupling/Editor'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Editor />
  </StrictMode>,
)
