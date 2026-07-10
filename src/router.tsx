import { RouterProvider, createBrowserRouter, Navigate } from 'react-router'
import AnuncieScreen from './screens/anuncie'
import ArchiveScreen from './screens/archive'
import BuscarScreen from './screens/buscar'
import CadastroScreen from './screens/cadastro'
import CadastroV2Screen from './screens/cadastro-v2'
import CancelarExclusaoScreen from './screens/cancelar-exclusao'
import CategoriaScreen from './screens/categoria'
import CentralScreen from './screens/central'
import ConfirmacaoEmailScreen from './screens/confirmacao-email'
import ConfirmacaoEmailV2Screen from './screens/confirmacao-email-v2'
import ConsentimentosScreen from './screens/consentimentos'
import ContatoScreen from './screens/contato'
import ConteudoScreen from './screens/conteudo'
import DashboardScreen from './screens/dashboard'
import DashboardPerfilV3Screen from './screens/dashboard-perfil-v3'
import DashboardPerfilV4Screen from './screens/dashboard-perfil-v4'
import EmailBoasVindasScreen from './screens/email-boas-vindas'
import EmailConfirmacaoScreen from './screens/email-confirmacao'
import EmailExclusaoContaScreen from './screens/email-exclusao-conta'
import EmailRecuperacaoSenhaScreen from './screens/email-recuperacao-senha'
import EmailSenhaAlteradaScreen from './screens/email-senha-alterada'
import ExcluirContaScreen from './screens/excluir-conta'
import GateDownloadScreen from './screens/gate-download'
import FormNewsletterScreen from './screens/form-newsletter'
import HomeScreen from './screens/home'
import { HomeV2Screen } from './screens/home-v2'
import LoginScreen from './screens/login'
import LoginV2Screen from './screens/login-v2'
import MenuScreen from './screens/menu'
import MeusDadosScreen from './screens/meus-dados'
import NotFoundScreen from './screens/not-found'
import RecuperaSenhaScreen from './screens/recupera-senha'
import RecuperaSenhaV2Screen from './screens/recupera-senha-v2'
import RedefineSenhaScreen from './screens/redefine-senha'
import RedefineSenhaV2Screen from './screens/redefine-senha-v2'
import SobreScreen from './screens/sobre'
import { PatrocinadoresScreen } from './screens/patrocinadores'
import { PatrocinadorScreen } from './screens/patrocinador'

const router = createBrowserRouter([
	{ path: '/', element: <CentralScreen /> },
	{ path: '/home', element: <HomeScreen /> },
	{ path: '/home-v2', element: <HomeV2Screen /> },
	{ path: '/categoria', element: <CategoriaScreen /> },
	{ path: '/conteudo', element: <ConteudoScreen /> },
	{ path: '/menu', element: <MenuScreen /> },
	{ path: '/buscar', element: <BuscarScreen /> },
	{ path: '/login-full', element: <LoginScreen /> },
	{ path: '/login', element: <LoginV2Screen /> },
	{ path: '/cadastro-full', element: <CadastroScreen /> },
	{ path: '/cadastro', element: <CadastroV2Screen /> },
	{ path: '/recupera-senha-full', element: <RecuperaSenhaScreen /> },
	{ path: '/recupera-senha', element: <RecuperaSenhaV2Screen /> },
	{ path: '/redefine-senha-full', element: <RedefineSenhaScreen /> },
	{ path: '/redefine-senha', element: <RedefineSenhaV2Screen /> },
	{ path: '/confirmacao-email-full', element: <ConfirmacaoEmailScreen /> },
	{ path: '/confirmacao-email', element: <ConfirmacaoEmailV2Screen /> },
	// Endpoint do link do e-mail de confirmacao. O token identifica a conta; no prototipo
	// simulamos o clique valido -> modal de sucesso sobre a home (portal publico ao fundo).
	{ path: '/confirmar', element: <Navigate to="/confirmacao-email?state=success" replace /> },
	// Endpoint do link do e-mail de recuperacao de senha. O token gateia o acesso; no prototipo
	// simulamos o clique valido -> modal de nova senha sobre a home.
	{ path: '/redefinir', element: <Navigate to="/redefine-senha" replace /> },
	{ path: '/dashboard', element: <DashboardScreen /> },
	{ path: '/dashboard-perfil-v3', element: <DashboardPerfilV3Screen /> },
	{ path: '/dashboard-perfil-v4', element: <DashboardPerfilV4Screen /> },
	{ path: '/meus-dados', element: <MeusDadosScreen /> },
	{ path: '/consentimentos', element: <ConsentimentosScreen /> },
	{ path: '/excluir-conta', element: <ExcluirContaScreen /> },
	{ path: '/cancelar-exclusao', element: <CancelarExclusaoScreen /> },
	{ path: '/contato', element: <ContatoScreen /> },
	{ path: '/sobre', element: <SobreScreen /> },
	{ path: '/anuncie', element: <AnuncieScreen /> },
	{ path: '/patrocinadores', element: <PatrocinadoresScreen /> },
	{ path: '/patrocinador', element: <PatrocinadorScreen /> },
	{ path: '/form-newsletter', element: <FormNewsletterScreen /> },
	{ path: '/gate-download', element: <GateDownloadScreen /> },
	{ path: '/email-confirmacao', element: <EmailConfirmacaoScreen /> },
	{ path: '/email-boas-vindas', element: <EmailBoasVindasScreen /> },
	{ path: '/email-recuperacao-senha', element: <EmailRecuperacaoSenhaScreen /> },
	{ path: '/email-senha-alterada', element: <EmailSenhaAlteradaScreen /> },
	{ path: '/email-exclusao-conta', element: <EmailExclusaoContaScreen /> },
	{ path: '/archive', element: <ArchiveScreen /> },
	{ path: '*', element: <NotFoundScreen /> },
])

export function Router() {
	return <RouterProvider router={router} />
}
