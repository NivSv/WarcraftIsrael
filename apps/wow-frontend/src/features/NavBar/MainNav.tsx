import { Link } from '@tanstack/react-router'
import { FiChevronDown } from 'react-icons/fi'

interface navBarLink {
    name: string
    path: string
    subLinks: Array<navBarLink>
}

const navBarLinks: Array<navBarLink> = [
    {
        name: 'בית',
        path: '/',
        subLinks: [],
    },
    {
        name: 'רוסטר',
        path: '/roster',
        subLinks: [],
    },
    {
        name: 'טקטיקות וטיפים',
        path: '/',
        subLinks: [
            {
                name: 'בוסים',
                path: '/',
                subLinks: [],
            },
        ],
    },
    {
        name: 'חדשות',
        path: '/login',
        subLinks: [],
    },
]

export default function MainNav() {
    return (
        <nav className="bg-primary-800">
            <div className=" container mx-auto hidden justify-center gap-9 md:flex">
                {navBarLinks.map((navBarLink, index) => (
                    <div key={index} className="group ">
                        <Link className="text-2xl" to={navBarLink.path}>
                            <div className="flex items-center gap-1">
                                <p className="group-hover:text-blue-300">
                                    {navBarLink.name}
                                </p>{' '}
                                {navBarLink.subLinks.length > 0 && (
                                    <FiChevronDown className="text-gray-400 transition-transform group-hover:rotate-180" />
                                )}
                            </div>
                        </Link>
                        {navBarLink.subLinks.length > 0 && (
                            <div className="bg-primary-800 absolute hidden w-60 p-3 hover:text-blue-300 group-hover:block">
                                {navBarLink.subLinks.map(
                                    (navBarSubLink, subIndex) => (
                                        <Link key={subIndex} to="/">
                                            {navBarSubLink.name}
                                        </Link>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex md:hidden relative">
                

            </div>
        </nav>
    )
}
