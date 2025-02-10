import { Link } from "react-router-dom";
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <h1 className="header__title">ClassClarity</h1>
        <span className="header__icon">👁️</span>
      </div>
      <div className="header__icons">
        <Link to="/" className="header__home">Home 🏠</Link>
        <Link to="/classes" className="header__classes">Classes 👥</Link>
      </div>
    </header>
  );
}

export default Header; 