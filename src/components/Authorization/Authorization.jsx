import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../service/api";
import { Link } from "react-router-dom";
import s from "./Home.module.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchTrendingMovies()
      .then((data) => {
        if (data && Array.isArray(data.results)) {
          setMovies(data.results);
        } else {
          throw new Error("Invalid data format");
        }
      })
      .catch((err) => {
        console.error("Error fetching trending movies:", err);
        setError("Failed to load movies. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={s.container}>
      <h1 className={s.title}>Trending Movies</h1>
      {loading && <p className={s.loading}>Loading...</p>}
      {error && <p className={s.error}>{error}</p>}
      <div className={s.movieList}>
        {movies.map((movie) => (
          <Link
            to={`/movies/${movie.id}`}
            key={movie.id}
            className={s.movieItem}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title || "Movie Poster"}
              className={s.movieImage}
            />
            <p className={s.movieTitle}>{movie.title || "Untitled Movie"}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;