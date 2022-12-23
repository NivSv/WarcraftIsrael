import logo from "@assets/logo.png"
import { FaFacebook } from "react-icons/fa"

const socialMediaIcons = [
  {
    icon: FaFacebook,
    link: "https://www.facebook.com/WarcraftIsrael",
  }
]

export default function TopNav() {
  return (
    <nav className="relative mx-auto bg-primary-900">
        <div className="flex justify-between items-center p-2">
            <div className='flex items-center gap-2 text-2xl'>
                <img className="object-scale-down h-12" src={logo} alt="logo" />
                <span>Warcraft Israel</span>
            </div>
            <div>
                {socialMediaIcons.map((icon, index) => {
                    return (
                       <a href={icon.link} target="_blank"><FaFacebook/></a>
                    )
                })}
            </div>
        </div>
    </nav>
)
}
