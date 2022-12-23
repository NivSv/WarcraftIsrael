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
    <nav className="bg-primary-900 relative mx-auto">
        <div className="flex items-center justify-between p-2">
            <div className='flex items-center gap-2 text-2xl'>
                <img className="h-12 object-scale-down" src={logo} alt="logo" />
                <span>Warcraft Israel</span>
            </div>
            <div>
                {socialMediaIcons.map((icon, index) => {
                    return (
                       <a href={icon.link} target="_blank" rel="noreferrer"><FaFacebook/></a>
                    )
                })}
            </div>
        </div>
    </nav>
)
}
