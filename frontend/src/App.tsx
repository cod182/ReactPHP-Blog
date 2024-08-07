import './App.css';

import { Contact, Error, Home, PostDetail } from './routes';
import { Route, Routes } from 'react-router-dom';

import { Nav } from './components';

function App() {
  return (
    <>
      {/* Nav */}
      <Nav
      />
      <div className={`relative z-[2]  px-2  bg-gray-100`}>
        <div className='mx-auto max-w-[1700px] h-[calc(100dvh-80px)]'>
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
