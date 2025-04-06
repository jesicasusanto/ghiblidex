import { useEffect, useState } from 'react';
import './App.css';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './utils/supabase'
import leaf from "./assets/leaf.png";


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
  const [trendingMovies, setTrendingMovies] = useState([]);

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

      if (query && data.length > 0){
        updateSearchCount(searchTerm,data[0]);
      }

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    }finally{
      setIsLoading(false);
    }
  }

  const loadTrendingmovies = async () => {
    try{
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    }
    catch(error){
      console.error(`Error fetching trending movies ${error}`);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect( () => {
    loadTrendingmovies();
  }, []);

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
                    src={leaf}
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

      {trendingMovies.length > 0 && (
        <section className="trending">
          <h2> Trending Movies</h2>

          <ul>
            {
              trendingMovies.map((movie,index) => (
                <li key={movie.id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))

            }
          </ul>
        </section>
      )}

        <section className="space-y-9 mx-[5%]">
          <h2 className="font-playpen text-[min(4vw,24px)]">
            All Movies
          </h2>

            {isLoading ? (
             <Spinner/>
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
