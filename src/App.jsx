import { useEffect, useState } from 'react';
import './App.css';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
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
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);


  const fetchMovies = async ( query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query ? `${API_BASE_URL}/films?q=${encodeURIComponent(query)}`: `${API_BASE_URL}/films`

      const response = await fetch(endpoint, API_OPTIONS)

      if(!response.ok){
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      console.log(data);
      if (data.response == "False"){
        setErrorMessage(data.Error || "Failed to fetch movies");
        setMovieList([]);
        return;
      }
      setMovieList(data || []);



    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  return (
    <main>
      <div className="pattern">
        <header>
          <div className="wrapper">
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
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </div>
        </header>

        <section className="space-y-9 mx-[5%]">
          <h2 className="font-playpen text-[min(4vw,24px)]">
            All Movies
          </h2>

            {isLoading ? (
             <p><Spinner/></p>
            ) : errorMessage ? (
              <p className="text-red-500">{errorMessage}</p>
            ) : (
              <ul className="grid grid-cols-1 gap-10 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie}/>
                ))}
              </ul>
            )}

        </section>

      </div>
    </main>
  );
}

export default App;
