import { useEffect, useState } from 'react';
import './App.css';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
import { fetchMovies,loadTrendingMovies } from './services/Movies'; 
import leaf from "./assets/leaf.png";
import medal_1 from "./assets/medal_1.svg";
import medal_2 from "./assets/medal_2.svg";
import medal_3 from "./assets/medal_3.svg";
import medal_4 from "./assets/medal_4.svg";

const App = () => {
  const medals = [medal_1, medal_2, medal_3, medal_4];
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  useEffect(() => {
    fetchMovies(debouncedSearchTerm,setIsLoading,setErrorMessage,setMovieList);
  }, [debouncedSearchTerm]);

  useEffect( () => {
    loadTrendingMovies(setTrendingMovies);
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
        <section className="space-y-9 mx-[5%]">
          <h2 className="font-playpen text-[min(4vw,24px)]"> Trending Movies</h2>

          <div className="grid grid-cols-1 gap-10 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            
            {
              trendingMovies.map((movie,index) => (
               <li key={movie.id} className="list-none relative">
          <img 
            src={medals[index]} 
            alt={`medal ${index + 1}`} 
            className="absolute top-[-5%] right-[-5%] h-[min(20vw,120px)] w-[min(20vw,100px)]"
          />
          <img 
            src={movie.image} 
            alt={movie.title} 
            className="h-auto rounded-2xl"
          />
        </li>
              ))

            }
          </div>
        </section>
      )}

        <section className="space-y-9 mx-[5%] my-[5%]">
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
