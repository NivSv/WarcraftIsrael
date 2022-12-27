import RosterGrid from '@features/RosterGrid'
import TwitchIframe from '@features/TwitchIframe'

export default function Roster() {
    return (
        <div className="flex flex-col justify-around gap-5 p-3 md:flex-row md:gap-0">
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
