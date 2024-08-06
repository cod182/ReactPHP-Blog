import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='w-full h-[80px] flex flex-row gap-4 items-center justify-start px-4 py-2 bg-gray-300 rounded-b-xl text-xl'>
      <Link className='text-black transition-all duration-200 hover:text-white ease' to='/'>Home</Link>
      <Link className='text-black transition-all duration-200 hover:text-white ease' to='/contact'>Contact</Link>

      <FaSearch className='text-black transition-all duration-200 cursor-pointer hover:text-white ease' />
    </div>
  )
}

export default Nav