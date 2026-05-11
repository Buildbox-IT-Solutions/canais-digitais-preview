import { Navigate, RouterProvider, createBrowserRouter } from 'react-router'
import BuscarScreen from './screens/buscar'
import CategoriaScreen from './screens/categoria'
import ConteudoScreen from './screens/conteudo'
import HomeScreen from './screens/home'
import MenuScreen from './screens/menu'

const router = createBrowserRouter([
	{ path: '/', element: <HomeScreen /> },
	{ path: '/categoria', element: <CategoriaScreen /> },
	{ path: '/conteudo', element: <ConteudoScreen /> },
	{ path: '/menu', element: <MenuScreen /> },
	{ path: '/buscar', element: <BuscarScreen /> },
	{ path: '*', element: <Navigate to="/" /> },
])

export function Router() {
	return <RouterProvider router={router} />
}
