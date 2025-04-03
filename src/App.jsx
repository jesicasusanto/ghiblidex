import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <div className="flex relative justify-center flex-col items-center">
        <div className="relative w-max">
          <h2 className="font-title font-bold text-[min(10vw,128px)] text-[#7B4600] relative">
            GhibliDex
            {/* Leaf positioned relative to the text */}
            <img
              className="absolute top-[-2%] left-[-5%] h-[min(7vw,85px)] w-[min(7vw,79px)]"
              src="/leaf.png"
              alt="leaf"
            />
          </h2>
        </div>
        <h3 className="font-playpen text-[min(2vw,24px)] text-center">
          Ghibli anime search engine
        </h3>
      </div>
    </main>
  );
}

export default App;
