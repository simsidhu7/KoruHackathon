import React from 'react';
import observationsData from '../../data/observationsData.json';
import classesData from '../../data/classesData.json';
import './StudentModal.scss';

function StudentModal({ student, onClose }) {
  if (!student) return null;

  const currentClass = classesData.classes.find(c => c.id === student.classId);
  const studentObservations = observationsData.observations.filter(
    obs => obs.studentId === student.id
  );

  const learningSkills = currentClass?.learningSkills || [];
  const getObservationForSkill = (skill) => {
    return studentObservations.find(obs => obs.learningSkill === skill);
  };

  return (
    <div className="modal-overlay">
      <div className="student-modal">
        <button className="student-modal__close" onClick={onClose}>×</button>
        <h2 className="student-modal__title">{student.firstName} {student.lastName}</h2>
        
        <div className="student-modal__stats">
          <div className="student-modal__stat">
            <span className="student-modal__stat-label">Student ID</span>
            <span className="student-modal__stat-value">{student.id}</span>
          </div>
          <div className="student-modal__stat">
            <span className="student-modal__stat-label">Grade Level</span>
            <span className="student-modal__stat-value">{student.grade}</span>
          </div>
          <div className="student-modal__stat">
            <span className="student-modal__stat-label">Class Grade</span>
            <span className="student-modal__stat-value">{student.classGrade}%</span>
          </div>
        </div>

        <div className="student-modal__section">
          <h3 className="student-modal__section-title">Observations</h3>
          <div className="student-modal__observations">
            {learningSkills.map(skill => {
              const observation = getObservationForSkill(skill);
              return (
                <div 
                  key={skill} 
                  className={`student-modal__observation ${!observation ? 'student-modal__observation--missing' : ''}`}
                >
                  <span className="student-modal__observation-skill">
                    {skill}
                    {!observation && <span className="student-modal__observation-status">Missing</span>}
                  </span>
                  {observation ? (
                    <p className="student-modal__observation-content">{observation.content}</p>
                  ) : (
                    <p className="student-modal__observation-content">No observation recorded for this skill</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentModal; 