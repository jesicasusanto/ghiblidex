import { getTrendingMovies, updateSearchCount } from '../utils/supabase'


const API_BASE_URL = 'https://ghibliapi.vercel.app';

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  }
}

export const fetchMovieById = async (id) => {
    if (!id || id.length === 0) {
      throw new Error("Invalid ID provided");
    }
  
    const endpoint = `${API_BASE_URL}/films?id=${encodeURIComponent(id)}`;
    
    try {
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error(`Failed to fetch movie with ID: ${id}. Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data && data.length > 0) {
        return data;
      } else {
        throw new Error("Movie data is empty or not found");
      }
    } catch (error) {
      console.error("Error fetching movie by ID:", error);
      return null;
    }
  };
  
export const fetchMovies = async ( query = '', setIsLoading, setErrorMessage, setMovieList) => {
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
        updateSearchCount(query,data[0]);
      }

    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later.");
    }finally{
      setIsLoading(false);
    }
  }


  export const loadTrendingMovies = async (setTrendingMovies) => {
    try {
      const movies = await getTrendingMovies();
  
      if (!movies || movies.length === 0) {
        console.log("No trending movies found.");
        setTrendingMovies([]);
        return;
      }

      const movieDetailsPromises = movies.map(async (movie) => {
        const movieData = await fetchMovieById(movie.movie_id);
        return movieData ? movieData[0] : null;
      });
  
      const resolvedMovies = await Promise.all(movieDetailsPromises);
      const validMovies = resolvedMovies.filter((movie) => movie !== null);
      setTrendingMovies(validMovies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
      setTrendingMovies([]);
    }
  };
  