import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const query = searchParams.get("query") || "";

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchQuery = form.elements.search.value.trim();

    if (searchQuery) {
      setSearchParams({ query: searchQuery });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjRmMDNjY2YwYTY1MGY1NmQyNWFiNzdlNzc2ZDQ5NSIsIm5iZiI6MTczNTg5MTA2OS4xMDA5OTk4LCJzdWIiOiI2Nzc3OTg3ZDMyMWEzYTE2NmE3NDk0ZTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Au8o-qnGToeBo2SDCU9e84NCfmb37TJoIgPFn4kvC7A`,
            },
            params: {
              query,
              language: "en-US",
              page: 1,
              include_adult: false,
            },
          }
        );

        setMovies(response.data.results);
        setError(null);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to fetch movies. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div className={s.container}>
      <h1 className={s.title}>Search Movies</h1>
      <form onSubmit={handleSearch} className={s.form}>
        <input
          type="text"
          name="search"
          placeholder="Search for a movie"
          defaultValue={query}
          className={s.input}
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>

      {isLoading && <p>Loading movies...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!isLoading && !error && <MovieList movies={movies} />}
    </div>
  );
}

export default MoviesPage;