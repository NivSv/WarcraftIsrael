import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import '@styles/base.css'
import { Outlet, RouterProvider } from '@tanstack/react-router'
import router from './routes'
import NavBar from '@features/NavBar'
import Wrapper from '@features/Wrapper'
import Login from './pages/Login'

const App = () => {
    if (router.matchRoute({ to: '/login' })) return <Login />
    return (
        <div>
            <NavBar />
            <Wrapper>
                <Outlet />
            </Wrapper>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <StrictMode>
        <RouterProvider router={router} defaultComponent={App} />
    </StrictMode>
)
