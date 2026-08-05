import { twMerge } from '~/lib/tw-merge'
import { GoogleLogo } from '~/components/google-logo'
import type { ISocialButtonProps } from './types'

/**
 * Componente: Social Button
 * Figma: 6268:18404 (LinkedIn) e 6268:18405 (Google)
 * Outlined pill com brand icon 24px + "Continuar com {provider}".
 * Tokens: --color-primary-600
 */

const DEFAULT_LABEL = {
	linkedin: 'Continuar com LinkedIn',
	google: 'Continuar com Google',
} as const

// Badge de marca (LinkedIn oficial: quadrado azul + glifo branco) — propositalmente
// diferente do glifo mono usado em `Icon name="linkedin"` (contexto de navegação/social,
// não de botão de login). Não são a mesma peça visual.
const LinkedInIcon = (
	<svg className="size-6 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
		<rect width="24" height="24" rx="3" fill="#0A66C2" />
		<path
			fill="white"
			d="M7.5 9.5h2.1v8H7.5zm1.05-3.5a1.22 1.22 0 1 0 0 2.44 1.22 1.22 0 0 0 0-2.44zM11.5 9.5h2v1.07h.03c.28-.5 1-1.07 2.05-1.07 2.2 0 2.6 1.45 2.6 3.34V17.5h-2.16v-3.66c0-.87-.02-2-1.22-2-1.22 0-1.4.95-1.4 1.94v3.72H11.5z"
		/>
	</svg>
)

const GoogleIcon = <GoogleLogo className="size-6 shrink-0" />

export function SocialButton({
	provider,
	href,
	label,
	onClick,
	iconOnly = false,
	className,
}: ISocialButtonProps) {
	const finalLabel = label ?? DEFAULT_LABEL[provider]
	const classes = twMerge(
		'inline-flex items-center justify-center w-full rounded-full bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2',
		iconOnly
			? 'h-12 p-3 border-[1.5px] border-neutral-100 hover:bg-black/[0.04]'
			: 'gap-3 h-12 px-5 border-[1.5px] border-neutral-100 hover:bg-black/[0.04] font-body font-bold text-body-lg text-primary-600',
		className,
	)
	const iconNode = provider === 'linkedin' ? LinkedInIcon : GoogleIcon
	const content = iconOnly ? (
		iconNode
	) : (
		<>
			{iconNode}
			<span>{finalLabel}</span>
		</>
	)
	const a11yLabel = iconOnly ? finalLabel : undefined

	if (href) {
		return (
			<a href={href} className={classes} aria-label={a11yLabel}>
				{content}
			</a>
		)
	}

	return (
		<button type="button" onClick={onClick} className={classes} aria-label={a11yLabel}>
			{content}
		</button>
	)
}
