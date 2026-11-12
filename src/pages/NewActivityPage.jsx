import { useNavigate } from 'react-router-dom'
import { useActivities } from '../context/useActivities'
import ActivityForm from '../components/ActivityForm'

export default function NewActivityPage() {
  const { adicionar, notificar } = useActivities()
  const navegar = useNavigate()

  const guardar = (dados) => {
    const nova = adicionar(dados)
    notificar(`Atividade "${nova.titulo}" adicionada.`)
    navegar('/')
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8">
        <h1 className="h3 mb-3">Nova atividade</h1>
        <ActivityForm textoBotao="Adicionar atividade" onSubmeter={guardar} onCancelar={() => navegar('/')} />
      </div>
    </div>
  )
}
