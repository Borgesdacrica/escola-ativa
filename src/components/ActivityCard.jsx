import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'
import { dataPassada, formatarData } from '../utils/filters'

/** Cartão que mostra uma atividade e as ações possíveis. */
export default function ActivityCard({ atividade, onAlternar, onEliminar }) {
  const { id, titulo, descricao, data, estado, categoria, local } = atividade
  const atrasada = estado === 'pendente' && dataPassada(data)

  return (
    <article className={`card h-100 activity-card ${estado === 'concluida' ? 'concluida' : ''}`}>
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <span className="badge text-bg-light border">{categoria}</span>
          <StatusBadge estado={estado} />
        </div>
        <h3 className="h5 card-title activity-title">{titulo}</h3>
        <p className="card-text text-body-secondary flex-grow-1">{descricao}</p>
        <ul className="list-unstyled small mb-3">
          <li>
            <span aria-hidden="true">📅</span> <time dateTime={data}>{formatarData(data)}</time>
            {atrasada && <span className="badge text-bg-danger ms-2">Data ultrapassada</span>}
          </li>
          {local && (
            <li>
              <span aria-hidden="true">📍</span> {local}
            </li>
          )}
        </ul>
        <div className="d-flex flex-wrap gap-2">
          <button
            type="button"
            className={`btn btn-sm ${estado === 'concluida' ? 'btn-outline-secondary' : 'btn-outline-success'}`}
            onClick={() => onAlternar(id)}
          >
            {estado === 'concluida' ? 'Marcar pendente' : 'Marcar concluída'}
          </button>
          <Link className="btn btn-sm btn-outline-primary" to={`/editar/${id}`} aria-label={`Editar ${titulo}`}>
            Editar
          </Link>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger ms-auto"
            onClick={() => onEliminar(atividade)}
            aria-label={`Eliminar ${titulo}`}
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  )
}
