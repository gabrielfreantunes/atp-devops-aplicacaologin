import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Pathing from './pathing'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Pathing />
  </StrictMode>,
)