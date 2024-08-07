import { FormEvent, useEffect } from "react";

import { FaSearch } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

type Props = {
  searchOpen: boolean;
  setSearchOpen: (value: boolean) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onSubmit: (e: FormEvent) => void
  children?: any;
}

const Search = ({ searchOpen, setSearchOpen, searchTerm, setSearchTerm, onSubmit, children }: Props) => {

  useEffect(() => {
    const handleScroll = () => {
      if (searchOpen) {
        setSearchOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [searchOpen, setSearchOpen]);




  return (
    <>
      <div className={`overflow-hidden absolute top-[80px] px-4 left-0 w-full flex flex-col justify-center items-center transition-all duration-400 ease-in ${searchOpen ? 'max-h-[80px] z-[10]' : 'max-h-[0px] z-[-1]'}`}>

        <div className="flex flex-row items-center justify-center w-full h-full py-2">
          <div className="w-full sm:w-[75%] lg:w-[50%] max-w-[800px]">
            <form action="" method="post" className="relative" onSubmit={(e) => onSubmit(e)}>
              <input type="text" name="search" id="search" className="w-full h-[60px] rounded-full border-[1px] border-black px-4" placeholder='Search for a post' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <button
                type="submit"
                className="absolute text-gray-600 transform -translate-y-1/2 right-4 top-1/2 hover:text-primary focus:outline-none"
              >
                <FaSearch size={20} />
              </button>
            </form>
          </div>
          <IoCloseSharp className="w-[40px] h-[40px] cursor-pointer text-black hover:text-blue-300 transition-all duration-200 ease" onClick={() => {
            setSearchOpen(false);
            setSearchTerm('');
          }
          } />
        </div>
      </div>
      <div className={`flex flex-col items-center justify-center w-full transition-all duration-200 ease absolute top-[160px] overflow-scroll px-4 ${searchOpen ? 'max-h-[1000px] z-[10]' : 'max-h-[0px] z-[-1]'}`}>
        {children}
      </div>
      {searchOpen && (
        <div className="absolute top-[80px] left-0 min-w-[100vw] min-h-[calc(100dvh)] cursor-default backdrop-blur-sm z-[8]" onClick={() => setSearchOpen(false)} />
      )
      }
    </>
  )
}

export default Search