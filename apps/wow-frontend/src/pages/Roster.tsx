import RosterGrid from '@features/RosterGrid'
import TwitchIframe from '@features/TwitchIframe'

export default function Roster() {
    return (
        <div className="flex justify-around">
            <div className="flex-1 flex flex-col text-4xl">
                <p className="mb-3 uppercase text-bold py-4 self-center">
                    רוסטר
                </p>
                <RosterGrid />
            </div>
            <div className="flex w-64 text-bold flex flex-col text-4xl">
                <p className="mb-3 uppercase text-bold p-4 self-center">
                    סטרימינג
                </p>
                <TwitchIframe />
            </div>
        </div>
    )
}
