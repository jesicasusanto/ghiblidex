
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };

export const updateSearchCount = async (searchTerm,movie) => {
    try {
      // Check if the search term already exists in the database
      console.log("Checking..");
      console.log("search_term", searchTerm);
      const { data, error } = await supabase
        .from('search_term_count')
        .select('id, count')
        .eq('search_term', searchTerm);
        console.log("done checking");
      if (error) throw error;
  
      if (data.length > 0) {
        // If it exists, update the count (first row should have the correct search term)
        console.log(
          "Data exists"
        )
        const newCount = data[0].count + 1;
        await supabase
          .from('search_term_count')
          .update({ count: newCount })
          .eq('id', data[0].id);
      } else {
        // If not, insert a new row with count 1
        console.log("Data doesnt exists")
        console.log(`Inserting: ${searchTerm} ${movie} ${movie.image}`)
        await supabase
          .from('search_term_count')
          .insert([
            { search_term: searchTerm, count: 1, title: movie.title, poster_url: movie.image }
          ]);
      }
    } catch (error) {
      console.error("Error updating search count:", error);
    }
  };

  export const getTrendingMovies = async () => {
    try {
      const { data, error } = await supabase
        .from('search_term_count')
        .select('title, poster_url, count')
        .order('count', { ascending: false }) // Order by count in descending order
        .limit(4); // Limit the results to the top 4 movies
  
      if (error) {
        throw error;
      }
  
      console.log('Trending Movies:', data);
      return data;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      return [];
    }
  };
  