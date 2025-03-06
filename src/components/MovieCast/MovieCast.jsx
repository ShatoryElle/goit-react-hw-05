import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import s from "./MovieCast.module.css";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjRmMDNjY2YwYTY1MGY1NmQyNWFiNzdlNzc2ZDQ5NSIsIm5iZiI6MTczNTg5MTA2OS4xMDA5OTk4LCJzdWIiOiI2Nzc3OTg3ZDMyMWEzYTE2NmE3NDk0ZTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Au8o-qnGToeBo2SDCU9e84NCfmb37TJoIgPFn4kvC7A`,
        },
      })
      .then((response) => {
        setCast(response.data.cast || []);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching cast:", err);
        setError("Failed to load cast. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <div className={s.container}>
      {loading && <p className={s.loading}>Loading...</p>}
      {error && <p className={s.error}>{error}</p>}
      {!loading && cast.length === 0 && !error && (
        <p className={s.noData}>No cast information available.</p>
      )}
      <ul className={s.list}>
        {cast.map((actor) => (
          <li key={actor.id} className={s.item}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={actor.name}
              className={s.image}
            />
            <p className={s.name}>{actor.name}</p>
            {actor.character && (
              <p className={s.character}>as {actor.character}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;