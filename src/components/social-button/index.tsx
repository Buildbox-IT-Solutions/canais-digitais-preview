import { twMerge } from 'tailwind-merge'
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

const LinkedInIcon = (
	<svg className="size-6 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
		<rect width="24" height="24" rx="3" fill="#0A66C2" />
		<path
			fill="white"
			d="M7.5 9.5h2.1v8H7.5zm1.05-3.5a1.22 1.22 0 1 0 0 2.44 1.22 1.22 0 0 0 0-2.44zM11.5 9.5h2v1.07h.03c.28-.5 1-1.07 2.05-1.07 2.2 0 2.6 1.45 2.6 3.34V17.5h-2.16v-3.66c0-.87-.02-2-1.22-2-1.22 0-1.4.95-1.4 1.94v3.72H11.5z"
		/>
	</svg>
)

const GoogleIcon = (
	<svg className="size-6 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
		<path
			fill="#4285F4"
			d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
		/>
		<path
			fill="#34A853"
			d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
		/>
		<path
			fill="#FBBC05"
			d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
		/>
		<path
			fill="#EA4335"
			d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
		/>
	</svg>
)

export function SocialButton({
	provider,
	href,
	label,
	onClick,
	className,
}: ISocialButtonProps) {
	const finalLabel = label ?? DEFAULT_LABEL[provider]
	const classes = twMerge(
		'inline-flex items-center justify-center gap-3 w-full h-12 px-5 rounded-full border-[1.5px] border-primary-600 bg-white hover:bg-primary-600/[0.04] transition-colors font-body font-bold text-body-lg text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2',
		className,
	)
	const iconNode = provider === 'linkedin' ? LinkedInIcon : GoogleIcon

	if (href) {
		return (
			<a href={href} className={classes}>
				{iconNode}
				<span>{finalLabel}</span>
			</a>
		)
	}

	return (
		<button type="button" onClick={onClick} className={classes}>
			{iconNode}
			<span>{finalLabel}</span>
		</button>
	)
}
