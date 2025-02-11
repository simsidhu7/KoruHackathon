import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import StudentModal from '../../components/StudentModal/StudentModal';
import classesData from '../../data/classesData.json';
import studentsData from '../../data/studentsData.json';
import studentClassData from '../../data/studentClassData.json';
import observationsData from '../../data/observationsData.json';
import './ClassPage.scss';

function ClassPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);

  const currentClass = classesData.classes.find(c => c.id === id);
  
  // Get all student evaluations for this class
  const classEvaluations = studentClassData.evaluations.filter(evaluation => evaluation.classId === id);
  
  // Get the full student data for each student in the class
  const students = classEvaluations.map(evaluation => {
    const studentData = studentsData.students.find(s => s.id === evaluation.studentId);
    return {
      ...studentData,
      classId: id,  // Add classId from current context
      classGrade: evaluation.classGrade
    };
  });

  // Calculate observation percentage
  const totalPossibleObservations = students.length * (currentClass?.learningSkills?.length || 0);
  const actualObservations = observationsData.observations.filter(
    obs => obs.classId === id
  ).length;
  const observationPercentage = totalPossibleObservations > 0 
    ? Math.round((actualObservations / totalPossibleObservations) * 100)
    : 0;

  const handleBackClick = () => {
    navigate('/classes');
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const formatLearningSkills = (skills, studentId, className) => {
    if (!skills) return null;
    return skills.map(skill => {
      const hasObservation = observationsData.observations.some(
        obs => obs.studentId === studentId && obs.learningSkill === skill
      );
      return (
        <span 
          key={skill} 
          className={`${className} ${hasObservation ? `${className}--observed` : ''}`}
        >
          {skill}
        </span>
      );
    });
  };

  return (
    <div className="class-page">
      <Header />
      <main>
        <div className="class-page__content">
          <div className="class-page__header">
            <span className="class-page__back" onClick={handleBackClick}>
              ‹
            </span>
            <h1>{currentClass?.name}</h1>
          </div>
          <div className="class-page__stats">
            <div className="class-page__stat">
              <span className="class-page__stat-label">Grade Level</span>
              <span className="class-page__stat-value">{currentClass?.grade}</span>
            </div>
            <div className="class-page__stat">
              <span className="class-page__stat-label">Students</span>
              <span className="class-page__stat-value">{students.length}</span>
            </div>
            <div className="class-page__stat">
              <span className="class-page__stat-label">Average</span>
              <span className="class-page__stat-value">
                {Math.round(students.reduce((sum, student) => sum + student.classGrade, 0) / students.length)}%
              </span>
            </div>
            <div className="class-page__stat">
              <span className="class-page__stat-label">Observations</span>
              <span className="class-page__stat-value">{observationPercentage}%</span>
            </div>
            <div className="class-page__stat class-page__stat--skills">
              <span className="class-page__stat-label">Learning Skills</span>
              <div className="class-page__stat-value class-page__stat-value--skills">
                {currentClass?.learningSkills.map(skill => (
                  <span key={skill} className="class-page__skill-bubble">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="student-table">
            <div className="student-table__header">
              <div className="student-table__col student-table__col--name">Name</div>
              <div className="student-table__col student-table__col--grade-level">Grade Level</div>
              <div className="student-table__col student-table__col--grade">Grade</div>
              <div className="student-table__col student-table__col--skills">Observations</div>
            </div>
            {students.map(student => (
              <div 
                key={student.id} 
                className="student-table__row"
                onClick={() => handleStudentClick(student)}
              >
                <div className="student-table__col student-table__col--name">
                  {student.firstName} {student.lastName}
                </div>
                <div className="student-table__col student-table__col--grade-level">
                  {student.gradeLevel}
                </div>
                <div className="student-table__col student-table__col--grade">
                  {student.classGrade}%
                </div>
                <div className="student-table__col student-table__col--skills">
                  {formatLearningSkills(currentClass?.learningSkills, student.id, "student-table__skill-bubble")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <StudentModal 
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
}

export default ClassPage; 