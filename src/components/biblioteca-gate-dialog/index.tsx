import { IncentiveDownloadDialog } from '~/components/incentive-download-dialog'
import type { IBibliotecaGateDialogProps } from './types'

/**
 * Componente: Biblioteca Gate Dialog — "complete o cadastro para baixar".
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=8296-91809
 *
 * O `IncentiveDownloadDialog` com a copy do gate do acervo: aqui o usuário JÁ tem conta,
 * o que falta é completar o cadastro. Só uma ação — `onLogin` fica de fora, "Entrar" não
 * faz sentido para quem já está logado.
 *
 * Existe como componente próprio desde 2026-08-31, quando o cadeado passou a aparecer
 * também no painel da home: a mesma copy em duas telas é a forma clássica de as duas
 * divergirem no próximo ajuste. **Para o back-end: é um modal só, em dois lugares.**
 *
 * A palavra destacada usa o MESMO recurso dos outros incentivos do portal (`font-bold
 * text-secondary-500`), não `<b>` — com `<b>` ela saía em indigo escuro, indistinguível
 * do resto do título.
 *
 * A copy NÃO conta quantos campos faltam. Número exato obriga a página a calcular, e
 * obriga o back-end a manter esse cálculo sincronizado com a régua de "cadastro
 * completo", para uma informação que não muda o que o usuário faz em seguida. "Poucos
 * campos" é verdade em qualquer quantidade.
 */
export function BibliotecaGateDialog({ open, onCompletarPerfil, onDismiss }: IBibliotecaGateDialogProps) {
	return (
		<IncentiveDownloadDialog
			open={open}
			icon="lock"
			title={
				<>
					Complete seu cadastro para{' '}
					<span className="font-bold text-secondary-500">baixar</span>
				</>
			}
			body="Faltam poucos campos no seu perfil para liberar os downloads da Biblioteca exclusiva."
			primaryLabel="Completar perfil"
			onCreateAccount={onCompletarPerfil}
			onDismiss={onDismiss}
		/>
	)
}
