import * as AspectRatio from '@radix-ui/react-aspect-ratio'

export default function index() {
    return (
        <div className='relative left-40'>
            <AspectRatio.Root ratio={16 / 9}>
                <iframe
                    src="https://player.twitch.tv/?channel=nivsv&parent=www.example.com"
                    frameBorder="0"
                    scrolling="no"
                ></iframe>
            </AspectRatio.Root>
        </div>
    )
}
