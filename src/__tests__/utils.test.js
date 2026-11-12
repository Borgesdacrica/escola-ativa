import { describe, expect, it } from 'vitest'
import { validarAtividade, eValida } from '../utils/validation'
import { filtrarAtividades, formatarData, normalizar } from '../utils/filters'
import { carregarAtividades, guardarAtividades } from '../utils/storage'
import { STORAGE_KEY } from '../utils/constants'

const valida = {
  titulo: 'Feira de Ciência',
  descricao: 'Exposição de projetos dos alunos.',
  data: '2026-12-01',
  estado: 'pendente',
  categoria: 'Evento',
}

describe('validarAtividade (R5)', () => {
  it('aceita uma atividade completa', () => {
    expect(validarAtividade(valida)).toEqual({})
    expect(eValida(valida)).toBe(true)
  })

  it('rejeita formulário vazio com erro em todos os campos obrigatórios', () => {
    const erros = validarAtividade({})
    expect(Object.keys(erros).sort()).toEqual(['categoria', 'data', 'descricao', 'estado', 'titulo'])
  })

  it('rejeita título só com espaços', () => {
    expect(validarAtividade({ ...valida, titulo: '    ' }).titulo).toMatch(/obrigatório/)
  })

  it('rejeita título e descrição demasiado curtos', () => {
    const erros = validarAtividade({ ...valida, titulo: 'ab', descricao: 'curta' })
    expect(erros.titulo).toBeDefined()
    expect(erros.descricao).toBeDefined()
  })

  it('rejeita datas inválidas e estados desconhecidos', () => {
    expect(validarAtividade({ ...valida, data: '31-12-2026' }).data).toBeDefined()
    expect(validarAtividade({ ...valida, estado: 'cancelada' }).estado).toBeDefined()
  })
})

describe('filtrarAtividades (R4)', () => {
  const lista = [
    { id: '1', titulo: 'Visita à Fábrica', data: '2026-12-10', estado: 'pendente', categoria: 'Visita de estudo' },
    { id: '2', titulo: 'Concurso de Robótica', data: '2026-11-20', estado: 'concluida', categoria: 'Concurso' },
    { id: '3', titulo: 'Workshop React', data: '2026-11-25', estado: 'pendente', categoria: 'Workshop' },
  ]

  it('pesquisa por título ignorando maiúsculas e acentos', () => {
    expect(filtrarAtividades(lista, { pesquisa: 'ROBOTICA' }).map((a) => a.id)).toEqual(['2'])
    expect(filtrarAtividades(lista, { pesquisa: 'fabrica' }).map((a) => a.id)).toEqual(['1'])
  })

  it('filtra por estado', () => {
    expect(filtrarAtividades(lista, { estado: 'pendente' })).toHaveLength(2)
    expect(filtrarAtividades(lista, { estado: 'concluida' })).toHaveLength(1)
  })

  it('combina filtros e ordena', () => {
    expect(filtrarAtividades(lista, { estado: 'pendente', ordem: 'data-desc' }).map((a) => a.id)).toEqual(['1', '3'])
    expect(filtrarAtividades(lista, { ordem: 'titulo-asc' }).map((a) => a.id)).toEqual(['2', '1', '3'])
  })

  it('não altera a lista original', () => {
    const copia = [...lista]
    filtrarAtividades(lista, { ordem: 'titulo-desc' })
    expect(lista).toEqual(copia)
  })
})

describe('utilitários', () => {
  it('formata datas', () => {
    expect(formatarData('2026-11-24')).toBe('24/11/2026')
  })
  it('normaliza texto', () => {
    expect(normalizar('  Ação ')).toBe('acao')
  })
})

describe('localStorage (R7)', () => {
  it('guarda e recupera atividades', () => {
    guardarAtividades([valida])
    expect(carregarAtividades()).toEqual([valida])
  })

  it('devolve null quando os dados estão corrompidos', () => {
    localStorage.setItem(STORAGE_KEY, '{isto não é json')
    expect(carregarAtividades()).toBeNull()
  })
})
