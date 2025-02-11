import { useState } from 'react';
import './StudentModal.scss';

function StudentModal({ student, onClose , classId, learningSkills}) {
  const [activeTab, setActiveTab] = useState('observations');

  if (!student) return null;
  // console.log(student.classes)

  const currentClass = student?.classes?.find(c => {
    // console.log(c)
    return c.classId === classId
  });
  // console.log(currentClass)

  return (
    <div className="modal-overlay">
      <div className="student-modal">
        <div className="student-modal__header">
          <button className="student-modal__close" onClick={onClose}>×</button>
          <h2 className="student-modal__title">{student?.firstName} {student?.lastName}</h2>
        </div>
        
        <div className="student-modal__content">
          <div className="student-modal__stats">
            <div className="student-modal__stat">
              <span className="student-modal__stat-label">Student ID</span>
              {/* <span className="student-modal__stat-value">{student?._id}</span> */}
            </div>
            <div className="student-modal__stat">
              <span className="student-modal__stat-label">Grade Level</span>
              <span className="student-modal__stat-value">{student?.gradeLevel}</span>
            </div>
            <div className="student-modal__stat">
              <span className="student-modal__stat-label">Class Grade</span>
              <span className="student-modal__stat-value">{currentClass?.classGrade || '-'}%</span>
            </div>
          </div>

          <div className="student-modal__tabs">
            <button 
              className={`student-modal__tab ${activeTab === 'observations' ? 'student-modal__tab--active' : ''}`}
              onClick={() => setActiveTab('observations')}
            >
              Observations
            </button>
            <button 
              className={`student-modal__tab ${activeTab === 'assessments' ? 'student-modal__tab--active' : ''}`}
              onClick={() => setActiveTab('assessments')}
            >
              Assessments
            </button>
            <button 
              className={`student-modal__tab ${activeTab === 'summary' ? 'student-modal__tab--active' : ''}`}
              onClick={() => setActiveTab('summary')}
            >
              Summary & Final Comment
            </button>
          </div>

          {activeTab === 'observations' ? (
            <div className="student-modal__section">
              <h3 className="student-modal__section-title">Observations</h3>
              <div className="student-modal__observations">
                {learningSkills?.map(skill => {
                  const obs = currentClass?.observations?.find(
                    (o) => o.observationId === skill._id
                  );
                  return (
                    <div 
                      key={skill._id} 
                      className={`student-modal__observation ${!obs?.content ? 'student-modal__observation--missing' : ''}`}
                    >
                      <div className="student-modal__observation-content-wrapper">
                        <div className="student-modal__observation-header">
                          <span className="student-modal__observation-skill">
                            {skill.name}
                            {!obs.content && <span className="student-modal__observation-status">Missing</span>}
                          </span>
                        </div>
                        {obs.content ? (
                          <>
                            <p className="student-modal__observation-content">{obs.content}</p>
                            <span className="student-modal__observation-date">
                              {new Date().toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </>
                        ) : (
                          <p className="student-modal__observation-content">No observation recorded for this skill</p>
                        )}
                      </div>
                      {obs.content ? (
                        <button className="student-modal__edit-button">
                          ✎
                        </button>
                      ) : (
                        <button className="student-modal__add-button">
                          +
                        </button>
                      )}
                    </div>
                  );
                })}
                <button className="student-modal__general-button">
                  <span className="student-modal__general-button-icon">+</span>
                  Add an observation
                </button>
              </div>
            </div>
          ) : activeTab === 'assessments' ? (
            <div className="student-modal__section">
              <h3 className="student-modal__section-title">Assessments</h3>
              <div className="student-modal__assessments">
                <button className="student-modal__general-button">
                  <span className="student-modal__general-button-icon">+</span>
                  Add an assessment
                </button>
              </div>
            </div>
          ) : (
            <div className="student-modal__section">
              <div className="student-modal__summary">
                <h3 className="student-modal__section-title">Generated Summary</h3>
                <div className="student-modal__summary-content">
                  {currentClass?.classGrade ? (
                    "Will be generated text"
                  ) : (
                    "No observations have been recorded yet. Add observations to generate a summary of the student's progress."
                  )}
                </div>
              </div>

              <div className="student-modal__evaluation">
                <h3 className="student-modal__section-title">Final Term Comment</h3>
                <button className="student-modal__evaluation-button">
                  <span className="student-modal__evaluation-button-icon">+</span>
                  Add final term comment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentModal; 