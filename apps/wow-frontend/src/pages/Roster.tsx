import RosterGrid from '@features/RosterGrid'
import TwitchIframe from '@features/TwitchIframe'

export default function Roster() {
    return (
        <div className="flex justify-around px-3 py-3">
            <div className="">
                <div className="flex flex-col">
                    {/* <p className="mb-3 uppercase text-bold self-center text-bold text-4xl">
                        רוסטר
                    </p> */}
                    <RosterGrid />
                </div>
            </div>
            <div className="grow">
                <div className='flex flex-col'>
                    {/* <p className="mb-3 uppercase text-bold self-center text-bold text-4xl">
                        סטרימינג
                    </p> */}
                    <TwitchIframe />
                </div>
            </div>
        </div>
    )
}
