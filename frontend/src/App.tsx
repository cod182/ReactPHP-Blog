import './App.css';

import { Contact, Error, Home, PostDetail } from './routes';
import { FormEvent, useState } from 'react';
import { Nav, Search } from './components';
import { Route, Routes } from 'react-router-dom';

import { PostProp } from '../types/types';

function App() {

  // STATES

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<PostProp[]>([])


  // FUNCTIONS

  // Get the search results
  const fetchSearchResults = async (searchTerm: string) => {
    const res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/api/search?keyword=${searchTerm}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        }
      }
    )

    return await res.json();

  }

  // Handles the search being submitted
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);

    fetchSearchResults(searchTerm).then((
      item
    ) => {
      setSearchResults(item.posts);
      console.log(item.posts);
    })
  }

  return (
    <>
      <div>
        {/* Nav */}
        <Nav setSearchOpen={setSearchOpen} />
        <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSubmit={handleSearch} />
      </div>
      <div className={`relative z-[2]  px-2  bg-gray-100`}>
        <div className='mx-auto max-w-[1700px] min-h-[calc(100dvh-80px)]'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
      {/* FOOTER */}
    </>
  );
}

export default App;
