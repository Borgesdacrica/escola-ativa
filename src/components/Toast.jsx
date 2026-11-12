import { useEffect } from 'react'
import { useActivities } from '../context/useActivities'

/** Mensagem de confirmação que desaparece sozinha ao fim de 3 segundos. */
export default function Toast() {
  const { aviso, limparAviso } = useActivities()

  useEffect(() => {
    if (!aviso) return
    const t = setTimeout(limparAviso, 3000)
    return () => clearTimeout(t)
  }, [aviso, limparAviso])

  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3" aria-live="polite" aria-atomic="true">
      {aviso && (
        <div className={`toast show align-items-center text-bg-${aviso.tipo} border-0`} role="status" key={aviso.id}>
          <div className="d-flex">
            <div className="toast-body">{aviso.texto}</div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" aria-label="Fechar" onClick={limparAviso} />
          </div>
        </div>
      )}
    </div>
  )
}
