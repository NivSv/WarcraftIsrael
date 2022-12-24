import logo from '@assets/logo.png'
import {
    FaFacebook,
    FaTwitch,
    FaYoutube,
    FaDiscord,
    FaWhatsapp,
} from 'react-icons/fa'
import { IconType } from 'react-icons/lib'
import UserSection from './components/UserSection'

interface socialMediaIcon {
    icon: IconType
    link: string
}

const socialMediaIcons: Array<socialMediaIcon> = [
    {
        icon: FaFacebook,
        link: 'https://www.facebook.com/groups/1608478469407429',
    },
    {
        icon: FaTwitch,
        link: 'https://www.twitch.tv/nivsv',
    },
    {
        icon: FaYoutube,
        link: 'https://www.youtube.com/@kyphosiswow4670',
    },
    {
        icon: FaDiscord,
        link: 'https://discord.gg/Dk4svqkR7E',
    },
    {
        icon: FaWhatsapp,
        link: 'https://chat.whatsapp.com/IaKi4EFO4ZtCePUToWZ8FZ',
    },
]

export default function TopNav() {

    return (
        <nav className="bg-primary-900 relative">
            <div className="container mx-auto">
                <div className="flex items-center justify-between p-2">
                    <UserSection/>
                    <div className="flex items-center gap-2">
                        <img
                            className="h-12 object-scale-down"
                            src={logo}
                            alt="logo"
                        />
                        <div className=" text-4xl font-bold uppercase">
                            Warcraft Israel
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        {socialMediaIcons.map((socialMedia, index) => {
                            const Icon = socialMedia.icon
                            return (
                                <a
                                    href={socialMedia.link}
                                    key={index}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Icon
                                        size={25}
                                        className="hover:fill-blue-300"
                                    />
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
        </nav>
    )
}
