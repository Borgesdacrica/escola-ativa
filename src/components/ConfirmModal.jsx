import { useEffect, useRef } from 'react'

/** Janela de confirmação reutilizável (usa as classes do Bootstrap, controlada por React). */
export default function ConfirmModal({ aberto, titulo, mensagem, textoConfirmar = 'Confirmar', onConfirmar, onCancelar }) {
  const botaoCancelar = useRef(null)

  useEffect(() => {
    if (!aberto) return
    botaoCancelar.current?.focus()
    const tecla = (e) => e.key === 'Escape' && onCancelar()
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  }, [aberto, onCancelar])

  if (!aberto) return null

  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="modal-titulo" onClick={onCancelar}>
        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title h5" id="modal-titulo">{titulo}</h2>
              <button type="button" className="btn-close" aria-label="Fechar" onClick={onCancelar} />
            </div>
            <div className="modal-body">{mensagem}</div>
            <div className="modal-footer">
              <button ref={botaoCancelar} type="button" className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
              <button type="button" className="btn btn-danger" onClick={onConfirmar}>{textoConfirmar}</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  )
}
