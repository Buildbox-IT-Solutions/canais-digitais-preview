import { RouterProvider, createBrowserRouter } from 'react-router'
import AnuncieScreen from './screens/anuncie'
import BuscarScreen from './screens/buscar'
import CadastroScreen from './screens/cadastro'
import CategoriaScreen from './screens/categoria'
import CentralScreen from './screens/central'
import ConfirmacaoEmailScreen from './screens/confirmacao-email'
import ConsentimentosScreen from './screens/consentimentos'
import ContatoScreen from './screens/contato'
import ConteudoScreen from './screens/conteudo'
import DashboardScreen from './screens/dashboard'
import DashboardPerfilV3Screen from './screens/dashboard-perfil-v3'
import ExcluirContaScreen from './screens/excluir-conta'
import FormDownloadScreen from './screens/form-download'
import FormNewsletterScreen from './screens/form-newsletter'
import HomeScreen from './screens/home'
import LoginScreen from './screens/login'
import LoginModalScreen from './screens/login-modal'
import MenuScreen from './screens/menu'
import MeusDadosScreen from './screens/meus-dados'
import NotFoundScreen from './screens/not-found'
import RecuperaSenhaScreen from './screens/recupera-senha'
import RedefineSenhaScreen from './screens/redefine-senha'
import SobreScreen from './screens/sobre'

const router = createBrowserRouter([
	{ path: '/', element: <CentralScreen /> },
	{ path: '/home', element: <HomeScreen /> },
	{ path: '/categoria', element: <CategoriaScreen /> },
	{ path: '/conteudo', element: <ConteudoScreen /> },
	{ path: '/menu', element: <MenuScreen /> },
	{ path: '/buscar', element: <BuscarScreen /> },
	{ path: '/login', element: <LoginScreen /> },
	{ path: '/cadastro', element: <CadastroScreen /> },
	{ path: '/recupera-senha', element: <RecuperaSenhaScreen /> },
	{ path: '/redefine-senha', element: <RedefineSenhaScreen /> },
	{ path: '/confirmacao-email', element: <ConfirmacaoEmailScreen /> },
	{ path: '/login-modal', element: <LoginModalScreen /> },
	{ path: '/dashboard', element: <DashboardScreen /> },
	{ path: '/dashboard-perfil-v3', element: <DashboardPerfilV3Screen /> },
	{ path: '/meus-dados', element: <MeusDadosScreen /> },
	{ path: '/consentimentos', element: <ConsentimentosScreen /> },
	{ path: '/excluir-conta', element: <ExcluirContaScreen /> },
	{ path: '/contato', element: <ContatoScreen /> },
	{ path: '/sobre', element: <SobreScreen /> },
	{ path: '/anuncie', element: <AnuncieScreen /> },
	{ path: '/form-newsletter', element: <FormNewsletterScreen /> },
	{ path: '/form-download', element: <FormDownloadScreen /> },
	{ path: '*', element: <NotFoundScreen /> },
])

export function Router() {
	return <RouterProvider router={router} />
}
