import { useState } from 'react'
import { CATEGORIAS, ESTADOS, LIMITES } from '../utils/constants'
import { validarAtividade } from '../utils/validation'

const VAZIO = {
  titulo: '',
  descricao: '',
  data: '',
  estado: 'pendente',
  categoria: '',
  local: '',
}

/**
 * Formulário reutilizável: serve para criar e para editar atividades.
 * R5 - não deixa submeter enquanto houver campos obrigatórios em falta.
 */
export default function ActivityForm({ valoresIniciais, textoBotao = 'Guardar', onSubmeter, onCancelar }) {
  const [dados, setDados] = useState({ ...VAZIO, ...valoresIniciais })
  const [erros, setErros] = useState({})
  const [tocados, setTocados] = useState({})

  const alterar = (e) => {
    const { name, value } = e.target
    const novos = { ...dados, [name]: value }
    setDados(novos)
    // depois de o campo ser tocado, a validação acontece enquanto o utilizador escreve
    if (tocados[name]) setErros(validarAtividade(novos))
  }

  const sair = (e) => {
    setTocados((t) => ({ ...t, [e.target.name]: true }))
    setErros(validarAtividade(dados))
  }

  const submeter = (e) => {
    e.preventDefault()
    const encontrados = validarAtividade(dados)
    setErros(encontrados)
    setTocados({ titulo: true, descricao: true, data: true, estado: true, categoria: true })
    if (Object.keys(encontrados).length > 0) {
      // coloca o foco no primeiro campo com erro (acessibilidade)
      const primeiro = Object.keys(encontrados)[0]
      document.getElementById(`campo-${primeiro}`)?.focus()
      return
    }
    onSubmeter(dados)
  }

  const mostrarErro = (campo) => tocados[campo] && erros[campo]
  const classeCampo = (campo, base = 'form-control') => `${base} ${mostrarErro(campo) ? 'is-invalid' : ''}`

  return (
    <form noValidate onSubmit={submeter} className="card card-body shadow-sm" aria-describedby="nota-obrigatorios">
      <p id="nota-obrigatorios" className="small text-body-secondary">
        Os campos assinalados com <span className="text-danger">*</span> são obrigatórios.
      </p>

      <div className="mb-3">
        <label htmlFor="campo-titulo" className="form-label">Título <span className="text-danger">*</span></label>
        <input
          id="campo-titulo"
          name="titulo"
          className={classeCampo('titulo')}
          value={dados.titulo}
          onChange={alterar}
          onBlur={sair}
          maxLength={LIMITES.tituloMax}
          aria-invalid={Boolean(mostrarErro('titulo'))}
          aria-describedby="erro-titulo"
        />
        <div id="erro-titulo" className="invalid-feedback">{erros.titulo}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="campo-descricao" className="form-label">Descrição <span className="text-danger">*</span></label>
        <textarea
          id="campo-descricao"
          name="descricao"
          rows="4"
          className={classeCampo('descricao')}
          value={dados.descricao}
          onChange={alterar}
          onBlur={sair}
          maxLength={LIMITES.descricaoMax}
          aria-invalid={Boolean(mostrarErro('descricao'))}
          aria-describedby="erro-descricao contador-descricao"
        />
        <div id="contador-descricao" className="form-text text-end">
          {dados.descricao.length}/{LIMITES.descricaoMax}
        </div>
        <div id="erro-descricao" className="invalid-feedback d-block">{mostrarErro('descricao') && erros.descricao}</div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-sm-6">
          <label htmlFor="campo-data" className="form-label">Data <span className="text-danger">*</span></label>
          <input
            id="campo-data"
            type="date"
            name="data"
            className={classeCampo('data')}
            value={dados.data}
            onChange={alterar}
            onBlur={sair}
            aria-invalid={Boolean(mostrarErro('data'))}
            aria-describedby="erro-data"
          />
          <div id="erro-data" className="invalid-feedback">{erros.data}</div>
        </div>
        <div className="col-12 col-sm-6">
          <label htmlFor="campo-categoria" className="form-label">Categoria <span className="text-danger">*</span></label>
          <select
            id="campo-categoria"
            name="categoria"
            className={classeCampo('categoria', 'form-select')}
            value={dados.categoria}
            onChange={alterar}
            onBlur={sair}
            aria-invalid={Boolean(mostrarErro('categoria'))}
            aria-describedby="erro-categoria"
          >
            <option value="">— Escolher —</option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div id="erro-categoria" className="invalid-feedback">{erros.categoria}</div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6">
          <label htmlFor="campo-local" className="form-label">Local <span className="text-body-secondary small">(opcional)</span></label>
          <input id="campo-local" name="local" className="form-control" value={dados.local} onChange={alterar} maxLength={80} />
        </div>
        <fieldset className="col-12 col-sm-6">
          <legend className="form-label fs-6">Estado <span className="text-danger">*</span></legend>
          {Object.entries(ESTADOS).map(([valor, texto]) => (
            <div className="form-check form-check-inline" key={valor}>
              <input
                className="form-check-input"
                type="radio"
                name="estado"
                id={`campo-estado-${valor}`}
                value={valor}
                checked={dados.estado === valor}
                onChange={alterar}
              />
              <label className="form-check-label" htmlFor={`campo-estado-${valor}`}>{texto}</label>
            </div>
          ))}
          {erros.estado && <div className="text-danger small">{erros.estado}</div>}
        </fieldset>
      </div>

      <div className="d-flex gap-2 justify-content-end">
        {onCancelar && (
          <button type="button" className="btn btn-outline-secondary" onClick={onCancelar}>Cancelar</button>
        )}
        <button type="submit" className="btn btn-primary">{textoBotao}</button>
      </div>
    </form>
  )
}
