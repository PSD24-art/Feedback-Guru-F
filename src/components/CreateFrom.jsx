import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const CreateForm = ({ triggerFetch }) => {
  const { id } = useParams();
  const subjectRef = useRef();
  const [button, setButton] = useState(false);
  const [code, setCode] = useState("");
  const [subjects, setSubjects] = useState();
  const deptRef = useRef();
  const semRef = useRef();
  const [linkMessage, setLinkMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCode = subjectRef.current.value;
    setCode(selectedCode);
    let subjectId;
    if (subjects) {
      const subject = subjects.find((s) => s.code === Number(selectedCode));
      if (subject) {
        subjectId = subject._id;
      }
    }

    console.log(selectedCode);
    const addFacultyToSubject = async () => {
      const res = await fetch(`http://localhost:3420/faculties/${id}/subject`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: selectedCode }),
      });

      const data = await res.json();
      console.log(data);
    };
    addFacultyToSubject();

    const addLink = async () => {
      const res = await fetch(
        `http://localhost:3420/faculties/${id}/feedback`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: subjectId,
            link: `http://localhost:5173/faculty/${id}/feedback/${selectedCode}`,
          }),
        }
      );
      const data = await res.json();
      if (data.message) {
        console.log("link data: ", data.message);
        setLinkMessage(data.message);
      }

      setButton(true);

      triggerFetch();
    };
    addLink();
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
      // If both department & semester are selected
      url = `http://localhost:3420/faculties/${id}/subject/${dept}/${sem}`;
    } else {
      // Only department selected
      url = `http://localhost:3420/faculties/${id}/subject/${dept}`;
    }

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data.subjects);
      setSubjects(data.subjects);
    } catch (err) {
      console.error("Failed to fetch subjects", err);
    }
  };

  return (
    <>
      {!button ? (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col flex-wrap ">
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
                  <option key={subject._id} value={subject.code}>
                    {subject.name}
                  </option>
                ))
              ) : (
                <option value="No data">Select subjects</option>
              )}
            </select>
          </div>
          <button type="submit">Create Form</button>
        </form>
      ) : (
        <div className="flex flex-col flex-wrap">
          <h3>Please share the below link to get the feedback</h3>
          <div className="break-all flex flex-wrap justify-center items-center text-wrap text-blue-700 underline break-words w-100 h-15">
            <a href={`http://localhost:5173/faculty/${id}/feedback/${code}`}>
              {linkMessage === null ? (
                `http://localhost:5173/faculty/${id}/feedback/${code}`
              ) : (
                <p>{linkMessage}</p>
              )}
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateForm;
