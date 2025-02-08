import './HomePage.scss';
import "../../App.scss";
import axios from "axios";

function HomePage (){
    return (
      <div className="header">
        <header className="header__main">
          <div className="header__logo">
            <h1 className="header__title">ClassClarity</h1>
            <span className="header__icon">👁️</span>
          </div>
          <div className="header__icons">
            <span className="header__home">Home 🏠</span>
            <span className="header__classes">Classes 👥</span>
          </div>
        </header>
  
        <main className="header__content">
          <section className="header__hero">
            <h2 className="header__hero-title">Streamline Student Observations Effortlessly!</h2>
            <p className="header__hero-description">
              ClassClarity helps with classroom management by allowing teachers to
              seamlessly document student observations, track progress, and
              generate insightful reports - all in one easy-to-use platform.
            </p>
            <button className="header__hero-button">Get Started</button>
          </section>
  
          <section className="header__features">
            <div className="header__feature">
              <div className="header__feature-icon">⭐</div>
              <h3 className="header__feature-title">Observation Tracking</h3>
              <p className="header__feature-description">
                Easily log and organize student observations in real-time.
              </p>
            </div>
            <div className="header__feature">
              <div className="header__feature-icon">⭐</div>
              <h3 className="header__feature-title">Reusable Templates</h3>
              <p className="header__feature-description">
                Save time with pre-built and customizable templates.
              </p>
            </div>
            <div className="header__feature">
              <div className="header__feature-icon">⭐</div>
              <h3 className="header__feature-title">Insightful Reports</h3>
              <p className="header__feature-description">
                Generate progress reports in just a few clicks.
              </p>
            </div>
          </section>
        </main>
        
        <footer className="footer">
                <p className="footer__text">
                    Brainstation Baddies © 2025
                </p>
            </footer>
        </div>
    );
}

  
  export default HomePage;