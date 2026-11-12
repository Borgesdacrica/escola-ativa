import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const LINKS = [
  { para: '/', texto: 'Atividades', fim: true },
  { para: '/nova', texto: 'Nova atividade' },
  { para: '/sobre', texto: 'Sobre' },
]

export default function Navbar() {
  // O menu abre/fecha com estado React (não precisa do JavaScript do Bootstrap)
  const [aberto, setAberto] = useState(false)

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary shadow-sm" aria-label="Navegação principal">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/" onClick={() => setAberto(false)}>
          <img src="./favicon.svg" alt="" width="28" height="28" />
          EscolaAtiva
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="menu-principal"
          aria-expanded={aberto}
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setAberto((v) => !v)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${aberto ? 'show' : ''}`} id="menu-principal">
          <ul className="navbar-nav ms-auto">
            {LINKS.map((l) => (
              <li className="nav-item" key={l.para}>
                <NavLink className="nav-link" to={l.para} end={l.fim} onClick={() => setAberto(false)}>
                  {l.texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
