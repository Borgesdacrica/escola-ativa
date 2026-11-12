import { Link } from 'react-router-dom'

/** Mensagem mostrada quando não há nada para listar. */
export default function EmptyState({ titulo, texto, mostrarBotao = false }) {
  return (
    <div className="text-center py-5 px-3 bg-body-tertiary rounded-3 border">
      <div className="display-6 mb-2" aria-hidden="true">🗂️</div>
      <h2 className="h5">{titulo}</h2>
      <p className="text-body-secondary mb-3">{texto}</p>
      {mostrarBotao && (
        <Link to="/nova" className="btn btn-primary">
          + Nova atividade
        </Link>
      )}
    </div>
  )
}
