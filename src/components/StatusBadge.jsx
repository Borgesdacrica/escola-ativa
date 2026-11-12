import { ESTADOS } from '../utils/constants'

/** Etiqueta colorida com o estado da atividade. */
export default function StatusBadge({ estado }) {
  const classe = estado === 'concluida' ? 'text-bg-success' : 'text-bg-warning'
  return <span className={`badge rounded-pill ${classe}`}>{ESTADOS[estado] ?? estado}</span>
}
