import type { CSSProperties, ReactNode } from 'react'

/**
 * Primitivas de PREVIEW de e-mail transacional.
 * Reproduzem fielmente os templates HTML de docs/legacy-reference/emails/ — por isso usam
 * inline styles + cores hex + fonte Georgia (e-mails não suportam Tailwind/tokens; os devs
 * enviam o HTML). Exceção consciente à regra "só Tailwind" da codebase, restrita a e-mails.
 */

const INK = '#283857'
const INK_SOFT = '#5A6E8F'
const INK_MUTED = '#8391A9'
const LINK = '#003CB2'
const NAVY = '#002244'
const BG = '#F7F8FA'
const LINE = '#D6D8DD'
const SANS = "'Open Sans', Arial, sans-serif"
const SERIF = 'Georgia, serif'

export function EmailShell({
	brand = 'Food Connection',
	children,
	showUnsubscribe = true,
}: {
	brand?: string
	children: ReactNode
	showUnsubscribe?: boolean
}) {
	return (
		<div style={{ background: BG, minHeight: '100vh', padding: '24px 16px', fontFamily: SANS, color: INK }}>
			<div style={{ maxWidth: 600, margin: '0 auto', background: '#FFFFFF', borderRadius: 8, overflow: 'hidden' }}>
				<div style={{ background: NAVY, padding: 24, textAlign: 'center' }}>
					<span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 22, color: '#FFFFFF', letterSpacing: '0.2px' }}>
						{brand}
					</span>
				</div>

				{children}

				<div style={{ background: BG, padding: '24px 32px', borderTop: `1px solid ${LINE}`, textAlign: 'center' }}>
					<p style={{ margin: '0 0 8px 0', fontSize: 12, lineHeight: 1.6, color: INK_SOFT }}>
						<a href="#" style={{ color: INK_SOFT, textDecoration: 'underline' }}>Política de Privacidade</a>
						{' · '}
						<a href="#" style={{ color: INK_SOFT, textDecoration: 'underline' }}>Termos de Uso</a>
						{showUnsubscribe ? (
							<>
								{' · '}
								<a href="#" style={{ color: INK_SOFT, textDecoration: 'underline' }}>Descadastrar</a>
							</>
						) : null}
					</p>
					<p style={{ margin: 0, fontSize: 11, lineHeight: 1.6, color: INK_MUTED }}>
						Informa Markets Brasil — Rua Bela Cintra, 967, Consolação, São Paulo/SP, 01415-000
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
		<h1 style={{ margin: '0 0 16px 0', fontFamily: SERIF, fontWeight: 700, fontSize: 28, lineHeight: 1.2, color: INK }}>
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
	return (
		<div style={{ padding: '24px 32px 32px 32px' }}>
			<p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: INK_MUTED }}>{children}</p>
		</div>
	)
}
