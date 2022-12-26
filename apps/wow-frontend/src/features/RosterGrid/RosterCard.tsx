import { BsFillShieldFill } from 'react-icons/bs'

type Props = {
    a: string
}

export default function RosterCard({ a }: Props) {
    return (
        <div className="bg-primary-900 relative flex items-center overflow-hidden rounded-md border  border-transparent p-8 shadow-lg shadow-black  transition-transform hover:scale-105 hover:border-purple-500">
            <img
                src="https://www.method.gg/images/icons/class/death-knight.jpg"
                className="absolute right-0 block h-auto max-h-full max-w-full opacity-10"
                alt=""

            />
            <div className="relative max-w-xs bg-gradient-to-br from-transparent to-black"></div>
            <div className='text-2xl'>Nivsvdk</div>
            <BsFillShieldFill size={30} className="mr-24 fill-slate-400" />
        </div>
    )
}
