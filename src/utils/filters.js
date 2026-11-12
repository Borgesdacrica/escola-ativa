/** Remove acentos e passa para minúsculas, para a pesquisa ignorar "á", "ç", etc. */
export function normalizar(texto) {
  return (texto ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

/**
 * Aplica pesquisa por título, filtro de estado, filtro de categoria e ordenação.
 * Não altera a lista original.
 */
export function filtrarAtividades(lista, { pesquisa = '', estado = 'todas', categoria = 'todas', ordem = 'data-asc' } = {}) {
  const termo = normalizar(pesquisa)

  const filtradas = lista.filter((a) => {
    const passaPesquisa = !termo || normalizar(a.titulo).includes(termo)
    const passaEstado = estado === 'todas' || a.estado === estado
    const passaCategoria = categoria === 'todas' || a.categoria === categoria
    return passaPesquisa && passaEstado && passaCategoria
  })

  const comparadores = {
    'data-asc': (a, b) => a.data.localeCompare(b.data),
    'data-desc': (a, b) => b.data.localeCompare(a.data),
    'titulo-asc': (a, b) => a.titulo.localeCompare(b.titulo, 'pt'),
    'titulo-desc': (a, b) => b.titulo.localeCompare(a.titulo, 'pt'),
  }

  return [...filtradas].sort(comparadores[ordem] ?? comparadores['data-asc'])
}

/** Formata "2026-11-24" como "24/11/2026". */
export function formatarData(iso) {
  if (!iso) return ''
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}

/** Devolve true se a data já passou (comparando só o dia). */
export function dataPassada(iso) {
  const hoje = new Date().toISOString().slice(0, 10)
  return iso < hoje
}
