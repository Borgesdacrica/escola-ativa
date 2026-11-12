import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useActivities } from '../context/useActivities'
import { filtrarAtividades } from '../utils/filters'
import SearchFilters from '../components/SearchFilters'
import ActivityList from '../components/ActivityList'
import StatCard from '../components/StatCard'
import ConfirmModal from '../components/ConfirmModal'
import HolidaysWidget from '../components/HolidaysWidget'

const FILTROS_INICIAIS = { pesquisa: '', estado: 'todas', categoria: 'todas', ordem: 'data-asc' }

export default function HomePage() {
  const { atividades, alternarEstado, eliminar, notificar } = useActivities()
  const [filtros, setFiltros] = useState(FILTROS_INICIAIS)
  const [aEliminar, setAEliminar] = useState(null)

  // R4 + R6: a lista é recalculada sempre que os filtros mudam, sem recarregar a página
  const visiveis = useMemo(() => filtrarAtividades(atividades, filtros), [atividades, filtros])

  const total = atividades.length
  const concluidas = atividades.filter((a) => a.estado === 'concluida').length
  const pendentes = total - concluidas
  const progresso = total ? Math.round((concluidas / total) * 100) : 0

  const haFiltros = filtros.pesquisa !== '' || filtros.estado !== 'todas' || filtros.categoria !== 'todas'

  const alternar = (id) => {
    const a = atividades.find((x) => x.id === id)
    alternarEstado(id)
    notificar(a.estado === 'concluida' ? `"${a.titulo}" voltou a pendente.` : `"${a.titulo}" marcada como concluída.`, 'info')
  }

  const confirmarEliminar = () => {
    eliminar(aEliminar.id)
    notificar(`Atividade "${aEliminar.titulo}" eliminada.`, 'danger')
    setAEliminar(null)
  }

  const cancelarEliminar = useCallback(() => setAEliminar(null), [])

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h1 className="h3 mb-0">Atividades escolares</h1>
          <p className="text-body-secondary mb-0">Regista, consulta e gere workshops, visitas, concursos e eventos.</p>
        </div>
        <Link to="/nova" className="btn btn-primary">+ Nova atividade</Link>
      </div>

      <section className="row g-3 mb-3" aria-label="Resumo">
        <StatCard titulo="Total" valor={total} icone="📋" cor="primary" />
        <StatCard titulo="Pendentes" valor={pendentes} icone="⏳" cor="warning" />
        <StatCard titulo="Concluídas" valor={concluidas} icone="✅" cor="success" />
        <StatCard titulo="Progresso" valor={`${progresso}%`} icone="📈" cor="info" />
      </section>

      <HolidaysWidget />

      <SearchFilters filtros={filtros} onChange={setFiltros} onLimpar={() => setFiltros(FILTROS_INICIAIS)} />

      <p className="small text-body-secondary" aria-live="polite">
        A mostrar {visiveis.length} de {total} atividade{total === 1 ? '' : 's'}.
      </p>

      <ActivityList
        atividades={visiveis}
        onAlternar={alternar}
        onEliminar={setAEliminar}
        haFiltros={haFiltros}
      />

      <ConfirmModal
        aberto={Boolean(aEliminar)}
        titulo="Eliminar atividade"
        mensagem={aEliminar && <>Tens a certeza que queres eliminar <strong>{aEliminar.titulo}</strong>? Esta ação não pode ser desfeita.</>}
        textoConfirmar="Eliminar"
        onConfirmar={confirmarEliminar}
        onCancelar={cancelarEliminar}
      />
    </>
  )
}
