import { ESTADOS, LIMITES } from './constants'

/**
 * Valida os dados de uma atividade.
 * Devolve um objeto { campo: 'mensagem de erro' }.
 * Se o objeto estiver vazio, os dados são válidos.
 */
export function validarAtividade(dados) {
  const erros = {}
  const titulo = (dados.titulo ?? '').trim()
  const descricao = (dados.descricao ?? '').trim()
  const data = (dados.data ?? '').trim()

  if (!titulo) {
    erros.titulo = 'O título é obrigatório.'
  } else if (titulo.length < LIMITES.tituloMin) {
    erros.titulo = `O título deve ter pelo menos ${LIMITES.tituloMin} caracteres.`
  } else if (titulo.length > LIMITES.tituloMax) {
    erros.titulo = `O título não pode ter mais de ${LIMITES.tituloMax} caracteres.`
  }

  if (!descricao) {
    erros.descricao = 'A descrição é obrigatória.'
  } else if (descricao.length < LIMITES.descricaoMin) {
    erros.descricao = `A descrição deve ter pelo menos ${LIMITES.descricaoMin} caracteres.`
  } else if (descricao.length > LIMITES.descricaoMax) {
    erros.descricao = `A descrição não pode ter mais de ${LIMITES.descricaoMax} caracteres.`
  }

  if (!data) {
    erros.data = 'A data é obrigatória.'
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(data) || Number.isNaN(new Date(data).getTime())) {
    erros.data = 'Indica uma data válida.'
  }

  if (!Object.keys(ESTADOS).includes(dados.estado)) {
    erros.estado = 'Escolhe um estado válido.'
  }

  if (!dados.categoria) {
    erros.categoria = 'Escolhe uma categoria.'
  }

  return erros
}

export function eValida(dados) {
  return Object.keys(validarAtividade(dados)).length === 0
}
