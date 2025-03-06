import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../service/api"; // Винесений API-запит
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrendingMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await fetchTrendingMovies(); // Використовуємо утиліту для запиту
        setMovies(results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setError("Failed to load trending movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadTrendingMovies();
  }, []);

  return (
    <div className={s.container}>
      <h1 className={s.title}>Trending Movies</h1>
      {loading && <p className={s.loading}>Loading...</p>}
      {error && <p className={s.error}>{error}</p>}
      {!loading && !error && <MovieList movies={movies} />}
    </div>
  );
}

export default HomePage;