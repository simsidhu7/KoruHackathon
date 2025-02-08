import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './ClassListPage.scss';

function ClassListPage() {
  const navigate = useNavigate();

  // Calculate color based on percentage (0-1)
  // HSL: Red (0) -> Yellow (60) -> Green (120)
  const getCompletionColor = (percentage) => {
    // Convert percentage to hue (0-120)
    const hue = percentage * 120;
    // Adjust saturation and lightness based on hue range
    const saturation = hue > 30 && hue < 90 ? '85%' : '70%';  // Higher saturation for yellows/oranges
    const lightness = hue > 30 && hue < 90 ? '50%' : '45%';   // Higher lightness for yellows/oranges
    return `hsl(${hue}, ${saturation}, ${lightness})`;
  };

  const classes = [
    {
      id: "c101",
      code: "MATH101",
      name: "Algebra Fundamentals",
      grade: 9,
      completionPercentage: 0.75,
      studentCount: 28
    },
    {
      id: "c102",
      code: "SCI201",
      name: "Biology",
      grade: 10,
      completionPercentage: 0.45,
      studentCount: 32
    },
    {
      id: "c103",
      code: "ENG301",
      name: "World Literature",
      grade: 11,
      completionPercentage: 0.92,
      studentCount: 25
    },
    {
      id: "c104",
      code: "HIST102",
      name: "Ancient Civilizations",
      grade: 9,
      completionPercentage: 0.33,
      studentCount: 30
    },
    {
      id: "c105",
      code: "PHYS202",
      name: "Physics",
      grade: 10,
      completionPercentage: 0.68,
      studentCount: 27
    }
  ];

  const handleCardClick = (id) => {
    navigate(`/classes/${id}`);
  };

  return (
    <div className="class-list">
      <Header />
      <main className="class-list__content">
        <h1 className="class-list__title">Classes</h1>
        <div className="class-list__gallery">
          {classes.map((classItem) => (
            <div 
              key={classItem.id} 
              className="class-card"
              onClick={() => handleCardClick(classItem.id)}
            >
              <div className="class-card__content">
                <h2 className="class-card__title">
                  {classItem.code}: {classItem.name}
                </h2>
                <div className="class-card__students">
                  <span className="class-card__icon">👤</span>
                  <span className="class-card__count">{classItem.studentCount} students</span>
                </div>
              </div>
              <div 
                className="class-card__completion"
                style={{ 
                  backgroundColor: getCompletionColor(classItem.completionPercentage),
                  color: 'white'
                }}
              >
                {Math.round(classItem.completionPercentage * 100)}% Observed
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ClassListPage; 