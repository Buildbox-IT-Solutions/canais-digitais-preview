import { useSearchParams, useNavigate } from 'react-router'
import { SideMenu } from '~/components/side-menu'
import HomeScreen from '../home'
import { USUARIO_LOGADO } from '~/mocks/dashboard-perfil'

/**
 * Tela: Menu — preview standalone do Side Menu (hambúrguer)
 * Figma: https://www.figma.com/design/WGDRkmJLtuow7gRmPRAwJk/Canais-Digitais-2.0?node-id=986-9198
 *
 * Rota de conveniência para revisar o componente isoladamente a partir da
 * Central. No app real, o Side Menu é aberto in-place pelo hambúrguer do
 * `HeaderDesktop` (estado local, sem navegação) — ver `~/components/side-menu`.
 *
 * `?logged=1` alterna a linha de conta entre deslogado (→ /login) e logado
 * (→ /dashboard-perfil-v4).
 */

// Fonte única — ver comentário equivalente em dashboard-perfil-v4.
const USER_NAME = USUARIO_LOGADO.nome
const USER_INITIALS = USUARIO_LOGADO.iniciais

export default function MenuScreen() {
	const [params] = useSearchParams()
	const navigate = useNavigate()
	const logged = params.get('logged') === '1'
	const closeHref = logged ? '/dashboard-perfil-v4' : '/home'

	return (
		<>
			<HomeScreen />
			<SideMenu
				open
				onClose={() => navigate(closeHref)}
				logged={logged}
				userName={USER_NAME}
				userInitials={USER_INITIALS}
			/>
		</>
	)
}
