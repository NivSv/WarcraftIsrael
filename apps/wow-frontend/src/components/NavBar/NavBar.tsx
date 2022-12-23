import { Link } from '@tanstack/react-router'
import logo from '../../assets/logo.png'

const links = [
    {
        name: 'בית',
        path: '/',
    },
    {
        name: 'רוסטר',
        path: '/',
    },
    {
        name: 'מי אנחנו',
        path: '/',
    },
]

export default function NavBar() {
    //todo: fix colors
    return (
        <div className="relative top-0 left-0 w-screen h-16 m-0 bg-neutral-900 flex align-middle p-1 shadow-lg justify-center gap-2">
            <img src={logo} alt="wow-logo" />
            <div className="flex gap-4 text-white my-auto">
                {links.map((link) => (
                    <a className='hover:text-red-800'>{link.name}</a>
                ))}
            </div>
        </div>
    )
}
