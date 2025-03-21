import { useState } from "react";
import "./StudentModal.scss";
import axios from "axios";
import { HashLoader } from "react-spinners";

function StudentModal({
  student,
  onClose,
  classId,
  learningSkills,
  assessments = [],
  updateStudentInfo,
  updateStudentsList
}) {
  const [activeTab, setActiveTab] = useState("observations");
  const [expandedObservation, setExpandedObservation] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [showFinalComment, setShowFinalComment] = useState(false);
  const [finalComment, setFinalComment] = useState("");
  const [isUpdating, setIsUpdating] = useState(null);

  if (!student) return null;
  // console.log(student.classes)

  const currentClass = student?.classes?.find((c) => {
    // console.log(c)
    return c.classId === classId;
  });
  // console.log(currentClass)

  const generateSummary = async (studentId, classId) => {
    try {
      setIsLoadingSummary(true);
      const regenerate = true;
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/students/generateSummary`,
        {
          classId,
          studentId,
          regenerate,
        }
      );
      console.log(res.data);
      setNewSummary(res.data.summary);
      setIsLoadingSummary(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateObservation = async (obs, obsId) => {
    try {
      setIsUpdating(obsId);
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/students/${
          student._id
        }/class/${classId}/update`,
        {
          observation: obs,
          obsId,
        }
      );

      updateStudentInfo(student._id);
      setIsUpdating(null);
      setEditedContent("");
      setSelectedVariation(null);
      setExpandedObservation(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleObservationEdit = (obs, skill) => {
    const observationId = obs ? obs.observationId : `new-${skill._id}`;

    if (expandedObservation === observationId) {
      setExpandedObservation(null);
      setSelectedVariation(null);
      setEditedContent("");
    } else {
      setExpandedObservation(observationId);
      setSelectedVariation(null);
      setEditedContent(obs ? obs.content : "");
    }
  };

  const handleVariationSelect = (variation) => {
    setSelectedVariation(variation);
    setEditedContent(variation);
  };

  const getObservationStatements = (skill) => {
    const statements = {
      "Problem Solving": [
        "Outstanding - Demonstrates exceptional ability to analyze complex problems, develop innovative solutions, and explain reasoning with clarity.",
        "Strong - Shows consistent ability to break down problems effectively and apply appropriate problem-solving strategies.",
        "Developing - Can solve basic problems but needs support with more complex tasks and multi-step solutions.",
        "Needs Support - Requires guidance to develop systematic problem-solving strategies and organize approaches.",
      ],
      "Pattern Recognition": [
        "Outstanding - Shows remarkable ability to identify complex patterns and make connections across different concepts.",
        "Strong - Effectively recognizes patterns and can apply this understanding to new situations.",
        "Developing - Identifies basic patterns but needs support with more complex relationships.",
        "Needs Support - Requires assistance to identify and understand patterns.",
      ],
      "Logical Reasoning": [
        "Outstanding - Demonstrates sophisticated logical thinking with clear, well-structured explanations and justifications.",
        "Strong - Shows good reasoning skills and can effectively explain thought processes.",
        "Developing - Beginning to show logical approaches but explanations need more detail.",
        "Needs Support - Requires guidance to develop and articulate logical arguments.",
      ],
      "Scientific Method": [
        "Outstanding - Expertly applies scientific principles with thorough methodology and insightful analysis.",
        "Strong - Shows good understanding of scientific processes and can apply them effectively.",
        "Developing - Understands basic scientific concepts but needs support with methodology.",
        "Needs Support - Requires assistance to understand and apply scientific processes.",
      ],
      "Data Analysis": [
        "Outstanding - Shows exceptional ability to analyze data, draw conclusions, and make meaningful connections.",
        "Strong - Effectively interprets data and can identify significant patterns and trends.",
        "Developing - Can work with basic data but needs support with complex analysis.",
        "Needs Support - Requires guidance to interpret and analyze data effectively.",
      ],
      "Written Expression": [
        "Outstanding - Produces clear, well-structured writing with sophisticated vocabulary and strong organization.",
        "Strong - Communicates ideas effectively with good organization and appropriate detail.",
        "Developing - Shows basic writing skills but needs support with organization and elaboration.",
        "Needs Support - Requires assistance to organize and express ideas clearly.",
      ],
    };

    return (
      statements[skill] || [
        "Outstanding - Demonstrates exceptional mastery and understanding beyond grade level expectations.",
        "Strong - Shows consistent competence and reliable performance in this area.",
        "Developing - Shows basic understanding but needs support with more complex aspects.",
        "Needs Support - Requires ongoing guidance to develop fundamental skills.",
      ]
    );
  };

  const handleModalClose = () => {
    setNewSummary("");
    setIsLoadingSummary(false);
    updateStudentsList(classId)
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="student-modal">
        <div className="student-modal__header">
          <button className="student-modal__close" onClick={handleModalClose}>
            ×
          </button>
          <h2 className="student-modal__title">
            {student?.firstName} {student?.lastName}
          </h2>
        </div>

        <div className="student-modal__content">
          <div className="student-modal__stats">
            <div className="student-modal__stat">
              <span className="student-modal__stat-label">Student ID</span>
              <span className="student-modal__stat-value">
                {student?.studentId}
              </span>
            </div>
            <div className="student-modal__stat">
              <span className="student-modal__stat-label">Grade Level</span>
              <span className="student-modal__stat-value">
                {student?.gradeLevel}
              </span>
            </div>
            <div className="student-modal__stat">
              <span className="student-modal__stat-label">Class Grade</span>
              <span className="student-modal__stat-value">
                {currentClass?.classGrade || "-"}%
              </span>
            </div>
          </div>

          <div className="student-modal__tabs">
            <button
              className={`student-modal__tab ${
                activeTab === "observations" ? "student-modal__tab--active" : ""
              }`}
              onClick={() => setActiveTab("observations")}>
              Observations
            </button>
            <button
              className={`student-modal__tab ${
                activeTab === "assessments" ? "student-modal__tab--active" : ""
              }`}
              onClick={() => setActiveTab("assessments")}>
              Assessments
            </button>
            <button
              className={`student-modal__tab ${
                activeTab === "summary" ? "student-modal__tab--active" : ""
              }`}
              onClick={() => setActiveTab("summary")}>
              Summary & Final Comment
            </button>
          </div>

          {activeTab === "observations" ? (
            <div className="student-modal__section">
              <h3 className="student-modal__section-title">
                Learning Skills Observations
              </h3>
              <div className="student-modal__observations">
                {learningSkills?.map((skill) => {
                  const obs = currentClass?.observations?.find(
                    (o) => o.observationId === skill._id
                  );
                  return (
                    <div
                      key={skill._id}
                      className={`student-modal__observation ${
                        !obs?.content
                          ? "student-modal__observation--missing"
                          : ""
                      }`}>
                      <div className="student-modal__observation-content-wrapper">
                        <div className="student-modal__observation-header">
                          <span className="student-modal__observation-skill">
                            {skill.name}
                            {!obs?.content && (
                              <span className="student-modal__observation-status">
                                Missing
                              </span>
                            )}
                          </span>
                        </div>
                        {obs?.content ? (
                          <div className="student-modal__observation-expanded">
                            <div className="student-modal__observation-main">
                              <p className="student-modal__observation-content">
                                {isUpdating === obs.observationId ? (
                                  <HashLoader color="#4a90e2" size={30} />
                                ) : (
                                  obs.content
                                )}
                              </p>
                            </div>

                            <div
                              className={`student-modal__variations ${
                                expandedObservation === obs.observationId
                                  ? "student-modal__variations--expanded"
                                  : ""
                              }`}>
                              <div className="student-modal__variations-list">
                                {getObservationStatements(skill).map(
                                  (statement, index) => (
                                    <button
                                      key={index}
                                      className={`student-modal__variation ${
                                        selectedVariation === statement
                                          ? "student-modal__variation--selected"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        handleVariationSelect(statement)
                                      }>
                                      {statement}
                                    </button>
                                  )
                                )}
                              </div>
                              <div className="student-modal__edit-field">
                                <textarea
                                  value={editedContent}
                                  onChange={(e) =>
                                    setEditedContent(e.target.value)
                                  }
                                  className="student-modal__edit-textarea"
                                  rows={3}
                                  placeholder="Click on a statement to edit the observation here, or write a custom observation here"
                                />
                                <button
                                  className="student-modal__save-button"
                                  onClick={() =>
                                    updateObservation(
                                      editedContent,
                                      obs.observationId
                                    )
                                  }>
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="student-modal__observation-expanded">
                            <p className="student-modal__observation-content">
                              {isUpdating === obs.observationId ? (
                                <HashLoader color="#4a90e2" size={30} />
                              ) : (
                                "No observation recorded for this skill"
                              )}
                            </p>

                            <div
                              className={`student-modal__variations ${
                                expandedObservation === `new-${skill._id}`
                                  ? "student-modal__variations--expanded"
                                  : ""
                              }`}>
                              <div className="student-modal__variations-list">
                                {getObservationStatements(skill).map(
                                  (statement, index) => (
                                    <button
                                      key={index}
                                      className={`student-modal__variation ${
                                        selectedVariation === statement
                                          ? "student-modal__variation--selected"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        handleVariationSelect(statement)
                                      }>
                                      {statement}
                                    </button>
                                  )
                                )}
                              </div>
                              <div className="student-modal__edit-field">
                                <textarea
                                  value={editedContent}
                                  onChange={(e) =>
                                    setEditedContent(e.target.value)
                                  }
                                  className="student-modal__edit-textarea"
                                  rows={3}
                                  placeholder="Click on a statement to edit the observation here, or write a custom observation here..."
                                />
                                <button
                                  className="student-modal__save-button"
                                  onClick={() =>
                                    updateObservation(
                                      editedContent,
                                      obs.observationId
                                    )
                                  }>
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      {obs?.content ? (
                        <button
                          className="student-modal__edit-button"
                          onClick={() => handleObservationEdit(obs, skill)}>
                          {expandedObservation === obs.observationId
                            ? "×"
                            : "✎"}
                        </button>
                      ) : (
                        <button
                          className="student-modal__add-button"
                          onClick={() => handleObservationEdit(null, skill)}>
                          {expandedObservation === `new-${skill._id}`
                            ? "×"
                            : "+"}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <h3 className="student-modal__section-title2">
                Additional Observations
              </h3>
              <button className="student-modal__general-button">
                <span className="student-modal__general-button-icon">+</span>
                Add an observation
              </button>
            </div>
          ) : activeTab === "assessments" ? (
            <div className="student-modal__section">
              <h3 className="student-modal__section-title">Assessments</h3>
              <div className="student-modal__assessments">
                <div className="student-modal__assessment">
                  <div className="student-modal__assessment-content">
                    <h4>Final Grade</h4>
                    <p>
                      <strong>Score:</strong> {currentClass?.classGrade || "-"}%
                    </p>
                  </div>
                  <button className="student-modal__edit-button">✎</button>
                </div>
                {assessments.length > 0 ? (
                  assessments.map((assessment) => (
                    <div
                      key={assessment.assessment_id}
                      className="student-modal__assessment">
                      <div className="student-modal__assessment-content">
                        <h4>{assessment.title}</h4>
                        <p>
                          <strong>Date:</strong> {assessment.date}
                        </p>
                        <p>
                          <strong>Score:</strong> {assessment.score}
                        </p>
                        <p>
                          <strong>Comments:</strong> {assessment.comments}
                        </p>
                      </div>
                      <button className="student-modal__edit-button">✎</button>
                    </div>
                  ))
                ) : (
                  <p>No additional assessments available</p>
                )}
                <button className="student-modal__general-button">
                  <span className="student-modal__general-button-icon">+</span>
                  Add an assessment
                </button>
              </div>
            </div>
          ) : (
            <div className="student-modal__section">
              <div className="student-modal__summary">
                <h3 className="student-modal__section-title">
                  Generated Summary
                </h3>
                <div className="student-modal__summary-content">
                  {isLoadingSummary ? (
                    <HashLoader color="#4a90e2" />
                  ) : (
                    <>
                      {currentClass?.generatedSummary && !newSummary ? (
                        currentClass.generatedSummary
                      ) : newSummary ? (
                        newSummary
                      ) : (
                        <p>
                          No observations have been recorded yet. Add
                          observations to generate a summary of the student's
                          progress.
                        </p>
                      )}
                      <button
                        onClick={() => generateSummary(student._id, classId)}
                        className="student-modal__summary-button">
                        Generate ✨
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="student-modal__evaluation">
                <h3 className="student-modal__section-title">
                  Final Term Comment
                </h3>
                {showFinalComment ? (
                  <div className="student-modal__evaluation-content">
                    <textarea
                      value={finalComment}
                      onChange={(e) => setFinalComment(e.target.value)}
                      className="student-modal__edit-textarea"
                      rows={4}
                      placeholder="Write your final term comment here..."
                    />
                    <div className="student-modal__button-group">
                      <button className="student-modal__save-button">
                        Save Changes
                      </button>
                      <button
                        className="student-modal__cancel-button"
                        onClick={() => {
                          setShowFinalComment(false);
                          setFinalComment("");
                        }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="student-modal__evaluation-button"
                    onClick={() => setShowFinalComment(true)}>
                    <span className="student-modal__evaluation-button-icon">
                      +
                    </span>
                    Add final term comment
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentModal;
