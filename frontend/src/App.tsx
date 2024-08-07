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

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    console.log(searchTerm);
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
