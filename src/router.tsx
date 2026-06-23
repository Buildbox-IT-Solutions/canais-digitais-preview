import { RouterProvider, createBrowserRouter } from 'react-router'
import AnuncieScreen from './screens/anuncie'
import BuscarScreen from './screens/buscar'
import CadastroScreen from './screens/cadastro'
import CadastroV2Screen from './screens/cadastro-v2'
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
import ExcluirContaScreen from './screens/excluir-conta'
import FormDownloadScreen from './screens/form-download'
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
	{ path: '/login', element: <LoginScreen /> },
	{ path: '/login-v2', element: <LoginV2Screen /> },
	{ path: '/cadastro', element: <CadastroScreen /> },
	{ path: '/cadastro-v2', element: <CadastroV2Screen /> },
	{ path: '/recupera-senha', element: <RecuperaSenhaScreen /> },
	{ path: '/recupera-senha-v2', element: <RecuperaSenhaV2Screen /> },
	{ path: '/redefine-senha', element: <RedefineSenhaScreen /> },
	{ path: '/redefine-senha-v2', element: <RedefineSenhaV2Screen /> },
	{ path: '/confirmacao-email', element: <ConfirmacaoEmailScreen /> },
	{ path: '/confirmacao-email-v2', element: <ConfirmacaoEmailV2Screen /> },
	{ path: '/dashboard', element: <DashboardScreen /> },
	{ path: '/dashboard-perfil-v3', element: <DashboardPerfilV3Screen /> },
	{ path: '/dashboard-perfil-v4', element: <DashboardPerfilV4Screen /> },
	{ path: '/meus-dados', element: <MeusDadosScreen /> },
	{ path: '/consentimentos', element: <ConsentimentosScreen /> },
	{ path: '/excluir-conta', element: <ExcluirContaScreen /> },
	{ path: '/contato', element: <ContatoScreen /> },
	{ path: '/sobre', element: <SobreScreen /> },
	{ path: '/anuncie', element: <AnuncieScreen /> },
	{ path: '/patrocinadores', element: <PatrocinadoresScreen /> },
	{ path: '/patrocinador', element: <PatrocinadorScreen /> },
	{ path: '/form-newsletter', element: <FormNewsletterScreen /> },
	{ path: '/form-download', element: <FormDownloadScreen /> },
	{ path: '*', element: <NotFoundScreen /> },
])

export function Router() {
	return <RouterProvider router={router} />
}
