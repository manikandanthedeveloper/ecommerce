import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import './index.css'

const App = lazy(() => import('./App.tsx'));

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
