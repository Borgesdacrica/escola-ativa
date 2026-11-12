import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/app.css'
import App from './App'
import { ActivitiesProvider } from './context/ActivitiesContext'

// HashRouter (URLs com #) permite publicar no GitHub Pages sem configuração extra no servidor
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ActivitiesProvider>
        <App />
      </ActivitiesProvider>
    </HashRouter>
  </StrictMode>,
)
