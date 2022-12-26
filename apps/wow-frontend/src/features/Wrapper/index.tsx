interface Props{
    children: React.ReactNode
}

export default function index({children}:Props) {
  return (
    <div className='bg-primary-800 container shadow-xl shadow-black mx-auto mt-12 max-w-7xl'>
        {children}
    </div>
  )
}