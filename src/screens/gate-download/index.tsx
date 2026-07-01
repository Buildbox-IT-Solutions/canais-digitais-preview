import { Modal } from '~/components/modal'
import ConteudoScreen from '../conteudo'

/**
 * Tela: Gate de Download
 * Modal sobre ConteudoScreen que controla o acesso ao download de materiais.
 * Regra mock: e-mails com "+existe" → existente (state=waiting); demais → novo (/cadastro-v2).
 * Estados: ?state=email|waiting · ?error=invalido|vazio|nao-recebi · ?email=...
 * Tokens: --color-primary-600, --color-secondary-500, --color-secondary-950, --color-neutral-*
 */
export default function GateDownloadScreen() {
  return (
    <>
      <ConteudoScreen />
      <Modal open size="md" closeHref="/conteudo" labelledById="gate-title">
        <p id="gate-title" className="font-display font-bold text-headline-sm text-primary-600">
          Gate placeholder
        </p>
      </Modal>
    </>
  )
}
