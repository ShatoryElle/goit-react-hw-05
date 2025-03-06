import {
  useParams,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../../service/api";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const previousLocation = location.state?.from || "/movies";

  useEffect(() => {
    fetchMovieDetails(movieId)
      .then(setMovie)
      .catch((err) => console.error("Error fetching movie details:", err));
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  const { title, overview, poster_path, genres, vote_average } = movie;

  return (
    <div className={s.container}>
      <button className={s.goBack} onClick={() => navigate(previousLocation)}>
        Go back
      </button>
      <div className={s.details}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className={s.poster}
        />
        <div className={s.info}>
          <h1 className={s.title}>{title}</h1>
          <p className={s.rating}>Rating: {vote_average}</p>
          <p className={s.overview}>{overview}</p>
          <p className={s.genres}>
            Genres: {genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
      </div>
      <div className={s.links}>
        <Link to="cast" state={{ from: previousLocation }} className={s.link}>
          Cast
        </Link>
        <Link to="reviews" state={{ from: previousLocation }} className={s.link}>
          Reviews
        </Link>
      </div>
      <Outlet /> {/* Рендеринг вкладених маршрутів */}
    </div>
  );
};

export default MovieDetailsPage;