import { Children } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import foodConnectionLogoWhite from '~/assets/images/FC-Grad-White_rgb@2x.png'

/**
 * Primitivas de PREVIEW de e-mail transacional.
 * Reproduzem fielmente os templates HTML de docs/legacy-reference/emails/ — por isso usam
 * inline styles + cores hex (e-mails não suportam Tailwind/tokens; os devs enviam o HTML).
 * Exceção consciente à regra "só Tailwind" da codebase, restrita a e-mails.
 */

const INK = '#283857'
const INK_SOFT = '#5A6E8F'
const INK_MUTED = '#8391A9'
const LINK = '#003CB2'
const NAVY = '#002244'
const BG = '#F7F8FA'
const LINE = '#D6D8DD'
const SANS = "'Open Sans', Arial, sans-serif"

export function EmailShell({
	brand = 'Food Connection',
	children,
}: {
	brand?: string
	children: ReactNode
}) {
	return (
		<div style={{ background: BG, minHeight: '100vh', padding: '24px 16px', fontFamily: SANS, color: INK }}>
			<div style={{ maxWidth: 600, margin: '0 auto', background: '#FFFFFF', borderRadius: 8, overflow: 'hidden' }}>
				<div style={{ background: NAVY, padding: 24, textAlign: 'center' }}>
					<img
						src={foodConnectionLogoWhite}
						alt={brand}
						width={170}
						height={59}
						style={{ display: 'block', margin: '0 auto', width: 170, height: 'auto' }}
					/>
				</div>

				{children}

				<div style={{ background: BG, padding: '24px 32px', borderTop: `1px solid ${LINE}`, textAlign: 'center' }}>
					<p style={{ margin: 0, fontSize: 11, lineHeight: 1.6, color: INK_MUTED }}>
						© 2026 Informa Markets Brasil — Av. Dra. Ruth Cardoso, 7221, Edifício Birmann 21 —
						Pinheiros, São Paulo/SP, 05425-902
					</p>
				</div>
			</div>
		</div>
	)
}

export function EmailBody({ children, style }: { children: ReactNode; style?: CSSProperties }) {
	return <div style={{ padding: '40px 32px 8px 32px', ...style }}>{children}</div>
}

export function EmailH1({ children }: { children: ReactNode }) {
	return (
		<h1 style={{ margin: '0 0 16px 0', fontFamily: SANS, fontWeight: 700, fontSize: 28, lineHeight: 1.2, color: INK }}>
			{children}
		</h1>
	)
}

export function EmailP({ children }: { children: ReactNode }) {
	return <p style={{ margin: '0 0 16px 0', fontSize: 16, lineHeight: 1.5, color: INK_SOFT }}>{children}</p>
}

export function EmailPMuted({ children }: { children: ReactNode }) {
	return <p style={{ margin: '0 0 8px 0', fontSize: 14, lineHeight: 1.5, color: INK_MUTED }}>{children}</p>
}

export function EmailStrong({ children }: { children: ReactNode }) {
	return <strong style={{ color: INK }}>{children}</strong>
}

export function EmailButton({ href = '#', label }: { href?: string; label: string }) {
	return (
		<div style={{ padding: '16px 32px 24px 32px', textAlign: 'center' }}>
			<a
				href={href}
				style={{
					display: 'inline-block',
					padding: '14px 32px',
					background: NAVY,
					borderRadius: 9999,
					fontFamily: SANS,
					fontSize: 16,
					fontWeight: 700,
					color: '#FFFFFF',
					textDecoration: 'none',
				}}
			>
				{label}
			</a>
		</div>
	)
}

export function EmailLink({ href, children }: { href: string; children: ReactNode }) {
	return (
		<a href={href} style={{ color: LINK, textDecoration: 'underline' }}>
			{children}
		</a>
	)
}

export function EmailFallback({ href = '#' }: { href?: string }) {
	return (
		<div style={{ padding: '0 32px 24px 32px' }}>
			<p style={{ margin: '0 0 8px 0', fontSize: 13, lineHeight: 1.5, color: INK_MUTED }}>
				Se o botão não funcionar, copie e cole este endereço no seu navegador:
			</p>
			<p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: LINK, wordBreak: 'break-all' }}>
				<a href={href} style={{ color: LINK, textDecoration: 'underline' }}>{href}</a>
			</p>
		</div>
	)
}

export function EmailDivider() {
	return (
		<div style={{ padding: '0 32px' }}>
			<div style={{ height: 1, background: LINE, lineHeight: '1px', fontSize: 0 }}>&nbsp;</div>
		</div>
	)
}

export function EmailNote({ children }: { children: ReactNode }) {
	const paragraphs = Children.toArray(children)
	return (
		<div style={{ padding: '24px 32px 32px 32px' }}>
			{paragraphs.map((paragraph, i) => (
				<p
					key={i}
					style={{
						margin: i === paragraphs.length - 1 ? 0 : '0 0 8px 0',
						fontSize: 13,
						lineHeight: 1.5,
						color: INK_MUTED,
					}}
				>
					{paragraph}
				</p>
			))}
		</div>
	)
}
