import './App.css';

import { Contact, Error, Home } from './routes';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Nav } from './components';

function App() {
  return (
    <>
      {/* Nav */}
      <Nav
      />
      <div className={`relative z-[2]`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error />} />

        </Routes>
      </div>
      {/* FOOTER */}
    </>
  );
}

export default App;
