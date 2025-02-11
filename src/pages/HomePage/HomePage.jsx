import "./HomePage.scss";
import "../../App.scss";
import Header from "../../components/Header/Header";
import bubble from "../../assets/images/bubble.jpg";
import {useNavigate} from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <Header />
      <main className="homepage__content">
        <section className="homepage__hero">
          <div className="homepage__hero-title-container">
            <h2 className="homepage__hero-title">
              Streamline Student Observations Effortlessly!
            </h2>
            <img
              src={bubble}
              alt="Thinking Bubble Graphic"
              className="homepage__hero-image"
            />
          </div>
          <p className="homepage__hero-description">
            ClassClarity helps with classroom management by allowing teachers to
            seamlessly document student observations, track progress, and
            generate insightful reports - all in one easy-to-use platform.
          </p>
          <button className="homepage__hero-button"
          onClick={()=> navigate ("/classes")}
          >Get Started</button>
        </section>

        <section className="homepage__features">
          <div className="homepage__feature">
            <div className="homepage__feature-icon">⭐</div>
            <h3 className="homepage__feature-title">Observation Tracking</h3>
            <p className="homepage__feature-description">
              Easily log and organize student observations in real-time.
            </p>
          </div>
          <div className="homepage__feature">
            <div className="homepage__feature-icon">⭐</div>
            <h3 className="homepage__feature-title">Reusable Templates</h3>
            <p className="homepage__feature-description">
              Save time with pre-built and customizable templates.
            </p>
          </div>
          <div className="homepage__feature">
            <div className="homepage__feature-icon">⭐</div>
            <h3 className="homepage__feature-title">Insightful Reports</h3>
            <p className="homepage__feature-description">
              Generate progress reports in just a few clicks.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="footer__text">Brainstation Baddies © 2025</p>
      </footer>
    </div>
  );
}

export default HomePage;
