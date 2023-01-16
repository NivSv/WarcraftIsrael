import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import '@styles/base.css'
import { Outlet, RouterProvider } from '@tanstack/react-router'
import router from './routes'
import Wrapper from '@features/Wrapper'
import { Auth0Provider } from '@auth0/auth0-react'
import NewNavBar from '@features/NavBarNew'

const App = () => {
    return (
        <div>
            <NewNavBar />
            <Wrapper>
                <Outlet />
            </Wrapper>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <StrictMode>
        <Auth0Provider
            domain="dev-vplfitg0nn3qzuzm.us.auth0.com"
            clientId="vpuGJX3iv5FuqftXLrVcZ3klAE9RtKVe"
            redirectUri={window.location.origin}
        >
            <RouterProvider router={router} defaultComponent={App} />
        </Auth0Provider>
    </StrictMode>
)
