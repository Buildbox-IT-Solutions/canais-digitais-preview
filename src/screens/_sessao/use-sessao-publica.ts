/**
 * Cola das telas públicas: registra o eixo Sessão na ScenarioBar e devolve, junto, o
 * estado de login e as props de usuário do header. As duas coisas andam sempre juntas
 * — uma tela que oferece o cenário "Logado" na barra e não adapta o header não está
 * mostrando o cenário logado, está mostrando meio dele.
 *
 * `/home` e `/conteudo` NÃO usam este hook: registram outros eixos junto do de sessão e
 * precisam do guard de "sou só o fundo de um modal de auth" (aí os eixos da barra são
 * os da tela da frente). Lá as duas peças são chamadas separadamente.
 */
import { useScenarios } from '~/dev/use-scenarios'
import { useHeaderUsuario, type HeaderUsuarioProps } from '~/lib/use-header-usuario'
import { useLogado } from '~/lib/use-logado'
import { sessaoAxis } from './scenarios'

export interface SessaoPublica {
	logado: boolean
	/** Espalhar no `<HeaderDesktop {...sessao.header} />`. */
	header: HeaderUsuarioProps
}

export function useSessaoPublica(): SessaoPublica {
	const logado = useLogado()
	useScenarios([sessaoAxis(logado)])
	return { logado, header: useHeaderUsuario() }
}
