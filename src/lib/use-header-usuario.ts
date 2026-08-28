/**
 * Props de usuário do `HeaderDesktop` para as telas PÚBLICAS (home, conteúdo,
 * categoria, busca, formulário de newsletter…).
 *
 * O header já sabia renderizar os dois estados desde a v3.0 — avatar + menu de conta
 * quando logado, botão "Acessar" quando não. O que faltava era alguém contar a ele:
 * as telas públicas montavam `<HeaderDesktop />` sem props, então `?logado=true`
 * mudava o corpo da página (banners, favoritar, download) e deixava o header
 * deslogado. Cenário logado com header de visitante não é um cenário logado.
 *
 * No WordPress nada disto existe: o header lê a sessão do próprio WP, sem nenhuma
 * página passar dados de usuário para ele. Este hook é a costura que essa
 * implementação substitui — e é por isso que ele vive aqui e não em cada tela.
 *
 * As telas SEMPRE logadas (dashboard, consentimentos) continuam passando as props
 * explicitamente: elas não dependem de `?logado=` para existir.
 */
import type { IHeaderDesktopProps } from '~/components/header-desktop/types'
import { USUARIO_LOGADO } from '~/mocks/dashboard-perfil'
import { useLogado } from './use-logado'

export type HeaderUsuarioProps = Pick<
	IHeaderDesktopProps,
	'userLoggedIn' | 'userName' | 'userEmail' | 'userInitials' | 'userAvatar'
>

export function useHeaderUsuario(): HeaderUsuarioProps {
	const logado = useLogado()

	if (!logado) return { userLoggedIn: false }

	return {
		userLoggedIn: true,
		userName: USUARIO_LOGADO.nome,
		userEmail: USUARIO_LOGADO.email,
		userInitials: USUARIO_LOGADO.iniciais,
		userAvatar: USUARIO_LOGADO.avatar,
	}
}
