import { CATEGORIAS, ESTADOS } from '../utils/constants'

/** Barra de pesquisa por título, filtros (estado, categoria) e ordenação. */
export default function SearchFilters({ filtros, onChange, onLimpar }) {
  const alterar = (campo) => (e) => onChange({ ...filtros, [campo]: e.target.value })

  return (
    <form className="card card-body mb-4 filters" role="search" onSubmit={(e) => e.preventDefault()}>
      <div className="row g-2 align-items-end">
        <div className="col-12 col-lg-4">
          <label htmlFor="pesquisa" className="form-label small fw-semibold">Pesquisar por título</label>
          <input
            id="pesquisa"
            type="search"
            className="form-control"
            placeholder="Ex.: robótica"
            value={filtros.pesquisa}
            onChange={alterar('pesquisa')}
          />
        </div>
        <div className="col-6 col-lg-2">
          <label htmlFor="filtro-estado" className="form-label small fw-semibold">Estado</label>
          <select id="filtro-estado" className="form-select" value={filtros.estado} onChange={alterar('estado')}>
            <option value="todas">Todos</option>
            {Object.entries(ESTADOS).map(([valor, texto]) => (
              <option key={valor} value={valor}>{texto}</option>
            ))}
          </select>
        </div>
        <div className="col-6 col-lg-2">
          <label htmlFor="filtro-categoria" className="form-label small fw-semibold">Categoria</label>
          <select id="filtro-categoria" className="form-select" value={filtros.categoria} onChange={alterar('categoria')}>
            <option value="todas">Todas</option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="col-8 col-lg-3">
          <label htmlFor="ordem" className="form-label small fw-semibold">Ordenar por</label>
          <select id="ordem" className="form-select" value={filtros.ordem} onChange={alterar('ordem')}>
            <option value="data-asc">Data (mais próxima)</option>
            <option value="data-desc">Data (mais distante)</option>
            <option value="titulo-asc">Título (A-Z)</option>
            <option value="titulo-desc">Título (Z-A)</option>
          </select>
        </div>
        <div className="col-4 col-lg-1 d-grid">
          <button type="button" className="btn btn-outline-secondary" onClick={onLimpar}>Limpar</button>
        </div>
      </div>
    </form>
  )
}
