import * as Avatar from '@radix-ui/react-avatar'
import { RiCoinFill } from 'react-icons/ri'
import { json } from './text'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

interface avatarLink {
    name: string
    onClick: () => void
}

export default function UserSection() {
    const {
        loginWithRedirect,
        logout,
        user,
        isAuthenticated,
        isLoading,
        getAccessTokenSilently
    } = useAuth0()

    useEffect(() => {
        const a = async () => {
            const test = await getAccessTokenSilently({ scope: 'read:current_user'})
            console.log(test)
        }
        a()
    }, [])

    const avatarLinks: Array<avatarLink> = [
        {
            name: 'הפרופיל שלי',
            onClick: () => console.log('הפרופיל שלי'),
        },
        {
            name: 'הגדרות',
            onClick: () => console.log('הפרופיל שלי'),
        },
        {
            name: 'התנתק',
            onClick: logout,
        },
    ]

    return (
        <div className="flex items-center gap-2">
            {isAuthenticated ? (
                <>
                    <Avatar.Root className="group">
                        <Avatar.Image
                            src={json.assets.avatar}
                            width={50}
                            className="rounded-full border-blue-300 text-gray-50 group-hover:border"
                        />
                        <Avatar.Fallback />
                        <div className="bg-primary-800 absolute z-10 hidden border p-2 group-hover:block ">
                            {avatarLinks.map((avatarLink, index) => (
                                <div
                                    className="cursor-pointer hover:text-blue-300"
                                    key={index}
                                    onClick={avatarLink.onClick}
                                >
                                    {avatarLink.name}
                                </div>
                            ))}
                        </div>
                    </Avatar.Root>
                    <div className="flex flex-col">
                        <p className="text-xl">שלום, {json.name}.</p>
                        <p className="flex items-center gap-2">
                            <RiCoinFill className="text-yellow-300" /> 1200
                        </p>
                    </div>
                </>
            ) : (
                <button
                    className="space inline-block rounded border border-transparent p-2 font-bold hover:border-stone-700 hover:bg-stone-800"
                    onClick={loginWithRedirect}
                >
                    התחבר
                </button>
            )}
        </div>
    )
}
