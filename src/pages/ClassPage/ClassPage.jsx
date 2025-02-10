import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import classesData from '../../data/classesData.json';
import studentsData from '../../data/studentsData.json';
import './ClassPage.scss';

function ClassPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const currentClass = classesData.classes.find(c => c.id === id);
  const classStudents = studentsData.students.filter(student => student.classId === id);

  const handleBack = () => {
    navigate('/classes');
  };

  const formatLearningSkills = (skills, className = "class-page__skill-bubble") => {
    return skills?.map((skill, index) => (
      <span key={index} className={className}>
        {index + 1} - {skill}
      </span>
    ));
  };

  return (
    <div className="class-page">
      <Header />
      <main className="class-page__content">
        <div className="class-page__header">
          <span 
            className="class-page__back" 
            onClick={handleBack}
          >
            ‹
          </span>
          <h1>{currentClass?.code}: {currentClass?.name}</h1>
        </div>
        <div className="class-page__stats">
          <div className="class-page__stat">
            <span className="class-page__stat-label">Grade Level</span>
            <span className="class-page__stat-value">{currentClass?.grade}</span>
          </div>
          <div className="class-page__stat">
            <span className="class-page__stat-label">Student Count</span>
            <span className="class-page__stat-value">{currentClass?.studentCount}</span>
          </div>
          <div className="class-page__stat">
            <span className="class-page__stat-label">Observed</span>
            <span className="class-page__stat-value">
              {Math.round(currentClass?.completionPercentage * 100)}%
            </span>
          </div>
          <div className="class-page__stat class-page__stat--skills">
            <span className="class-page__stat-label">Learning Skills</span>
            <div className="class-page__stat-value class-page__skill-bubbles">
              {formatLearningSkills(currentClass?.learningSkills)}
            </div>
          </div>
        </div>

        <div className="student-table">
          <div className="student-table__header">
            <div className="student-table__col">Name</div>
            <div className="student-table__col">Grade Level</div>
            <div className="student-table__col">Class Grade</div>
            <div className="student-table__col">Observations</div>
          </div>
          {classStudents.map((student) => (
            <div key={student.id} className="student-table__row">
              <div className="student-table__col">{student.firstName} {student.lastName}</div>
              <div className="student-table__col">{student.grade}</div>
              <div className="student-table__col">{student.classGrade}%</div>
              <div className="student-table__col student-table__col--skills">
                {formatLearningSkills(currentClass?.learningSkills, "student-table__skill-bubble")}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ClassPage; 