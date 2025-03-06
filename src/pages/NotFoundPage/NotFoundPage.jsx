import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={s.container}>
      <h1 className={s.title}>404</h1>
      <p className={s.message}>Sorry, this page is not available</p>
      <Link to="/" className={s.link}>
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;