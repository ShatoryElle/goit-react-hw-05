import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../service/api";
import PropTypes from "prop-types";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams(); // Отримання ID фільму з URL
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data.results || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, [movieId]);

  return (
    <div className={s.container}>
      <h2 className={s.title}>Reviews</h2>
      {loading && <p className={s.loading}>Loading reviews...</p>}
      {error && <p className={s.error}>{error}</p>}
      {!loading && !error && reviews.length === 0 && (
        <p className={s.noReviews}>No reviews available for this movie.</p>
      )}
      <ul className={s.reviewList}>
        {reviews.map(({ id, author, content }) => (
          <li key={id} className={s.reviewItem}>
            <h3 className={s.author}>Author: {author || "Anonymous"}</h3>
            <p className={s.content}>
              {content.length > 300 ? `${content.slice(0, 300)}...` : content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

MovieReviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string,
      content: PropTypes.string.isRequired,
    })
  ),
};

export default MovieReviews;