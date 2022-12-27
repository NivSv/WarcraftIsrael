import RousterCard from './RosterCard'
import { BsFillShieldFill } from 'react-icons/bs'
import { TbSword } from 'react-icons/tb'
import { GiHealthNormal } from 'react-icons/gi'

const players = ['Nivsvdk', 'Nivsvdk', 'Nivsvdk', 'Nivsvdk', 'Nivsvdk']
const healerCount = 2
const tankCount = 1
const dpsCount = 3

export default function index() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-10 self-center">
                <div className="flex flex-col items-center justify-center gap-2">
                    <BsFillShieldFill size={50}/>
                    <p className="text-2xl">{tankCount}</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <TbSword size={50} />
                    <p className="text-2xl">{dpsCount}</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <GiHealthNormal size={50} />
                    <p className="text-2xl">{healerCount}</p>
                </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center justify-center min-w-full">
                {players.map((player) => (
                    <RousterCard name={player} />
                ))}
            </div>
        </div>
    )
}
