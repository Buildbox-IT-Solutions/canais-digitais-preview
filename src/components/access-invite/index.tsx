import { twMerge } from '~/lib/tw-merge'
import { Button } from '~/components/button'
import { Icon } from '~/components/icon'
import type { IconName } from '~/components/icon/paths'
import type { IAccessInviteProps } from './types'

/**
 * Componente: Access Invite
 * Convite do menu "Acessar" (deslogado): título + benefícios + ações. Fonte de
 * verdade única de conteúdo — reutilizado no popover (desktop) e no bottom sheet
 * (mobile), garantindo apresentação idêntica. As ações apontam para as mesmas
 * rotas full-page do login/cadastro; os campos ficam lá, não aqui.
 * Tokens: --color-primary-600, --color-neutral-50, --color-neutral-900, --text-headline-sm
 */

/** MVP: apenas estes dois benefícios existem de fato. Não adicionar outros. */
const BENEFITS: { icon: IconName; label: string }[] = [
	{ icon: 'mail', label: 'Newsletters personalizadas' },
	{ icon: 'download', label: 'Downloads de materiais e e-books' },
]

export function AccessInvite({ titleId, variant = 'sheet', className }: IAccessInviteProps) {
	const isPopover = variant === 'popover'
	const titleSize = isPopover ? 'text-title-lg' : 'text-headline-sm'
	const buttonSize = isPopover ? 'small' : 'large'

	return (
		<div className={twMerge('flex flex-col gap-5', className)}>
			<div className="flex flex-col gap-3">
				<h2
					id={titleId}
					className={twMerge('font-display font-bold text-primary-600', titleSize)}
				>
					Entre e aproveite mais
				</h2>

				<ul className="flex flex-col gap-3">
					{BENEFITS.map((benefit) => (
						<li key={benefit.label} className="flex items-center gap-3">
							<span
								className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-neutral-50 text-primary-600"
								aria-hidden="true"
							>
								<Icon name={benefit.icon} className="size-5" />
							</span>
							<span className="font-body text-body-md text-neutral-900">{benefit.label}</span>
						</li>
					))}
				</ul>
			</div>

			<div className="flex flex-col gap-3">
				<Button
					label="Criar conta"
					href="/cadastro"
					type="filled"
					size={buttonSize}
					className="w-full"
				/>
				<Button label="Entrar" href="/login" type="outlined" size={buttonSize} className="w-full" />
			</div>
		</div>
	)
}
