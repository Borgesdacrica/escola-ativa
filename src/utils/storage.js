import { STORAGE_KEY } from './constants'

/** Lê as atividades guardadas no localStorage (ou [] se não houver / estiverem corrompidas). */
export function carregarAtividades() {
  try {
    const texto = localStorage.getItem(STORAGE_KEY)
    if (!texto) return null
    const lista = JSON.parse(texto)
    return Array.isArray(lista) ? lista : null
  } catch {
    return null
  }
}

/** Guarda a lista de atividades no localStorage. */
export function guardarAtividades(lista) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista))
    return true
  } catch {
    return false
  }
}
