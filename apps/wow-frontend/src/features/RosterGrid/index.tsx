import RousterCard from "./RosterCard"

const players = [
    "Nivsvdk",
    "Nivsvdk",
    "Nivsvdk",
    "Nivsvdk",
    "Nivsvdk",
]

export default function index() {
  return (
    <div className="flex flex-wrap">
        {players.map((player) => (
            <RousterCard name={player} />
        ))}
    </div>
  )
}