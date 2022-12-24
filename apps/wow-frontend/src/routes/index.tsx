import { createReactRouter, createRouteConfig } from '@tanstack/react-router'
import Home from '@pages/Home'
import Login from '@pages/Login'

declare module '@tanstack/react-router' {
    interface RegisterRouter {
        router: typeof router
    }
}

const rootRoute = createRouteConfig();

const homeRoute = rootRoute.createRoute({ path: '/', component: Home })
const loginRoute = rootRoute.createRoute({ path: '/login', component: Login })

const routeConfig = rootRoute.addChildren([homeRoute, loginRoute])

const router = createReactRouter({
    routeConfig,
})

export default router
