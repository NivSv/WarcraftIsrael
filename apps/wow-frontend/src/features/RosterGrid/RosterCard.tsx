import { BsFillShieldFill } from 'react-icons/bs'

type Props = {
    a: string
}

export default function RosterCard({ a }: Props) {
    return (
        <div className='max-w-fit'>
            <div className="flex gap-3 items-center overflow-hidden mb-4 rounded-md bg-primary-900 p-2  shadow-lg shadow-black">
                <div className=" max-w-xs">
                    <img
                        src="https://www.method.gg/images/icons/class/death-knight.jpg"
                        className="h-auto max-w-full block"
                        alt=""
                    />
                </div>
                <div>Nivsvdk</div>
                <BsFillShieldFill className="fill-slate-400 mr-24" />
            </div>
        </div>
    )
}
