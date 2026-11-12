import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import { ActivitiesProvider } from '../context/ActivitiesContext'
import { STORAGE_KEY } from '../utils/constants'

function renderApp(rota = '/') {
  return render(
    <MemoryRouter initialEntries={[rota]}>
      <ActivitiesProvider>
        <App />
      </ActivitiesProvider>
    </MemoryRouter>,
  )
}

beforeEach(() => {
  // a API de feriados não é chamada nos testes
  vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))
})

const guardadas = () => JSON.parse(localStorage.getItem(STORAGE_KEY))

describe('EscolaAtiva - fluxo completo', () => {
  it('mostra as atividades de exemplo na primeira utilização', () => {
    renderApp()
    expect(screen.getByText('Concurso de Robótica')).toBeInTheDocument()
    expect(screen.getByText(/A mostrar 3 de 3/)).toBeInTheDocument()
  })

  it('não deixa adicionar uma atividade com campos em falta (R5)', () => {
    renderApp('/nova')
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar atividade' }))
    expect(screen.getByText('O título é obrigatório.')).toBeInTheDocument()
    expect(screen.getByText('A data é obrigatória.')).toBeInTheDocument()
    // continua na página do formulário e nada foi guardado
    expect(screen.getByRole('heading', { name: 'Nova atividade' })).toBeInTheDocument()
    expect(guardadas()).toHaveLength(3)
  })

  it('adiciona, edita e elimina uma atividade (R3, R6, R7)', () => {
    renderApp('/nova')

    // adicionar
    fireEvent.change(screen.getByLabelText(/Título/), { target: { value: 'Feira do Livro' } })
    fireEvent.change(screen.getByLabelText(/Descrição/), { target: { value: 'Venda de livros na biblioteca.' } })
    fireEvent.change(screen.getByLabelText(/^Data/), { target: { value: '2026-12-15' } })
    fireEvent.change(screen.getByLabelText(/Categoria/), { target: { value: 'Evento' } })
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar atividade' }))

    expect(screen.getByText('Feira do Livro')).toBeInTheDocument()
    expect(guardadas()).toHaveLength(4)

    // editar
    fireEvent.click(screen.getByRole('link', { name: 'Editar Feira do Livro' }))
    const titulo = screen.getByLabelText(/Título/)
    expect(titulo).toHaveValue('Feira do Livro')
    fireEvent.change(titulo, { target: { value: 'Feira do Livro 2026' } })
    fireEvent.click(screen.getByLabelText('Concluída'))
    fireEvent.click(screen.getByRole('button', { name: 'Guardar alterações' }))
    expect(screen.getByText('Feira do Livro 2026')).toBeInTheDocument()
    expect(guardadas().find((a) => a.titulo === 'Feira do Livro 2026').estado).toBe('concluida')

    // eliminar (com confirmação)
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar Feira do Livro 2026' }))
    const dialogo = screen.getByRole('dialog')
    fireEvent.click(within(dialogo).getByRole('button', { name: 'Eliminar' }))
    expect(screen.queryByText('Feira do Livro 2026')).not.toBeInTheDocument()
    expect(guardadas()).toHaveLength(3)
  })

  it('pesquisa por título e filtra por estado sem recarregar (R4)', () => {
    renderApp()
    fireEvent.change(screen.getByLabelText('Pesquisar por título'), { target: { value: 'robotica' } })
    expect(screen.getByText(/A mostrar 1 de 3/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Limpar' }))
    fireEvent.change(screen.getByLabelText('Estado'), { target: { value: 'concluida' } })
    expect(screen.getByText(/A mostrar 1 de 3/)).toBeInTheDocument()
    expect(screen.getByText('Visita de estudo ao Pavilhão do Conhecimento')).toBeInTheDocument()
  })

  it('recupera as atividades do localStorage ao reabrir (R7)', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([{ id: 'x', titulo: 'Atividade guardada', descricao: 'Guardada antes.', data: '2026-12-01', estado: 'pendente', categoria: 'Outra' }]),
    )
    renderApp()
    expect(screen.getByText('Atividade guardada')).toBeInTheDocument()
    expect(screen.getByText(/A mostrar 1 de 1/)).toBeInTheDocument()
  })
})
