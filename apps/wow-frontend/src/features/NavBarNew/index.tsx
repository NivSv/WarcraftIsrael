import React, { useState } from 'react'
import logo from '@assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faUser } from '@fortawesome/pro-light-svg-icons'

export default function Index() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <nav className="bg-primary-900 sticky top-0 flex w-full justify-between p-2 px-4 shadow-md">
            <div
                onClick={toggleMenu}
                className="block cursor-pointer self-center md:hidden"
            >
                {isMenuOpen ? (
                    <FontAwesomeIcon icon={faXmark} size="2x" />
                ) : (
                    <FontAwesomeIcon icon={faBars} size="2x" />
                )}
            </div>
            {isMenuOpen && (
                <div className="fixed inset-x-1/3 inset-y-0 right-0 z-50 block bg-white shadow-md shadow-black transition-transform md:hidden">
                    sad
                </div>
            )}
            <div className="flex items-center gap-2 font-bold">
                <img width={120} src={logo} alt="Warcraft Israel Main logo" />
            </div>
            <div className="block cursor-pointer self-center md:hidden">
                <FontAwesomeIcon icon={faUser} size="2x" />
            </div>
        </nav>
    )
}
