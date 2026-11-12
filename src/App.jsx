import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import HomePage from './pages/HomePage'
import NewActivityPage from './pages/NewActivityPage'
import EditActivityPage from './pages/EditActivityPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <a href="#conteudo" className="visually-hidden-focusable skip-link">Saltar para o conteúdo</a>
      <Navbar />
      <main id="conteudo" className="container py-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nova" element={<NewActivityPage />} />
          <Route path="/editar/:id" element={<EditActivityPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="py-3 bg-body-tertiary border-top text-center small text-body-secondary">
        EscolaAtiva · Projeto CPW 12.º ano · React + Bootstrap
      </footer>
      <Toast />
    </div>
  )
}
