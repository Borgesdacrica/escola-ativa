import { useNavigate, useParams } from 'react-router-dom'
import { useActivities } from '../context/useActivities'
import ActivityForm from '../components/ActivityForm'
import EmptyState from '../components/EmptyState'

export default function EditActivityPage() {
  const { id } = useParams()
  const { obter, editar, notificar } = useActivities()
  const navegar = useNavigate()
  const atividade = obter(id)

  if (!atividade) {
    return <EmptyState titulo="Atividade não encontrada" texto="Pode ter sido eliminada." mostrarBotao />
  }

  const guardar = (dados) => {
    editar(id, dados)
    notificar(`Atividade "${dados.titulo.trim()}" atualizada.`)
    navegar('/')
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8">
        <h1 className="h3 mb-3">Editar atividade</h1>
        {/* key garante que o formulário é recriado se mudarmos de atividade */}
        <ActivityForm
          key={id}
          valoresIniciais={atividade}
          textoBotao="Guardar alterações"
          onSubmeter={guardar}
          onCancelar={() => navegar('/')}
        />
      </div>
    </div>
  )
}
