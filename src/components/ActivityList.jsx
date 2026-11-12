import ActivityCard from './ActivityCard'
import EmptyState from './EmptyState'

/** Grelha responsiva de atividades: 1 coluna no telemóvel, 2 no tablet, 3 no computador. */
export default function ActivityList({ atividades, onAlternar, onEliminar, haFiltros }) {
  if (atividades.length === 0) {
    return haFiltros ? (
      <EmptyState titulo="Nenhum resultado" texto="Nenhuma atividade corresponde à pesquisa ou aos filtros escolhidos." />
    ) : (
      <EmptyState titulo="Ainda não há atividades" texto="Começa por registar a primeira atividade." mostrarBotao />
    )
  }

  return (
    <div className="row g-3">
      {atividades.map((a) => (
        <div className="col-12 col-md-6 col-xl-4" key={a.id}>
          <ActivityCard atividade={a} onAlternar={onAlternar} onEliminar={onEliminar} />
        </div>
      ))}
    </div>
  )
}
