import { useRouter } from '@tanstack/react-router'
import * as Avatar from '@radix-ui/react-avatar'
import { RiCoinFill } from 'react-icons/ri'
import { json } from './text'

interface avatarLink {
    name: string
    onClick: () => void
}

export default function UserSection() {
    const router = useRouter()

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
            onClick: () => console.log('התנתק'),
        },
    ]

    const userLoggedIn = false

    return (
        <div className="flex items-center gap-2">
            {userLoggedIn ? (
                <>
                    <Avatar.Root className="group">
                        <Avatar.Image
                            src={json.assets.avatar}
                            width={50}
                            className="rounded-full text-gray-50 group-hover:border border-blue-300"
                        />
                        <Avatar.Fallback />
                        <div className="absolute hidden group-hover:block bg-primary-800 z-10 p-2 border ">
                            {avatarLinks.map((avatarLink, index) => (
                                <div
                                    className="hover:text-blue-300 cursor-pointer"
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
                <>
                    <button
                        className="border border-transparent rounded inline-block p-2 font-bold space hover:border-stone-700 hover:bg-stone-800"
                        onClick={() => {
                            router.history.push('/login')
                        }}
                    >
                        התחבר
                    </button>
                    <button
                        className="border border-blue-400 bg-blue-700 rounded inline-block p-2 font-bold space hover:bg-blue-500"
                        onClick={() => {
                            router.history.push('/login')
                        }}
                    >
                        הרשמה
                    </button>
                </>
            )}
        </div>
    )
}
