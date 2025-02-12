import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import StudentModal from "../../components/StudentModal/StudentModal";
import "./ClassPage.scss";
import axios from "axios";

function ClassPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const mockAssessments = [
    {
      assessment_id: "A1001",
      title: "Algebra Quiz",
      date: "2025-01-15",
      score: "85%",
      comments:
        "Great understanding of equations, but needs to work on solving word problems.",
    },
    {
      assessment_id: "A1002",
      title: "Geometry Test",
      date: "2025-01-22",
      score: "90%",
      comments: "Excellent work on angles and shapes. Keep up the effort!",
    },
    // {
    //   assessment_id: "A1003",
    //   title: "Science Lab Report",
    //   date: "2025-01-29",
    //   score: "88%",
    //   comments:
    //     "Good analysis and hypothesis. Try to improve clarity in the conclusion section.",
    // },
    // {
    //   assessment_id: "A1004",
    //   title: "History Essay",
    //   date: "2025-02-05",
    //   score: "82%",
    //   comments: "Well-researched and structured. Could enhance argument depth.",
    // },
  ];
  const [currentClass, setCurrentClass] = useState({});
  const [students, setStudenrs] = useState(null);

  // fetch class by ID
  const fetchClassById = async (classId) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/classes/${classId}`
      );

      setCurrentClass(data.classItem);
    } catch (error) {
      console.error(error);
    }
  };

  // fetch all students by Class
  const fetchStudentsByClass = async (classId) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/students/class/${classId}`
      );
      // console.log(data);
      setStudenrs(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClassById(id);
    fetchStudentsByClass(id);
  }, [id]);

  // Calculate observation percentage
  const calcFilledObservations = (currentClassObservs = 0, students = 0) => {
    const totalObservations = students?.length * currentClassObservs;
    // console.log(totalObservations)
    const filledObservations = students?.reduce((acc, s) => {
      const countFilled = s.learningSkills.filter(
        (skill) => skill.content !== ""
      ).length;
      // console.log(acc)
      return (acc += countFilled);
    }, 0);

    const result = (filledObservations * 100) / totalObservations;
    return result.toFixed(1);
  };

  const handleBackClick = () => {
    navigate("/classes");
  };

  const handleStudentClick = async (studentId) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/students/${studentId}`
      );
      // console.log(data);
      setSelectedStudent({ ...data, assessments: mockAssessments });
    } catch (error) {
      console.error(error);
    }
  };

  const formatLearningSkills = (studentObservations, className) => {
    if (!currentClass || !currentClass.learningSkills) return null;

    return currentClass.learningSkills.map((skill, index) => {
      const obs = studentObservations.find(
        (o) => o.observationId === skill._id
      );
      // console.log(obs)
      return (
        <span
          key={skill._id}
          className={`${className} ${
            obs?.content ? `${className}--observed` : ""
          }`}
        >
          {index + 1}: {skill.name}
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
          {currentClass && (
            <div className="class-page__stats">
              <div className="class-page__stat">
                <span className="class-page__stat-label">Grade Level</span>
                <span className="class-page__stat-value">
                  {currentClass?.gradeLevel}
                </span>
              </div>
              <div className="class-page__stat">
                <span className="class-page__stat-label">Students</span>
                <span className="class-page__stat-value">
                  {students?.length}
                </span>
              </div>
              <div className="class-page__stat">
                <span className="class-page__stat-label">Average</span>
                <span className="class-page__stat-value">
                  {Math.round(
                    students?.reduce(
                      (sum, student) => sum + student.classGrade,
                      0
                    ) / students?.length
                  )}
                  %
                </span>
              </div>
              <div className="class-page__stat">
                <span className="class-page__stat-label">Observations</span>
                <span className="class-page__stat-value">
                  {calcFilledObservations(
                    currentClass?.learningSkills?.length,
                    students
                  )}
                  %
                </span>
              </div>
              <div className="class-page__stat class-page__stat--skills">
                <span className="class-page__stat-label">Learning Skills</span>
                <div className="class-page__stat-value class-page__stat-value--skills">
                  {currentClass?.learningSkills?.map((skill) => (
                    <span key={skill._id} className="class-page__skill-bubble">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="student-table">
            <div className="student-table__header">
              <div className="student-table__col student-table__col--name">
                Name
              </div>
              <div className="student-table__col student-table__col--grade-level">
                Grade Level
              </div>
              <div className="student-table__col student-table__col--grade">
                Grade
              </div>
              <div className="student-table__col student-table__col--skills">
                Observations
              </div>
            </div>
            {students?.map(
              ({
                _id,
                firstName,
                lastName,
                gradeLevel,
                classGrade,
                learningSkills,
              }) => (
                <div
                  key={_id}
                  className="student-table__row"
                  onClick={() => handleStudentClick(_id)}
                >
                  <div className="student-table__col student-table__col--name">
                    {firstName} {lastName}
                  </div>
                  <div className="student-table__col student-table__col--grade-level">
                    {gradeLevel}
                  </div>
                  <div className="student-table__col student-table__col--grade">
                    {classGrade}%
                  </div>
                  <div className="student-table__col student-table__col--skills">
                    {formatLearningSkills(
                      learningSkills,
                      "student-table__skill-bubble"
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </main>
      <StudentModal
        classId={currentClass?._id}
        student={selectedStudent}
        learningSkills={currentClass?.learningSkills}
        assessments={selectedStudent?.assessments || []}
        onClose={() => setSelectedStudent(null)}
        updateStudentInfo={handleStudentClick}
        updateStudentsList={fetchStudentsByClass}
      />
    </div>
  );
}

export default ClassPage;
