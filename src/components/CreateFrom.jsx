import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

const CreateForm = ({ triggerFetch }) => {
  const { id } = useParams();
  const subjectRef = useRef();
  const [button, setButton] = useState(false);
  const [code, setCode] = useState("");
  const [subjectId, setSubjectId] = useState(""); // ✅ Proper state
  const [subjects, setSubjects] = useState();
  const deptRef = useRef();
  const semRef = useRef();
  const [linkMessage, setLinkMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCode = subjectRef.current.value;
    setCode(selectedCode);

    // ✅ Find subjectId
    let foundSubjectId = "";
    if (subjects) {
      const subject = subjects.find((s) => s.unique_code === selectedCode);
      if (subject) {
        foundSubjectId = subject._id;
        setSubjectId(foundSubjectId);
        console.log("subjectID", foundSubjectId);
      }
    }

    // Add faculty to subject
    await fetch(`http://localhost:3420/faculties/${id}/subject`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: selectedCode }),
    });
    console.log("selectedCode:", selectedCode);
    console.log("subjects:", subjects);
    console.log("foundSubjectId:", foundSubjectId);

    // Add feedback link
    const res = await fetch(`http://localhost:3420/faculties/${id}/feedback`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: foundSubjectId,
        link: `http://localhost:5173/faculty/${id}/feedback/${selectedCode}`,
      }),
    });

    const data = await res.json();
    if (data.message) {
      setLinkMessage(data.message);
    }

    setButton(true);
    triggerFetch();
  };

  const handleOnChange = async () => {
    const dept = deptRef.current.value;
    const sem = semRef.current.value;

    if (dept === "selectDepartment") {
      setSubjects(null);
      return;
    }

    let url;
    if (dept && sem) {
      url = `http://localhost:3420/faculties/${id}/subject/${dept}/${sem}`;
    } else {
      url = `http://localhost:3420/faculties/${id}/subject/${dept}`;
    }

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      setSubjects(data.subjects);
    } catch (err) {
      console.error("Failed to fetch subjects", err);
    }
  };

  return (
    <>
      {!button ? (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col flex-wrap">
            <label htmlFor="department">Department</label>
            <select
              ref={deptRef}
              id="department"
              onChange={handleOnChange}
              defaultValue={"selectDepartment"}
            >
              <option value="selectDepartment">Select Department</option>
              <option value="CS">Computer Science</option>
              <option value="CE">Civil Engineering</option>
              <option value="EE">Electrical Engineering</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="EC">Electronics and Telecommunication</option>
            </select>

            <label htmlFor="semester">Semester</label>
            <select
              ref={semRef}
              id="semester"
              onChange={handleOnChange}
              defaultValue={"selectSemester"}
            >
              <option value="">Select Semester</option>
              <option value="01">SEM I</option>
              <option value="02">SEM II</option>
              <option value="03">SEM III</option>
              <option value="04">SEM IV</option>
              <option value="05">SEM V</option>
              <option value="06">SEM VI</option>
              <option value="07">SEM VII</option>
              <option value="08">SEM VIII</option>
            </select>

            <select id="subject" ref={subjectRef}>
              {subjects ? (
                subjects.map((subject) => (
                  <option key={subject._id} value={subject.unique_code}>
                    {subject.name}
                  </option>
                ))
              ) : (
                <option value="">Select subjects</option>
              )}
            </select>
          </div>
          <button type="submit">Create Form</button>
        </form>
      ) : (
        <div className="flex flex-col flex-wrap">
          <h3>Please share the below link to get the feedback</h3>
          <div className="break-all text-blue-700 underline">
            <a href={`http://localhost:5173/faculty/${id}/feedback/${code}`}>
              {linkMessage ??
                `http://localhost:5173/faculty/${id}/feedback/${code}`}
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateForm;
