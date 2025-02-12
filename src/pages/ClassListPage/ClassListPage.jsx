import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./ClassListPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

function ClassListPage() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // fetch classes list
  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/classes`
      );
      // console.log(data);
      setClasses(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Calculate color based on percentage (0-1)
  // HSL: Red (0) -> Yellow (60) -> Green (120)
  const getCompletionColor = (percentage) => {
    // Convert percentage to hue (0-120)
    const hue = percentage * 120;
    // Adjust saturation and lightness based on hue range
    const saturation = hue > 30 && hue < 90 ? "85%" : "70%"; // Higher saturation for yellows/oranges
    const lightness = hue > 30 && hue < 90 ? "50%" : "45%"; // Higher lightness for yellows/oranges
    return `hsl(${hue}, ${saturation}, ${lightness})`;
  };

  const handleCardClick = (id) => {
    navigate(`/classes/${id}`);
  };

  return (
    <div className="class-list">
      <Header />
      <main className="class-list__content">
        <h1 className="class-list__title">Classes</h1>
        {isLoading ? (
          <div className="spinner">
            <HashLoader color="#ffa726" size={120} />
            <p>Just a moment, content is loading.</p>
          </div>
        ) : (
          <div className="class-list__gallery">
            {classes.map(({ _id, name, studentCount, completion }) => (
              <div
                key={_id}
                className="class-card"
                onClick={() => handleCardClick(_id)}>
                <div className="class-card__content">
                  <h2 className="class-card__title">{name}</h2>
                  <div className="class-card__students">
                    <span className="class-card__icon">👤</span>
                    <span className="class-card__count">
                      {studentCount} students
                    </span>
                  </div>
                </div>
                <div
                  className="class-card__completion"
                  style={{
                    backgroundColor: getCompletionColor(completion),
                    color: "white",
                  }}>
                  {Math.round(completion * 100)}% Observed
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ClassListPage;
