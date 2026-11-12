import { createContext, useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { carregarAtividades, guardarAtividades } from '../utils/storage'
import { ATIVIDADES_EXEMPLO } from '../utils/seed'

// Contexto partilhado: qualquer componente pode ler/alterar as atividades
// sem passar props por vários níveis.
// eslint-disable-next-line react-refresh/only-export-components
export const ActivitiesContext = createContext(null)

function gerarId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

// Reducer: todas as alterações ao estado passam por aqui (lógica separada da interface)
function atividadesReducer(estado, acao) {
  switch (acao.tipo) {
    case 'adicionar':
      return [...estado, acao.atividade]
    case 'editar':
      return estado.map((a) => (a.id === acao.atividade.id ? { ...a, ...acao.atividade } : a))
    case 'eliminar':
      return estado.filter((a) => a.id !== acao.id)
    case 'alternarEstado':
      return estado.map((a) =>
        a.id === acao.id ? { ...a, estado: a.estado === 'concluida' ? 'pendente' : 'concluida' } : a,
      )
    case 'repor':
      return acao.lista
    default:
      throw new Error(`Ação desconhecida: ${acao.tipo}`)
  }
}

function estadoInicial() {
  return carregarAtividades() ?? ATIVIDADES_EXEMPLO
}

export function ActivitiesProvider({ children }) {
  const [atividades, dispatch] = useReducer(atividadesReducer, undefined, estadoInicial)
  const [aviso, setAviso] = useState(null) // mensagem de confirmação (toast)

  // R7 - Persistência: sempre que a lista muda, é guardada no localStorage
  useEffect(() => {
    guardarAtividades(atividades)
  }, [atividades])

  const notificar = useCallback((texto, tipo = 'success') => {
    setAviso({ texto, tipo, id: Date.now() })
  }, [])

  const adicionar = useCallback((dados) => {
    const atividade = {
      ...dados,
      titulo: dados.titulo.trim(),
      descricao: dados.descricao.trim(),
      id: gerarId(),
      criadaEm: new Date().toISOString(),
    }
    dispatch({ tipo: 'adicionar', atividade })
    return atividade
  }, [])

  const editar = useCallback((id, dados) => {
    dispatch({
      tipo: 'editar',
      atividade: { ...dados, id, titulo: dados.titulo.trim(), descricao: dados.descricao.trim() },
    })
  }, [])

  const eliminar = useCallback((id) => dispatch({ tipo: 'eliminar', id }), [])
  const alternarEstado = useCallback((id) => dispatch({ tipo: 'alternarEstado', id }), [])
  const repor = useCallback((lista) => dispatch({ tipo: 'repor', lista }), [])
  const limparAviso = useCallback(() => setAviso(null), [])

  const obter = useCallback((id) => atividades.find((a) => a.id === id), [atividades])

  const valor = useMemo(
    () => ({ atividades, adicionar, editar, eliminar, alternarEstado, repor, obter, aviso, notificar, limparAviso }),
    [atividades, adicionar, editar, eliminar, alternarEstado, repor, obter, aviso, notificar, limparAviso],
  )

  return <ActivitiesContext.Provider value={valor}>{children}</ActivitiesContext.Provider>
}
