import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
];

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <ul className={s.list}>
        {NAV_ITEMS.map(({ to, label }) => (
          <li key={to} className={s.item}>
            <NavLink
              to={to}
              className={({ isActive }) => (isActive ? s.activeLink : s.link)}
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;