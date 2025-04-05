import { useState } from 'react';
import './App.css';
import Search from './components/Search';

const API_BASE_URL = 'https://ghibliapi.vercel.app';

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const fetchMovies = async () => {
    try {

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    }
  }
  return (
    <main>
      <header>
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
            Studio Ghibli anime search engine
          </h3>
        </div>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </header>
    </main>
  );
}

export default App;
