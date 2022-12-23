import ReactDOM from 'react-dom/client'
import {
    RouterProvider,
    createReactRouter,
    createRouteConfig,
} from '@tanstack/react-router'
import Home from './pages/Home'
import NavBar from './components/NavBar/NavBar'

const rootRoute = createRouteConfig({})
const indexRoute = rootRoute.createRoute({ path: '/', component: Home })

const routeConfig = rootRoute.addChildren([indexRoute])

const router = createReactRouter({ routeConfig })

export default function App() {
    return (
        <>
            <NavBar />
            <RouterProvider router={router} />
        </>
    )
}
