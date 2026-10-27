import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

document.documentElement.setAttribute('data-theme', 'minerva')

createRoot(document.getElementById('root')!).render(<App />)
