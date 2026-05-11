import { Navigate, RouterProvider, createBrowserRouter } from 'react-router'
import HomeScreen from './screens/home'

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomeScreen />,
	},
	{
		path: '*',
		element: <Navigate to="/" />,
	},
])

export function Router() {
	return <RouterProvider router={router} />
}
