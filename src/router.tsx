import { Navigate, RouterProvider, createBrowserRouter } from 'react-router'
import BuscarScreen from './screens/buscar'
import CadastroScreen from './screens/cadastro'
import CategoriaScreen from './screens/categoria'
import ConfirmacaoEmailScreen from './screens/confirmacao-email'
import ConteudoScreen from './screens/conteudo'
import HomeScreen from './screens/home'
import LoginScreen from './screens/login'
import LoginModalScreen from './screens/login-modal'
import MenuScreen from './screens/menu'
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
	{ path: '*', element: <Navigate to="/" /> },
])

export function Router() {
	return <RouterProvider router={router} />
}
