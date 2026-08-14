import type { ReactNode } from 'react'
import type { IconName } from '~/components/icon/paths'

export interface IIncentiveDownloadDialogProps {
	open: boolean
	onCreateAccount: () => void
	/** Botão secundário só aparece se vier. Download e favoritos passam os dois — opcional só por segurança de API. */
	onLogin?: () => void
	onDismiss: () => void
	/** StatusRing — default `'download'` (comportamento atual, inalterado). */
	icon?: IconName
	/** ReactNode (não `string`) pra preservar o trecho em negrito do texto de download ("...para <b>baixar</b>"). */
	title?: ReactNode
	body?: string
	primaryLabel?: string
	/** Só usado quando `onLogin` vier. */
	secondaryLabel?: string
}
