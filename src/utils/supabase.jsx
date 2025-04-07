
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };

export const updateSearchCount = async (searchTerm,movie) => {
    try {
      console.log("Checking..");
      console.log("search_term", searchTerm);
      const { data, error } = await supabase
        .from('search_term_count')
        .select('id, count')
        .eq('search_term', searchTerm);
        console.log("done checking");
      if (error) throw error;
  
      if (data.length > 0) {
        console.log(
          "Data exists"
        )
        const newCount = data[0].count + 1;
        await supabase
          .from('search_term_count')
          .update({ count: newCount })
          .eq('id', data[0].id);
      } else {
        console.log("Data doesnt exists")
        await supabase
          .from('search_term_count')
          .insert([
            { search_term: searchTerm, count: 1,movie_id :  movie.id }
          ]);
      }
    } catch (error) {
      console.error("Error updating search count:", error);
    }
  };

  export const getTrendingMovies = async () => {
    try {
        const { data, error } = await supabase
        .from('top_4_movie_search_counts')
        .select('movie_id, total_count');
    
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
  
  