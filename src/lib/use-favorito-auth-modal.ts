/**
 * Estado + navegação do modal de auth exibido quando um usuário deslogado clica em
 * favoritar (feature Favoritos) — usado por NewsCard e CategoryColumn, os dois
 * lugares que chamam `useFavoritoToggle` diretamente. Local por card de propósito:
 * cada card carrega seu próprio `open` (o `IncentiveDownloadDialog` retorna `null`
 * fechado, custo de DOM zero), sem precisar subir estado pra tela.
 *
 * `onCreateAccount` (primário) navega pra `/cadastro`, `onLogin` (secundário) navega
 * pra `/login` — os dois levando a MESMA intenção (`intent=favoritar` +
 * `favoritar=<contentId>`) e o mesmo retorno (`returnTo=<path atual>`), porque quem
 * entra por login também precisa voltar com o favorito aplicado. Ver
 * src/lib/use-favorito-toggle.ts pra como a intenção é retomada na volta.
 * `returnTo` é só o pathname (sem querystring) porque `sanitizeReturnTo` valida
 * contra uma lista fixa de paths exatos — uma busca com `?q=` perde o filtro no
 * retorno; ver nota no relatório.
 */
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

export interface UseFavoritoAuthModalResult {
	open: boolean
	requestAuth: () => void
	onDismiss: () => void
	onCreateAccount: () => void
	onLogin: () => void
}

export function useFavoritoAuthModal(contentId: string): UseFavoritoAuthModalResult {
	const [open, setOpen] = useState(false)
	const navigate = useNavigate()
	const location = useLocation()

	// Comuns aos dois destinos — só o path muda (/cadastro vs /login).
	function intentQuery(): string {
		const returnTo = encodeURIComponent(location.pathname)
		const favoritar = encodeURIComponent(contentId)
		return `intent=favoritar&favoritar=${favoritar}&returnTo=${returnTo}`
	}

	function onCreateAccount(): void {
		setOpen(false)
		navigate(`/cadastro?step=1&${intentQuery()}`)
	}

	function onLogin(): void {
		setOpen(false)
		navigate(`/login?${intentQuery()}`)
	}

	return {
		open,
		requestAuth: () => setOpen(true),
		onDismiss: () => setOpen(false),
		onCreateAccount,
		onLogin,
	}
}
