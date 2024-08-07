import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Search from './Search'
import { useState } from 'react';

const Nav = () => {

  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className='relative w-full h-[80px] flex flex-row gap-4 items-center justify-start px-4 py-2 bg-gray-300 rounded-b-xl text-xl'>
        <Link className='text-black transition-all duration-200 hover:text-white ease' to='/'>Home</Link>
        <Link className='text-black transition-all duration-200 hover:text-white ease' to='/contact'>Contact</Link>

        <FaSearch className='text-black transition-all duration-200 cursor-pointer hover:text-white ease' onClick={() => setSearchOpen(true)} />
        <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen} />

      </div>
    </>
  )
}

export default Nav