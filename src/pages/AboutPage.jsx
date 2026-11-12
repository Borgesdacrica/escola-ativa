import { useCallback, useState } from 'react'
import { useActivities } from '../context/useActivities'
import ConfirmModal from '../components/ConfirmModal'
import { ATIVIDADES_EXEMPLO } from '../utils/seed'

const TECNOLOGIAS = [
  { nome: 'React 19', papel: 'Biblioteca de interface: componentes, estado (useState, useReducer) e Context API.' },
  { nome: 'React Router 7', papel: 'Navegação entre páginas sem recarregar (SPA).' },
  { nome: 'Bootstrap 5', papel: 'Framework CSS: grelha responsiva, formulários, cartões e utilitários.' },
  { nome: 'Vite 6', papel: 'Ferramenta de desenvolvimento e build (servidor rápido com recarregamento automático).' },
  { nome: 'Vitest + Testing Library', papel: 'Testes automáticos da lógica e dos componentes.' },
  { nome: 'localStorage', papel: 'Persistência das atividades no navegador.' },
]

export default function AboutPage() {
  const { atividades, repor, notificar } = useActivities()
  const [confirmar, setConfirmar] = useState(null) // 'exemplos' | 'limpar'
  const fechar = useCallback(() => setConfirmar(null), [])

  const exportar = () => {
    const blob = new Blob([JSON.stringify(atividades, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'escolaativa-atividades.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const aplicar = () => {
    if (confirmar === 'exemplos') {
      repor(ATIVIDADES_EXEMPLO)
      notificar('Atividades de exemplo repostas.')
    } else {
      repor([])
      notificar('Todas as atividades foram apagadas.', 'danger')
    }
    setConfirmar(null)
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-9">
        <h1 className="h3">Sobre a EscolaAtiva</h1>
        <p>
          Aplicação Web para organizar atividades escolares, desenvolvida no âmbito da disciplina de
          Construção de Páginas Web (12.º ano). Funciona inteiramente no navegador e não precisa de servidor.
        </p>

        <h2 className="h5 mt-4">Tecnologias utilizadas</h2>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr><th scope="col">Tecnologia</th><th scope="col">Para que serve no projeto</th></tr>
            </thead>
            <tbody>
              {TECNOLOGIAS.map((t) => (
                <tr key={t.nome}><th scope="row">{t.nome}</th><td>{t.papel}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="h5 mt-4">Dados</h2>
        <p className="text-body-secondary">
          As {atividades.length} atividades estão guardadas no <code>localStorage</code> deste navegador.
        </p>
        <div className="d-flex flex-wrap gap-2">
          <button type="button" className="btn btn-outline-primary" onClick={exportar}>Exportar (JSON)</button>
          <button type="button" className="btn btn-outline-secondary" onClick={() => setConfirmar('exemplos')}>Repor exemplos</button>
          <button type="button" className="btn btn-outline-danger" onClick={() => setConfirmar('limpar')}>Apagar tudo</button>
        </div>
      </div>

      <ConfirmModal
        aberto={Boolean(confirmar)}
        titulo={confirmar === 'limpar' ? 'Apagar todas as atividades' : 'Repor atividades de exemplo'}
        mensagem="As atividades atuais serão substituídas. Esta ação não pode ser desfeita."
        textoConfirmar={confirmar === 'limpar' ? 'Apagar tudo' : 'Repor'}
        onConfirmar={aplicar}
        onCancelar={fechar}
      />
    </div>
  )
}
