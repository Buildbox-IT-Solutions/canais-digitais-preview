import { Navigate, RouterProvider, createBrowserRouter } from 'react-router'
import BuscarScreen from './screens/buscar'
import CadastroScreen from './screens/cadastro'
import CategoriaScreen from './screens/categoria'
import ConfirmacaoEmailScreen from './screens/confirmacao-email'
import ConsentimentosScreen from './screens/consentimentos'
import ConteudoScreen from './screens/conteudo'
import DashboardScreen from './screens/dashboard'
import DashboardPerfilV3Screen from './screens/dashboard-perfil-v3'
import ExcluirContaScreen from './screens/excluir-conta'
import HomeScreen from './screens/home'
import LoginScreen from './screens/login'
import LoginModalScreen from './screens/login-modal'
import MenuScreen from './screens/menu'
import MeusDadosScreen from './screens/meus-dados'
import RecuperaSenhaScreen from './screens/recupera-senha'
import RedefineSenhaScreen from './screens/redefine-senha'

const router = createBrowserRouter([
	{ path: '/', element: <HomeScreen /> },
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
	{ path: '*', element: <Navigate to="/" /> },
])

export function Router() {
	return <RouterProvider router={router} />
}
