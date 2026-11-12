import { useContext } from 'react'
import { ActivitiesContext } from './ActivitiesContext'

/** Hook personalizado para aceder às atividades a partir de qualquer componente. */
export function useActivities() {
  const contexto = useContext(ActivitiesContext)
  if (!contexto) {
    throw new Error('useActivities tem de ser usado dentro de <ActivitiesProvider>')
  }
  return contexto
}
