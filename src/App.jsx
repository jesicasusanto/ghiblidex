import { useState } from 'react';
import './App.css';
import Search from './components/Search';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <main>
      <div className="flex relative justify-center flex-col items-center">
        <div className="relative w-max">
          <h2 className="font-title font-bold text-[min(14vw,128px)] text-brownie relative">
            GhibliDex
            <img
              className="absolute top-[-2%] left-[-8%] h-[min(10vw,85px)] w-[min(10vw,79px)]"
              src="/leaf.png"
              alt="leaf"
            />
          </h2>
        </div>
        <h3 className="font-playpen text-[min(4vw,24px)] text-center">
          Ghibli anime search engine
        </h3>
      </div>

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    </main>
  );
}

export default App;
