import { useEffect, useState } from 'react'
import { formatarData } from '../utils/filters'

const API = 'https://date.nager.at/api/v3/NextPublicHolidays/PT'

/**
 * Funcionalidade opcional: consome uma API pública (Nager.Date) para mostrar
 * os próximos feriados em Portugal, úteis para planear atividades.
 */
export default function HolidaysWidget() {
  const [feriados, setFeriados] = useState([])
  const [estado, setEstado] = useState('a carregar')

  useEffect(() => {
    const controlador = new AbortController()
    fetch(API, { signal: controlador.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((dados) => {
        setFeriados(dados.slice(0, 3))
        setEstado('ok')
      })
      .catch((e) => {
        if (e.name !== 'AbortError') setEstado('erro')
      })
    return () => controlador.abort()
  }, [])

  return (
    <aside className="card mb-4 border-info-subtle" aria-labelledby="titulo-feriados">
      <div className="card-body py-2">
        <h2 id="titulo-feriados" className="h6 mb-2">
          <span aria-hidden="true">🇵🇹</span> Próximos feriados nacionais
        </h2>
        {estado === 'a carregar' && <p className="small mb-0 text-body-secondary">A carregar…</p>}
        {estado === 'erro' && (
          <p className="small mb-0 text-body-secondary">Não foi possível obter os feriados (sem ligação à Internet?).</p>
        )}
        {estado === 'ok' && (
          <ul className="list-inline small mb-0">
            {feriados.map((f) => (
              <li className="list-inline-item me-3" key={f.date}>
                <strong>{formatarData(f.date)}</strong> — {f.localName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  )
}
