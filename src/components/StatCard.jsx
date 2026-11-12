/** Cartão de estatística reutilizável (total, pendentes, concluídas...). */
export default function StatCard({ titulo, valor, cor = 'primary', icone }) {
  return (
    <div className="col-6 col-lg-3">
      <div className={`card stat-card border-0 border-start border-4 border-${cor} h-100`}>
        <div className="card-body">
          <div className="text-body-secondary small d-flex align-items-center gap-1">
            <span aria-hidden="true">{icone}</span> {titulo}
          </div>
          <div className={`fs-2 fw-bold text-${cor}`}>{valor}</div>
        </div>
      </div>
    </div>
  )
}
