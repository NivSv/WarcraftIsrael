interface Props{
    children: React.ReactNode
}

export default function index({children}:Props) {
  return (
    <div className='bg-primary-900 container relative mx-auto mt-10 shadow-sm shadow-black'>
        {children}
    </div>
  )
}