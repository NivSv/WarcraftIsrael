
interface Props {
    children: React.ReactNode
    onClick?: () => void
    className?: string
}

export default function Button({ children, onClick ,className }: Props) {

    return (
        <button
            onClick={onClick}
            className={" border border-green-300 rounded p-2 hover:bg-green-300 hover:text-black "+ className}
        >
            {children}
        </button>
    )
}
