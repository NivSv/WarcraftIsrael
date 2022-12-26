import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import avatar from "@assets/pngegg.png"

export default function index() {
    return (
        <div className="relative block w-96 p-2">
            <div className=" shadow-md shadow-black transition-transform ease-out hover:scale-110 hover:border hover:border-purple-500">
                <AspectRatio.Root ratio={16 / 9}>
                    <iframe
                        className=" inset-0 h-full w-full"
                        title="twitch-iframe"
                        src="https://player.twitch.tv/?channel=midiantv&parent=localhost"
                        allowFullScreen
                    ></iframe>
                </AspectRatio.Root>
                <div className="bg-primary-900 flex items-center justify-center gap-2 py-4">
                    <img src={avatar} alt="avatar" width={50} className="rounded-full border-2 border-purple-500"/>
                    <div className="text-2xl">Genesis</div>
                </div>
            </div>
        </div>
    )
}
