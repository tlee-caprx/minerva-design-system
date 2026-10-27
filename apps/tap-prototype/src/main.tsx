import { createRoot } from 'react-dom/client'
import { TapPage } from './TapPage'
import './index.css'

document.documentElement.setAttribute('data-theme', 'minerva')

createRoot(document.getElementById('root')!).render(<TapPage onExit={() => window.location.assign('/')} />)
