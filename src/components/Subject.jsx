import { useEffect, useState } from "react";
import CreateForm from "./CreateFrom";
import AddSubject from "./AddSubject";
import { useParams, useNavigate } from "react-router-dom";

const Subject = () => {
  const [clickValue, setClickValue] = useState(null);
  const { id } = useParams();
  const [subjectData, setSubjectData] = useState();
  const [subjects, setSubjects] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchSubjects = async () => {
      const res = await fetch(`http://localhost:3420/faculties/${id}/subject`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data.subject);
      setSubjectData(data.subject);
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      const res = await fetch(`http://localhost:3420/faculties/${id}/subject`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data.subject);
      setSubjects(data.subject);
    };
    fetchSubjects();
  }, []);

  return (
    <>
      <div className="mt-15 flex flex-wrap">All Subjects</div>
      <ul>
        {subjectData &&
          subjectData.map((sub) => <li key={sub._id}>{sub.name}</li>)}
      </ul>
      {clickValue === "AddSubject" && clickValue !== null ? (
        <AddSubject />
      ) : null}
      {clickValue === "CreateForm" && clickValue !== null ? (
        <CreateForm subjects={subjects} />
      ) : null}
      <div className="flex p-2 justify-evenly">
        <button onClick={() => setClickValue("AddSubject")}>Add Subject</button>
        <button onClick={() => setClickValue("CreateForm")}>Create form</button>
        <button onClick={() => setClickValue(null)}>Collapse</button>
        <button
          onClick={() => {
            navigate(`/faculty/${id}`);
          }}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default Subject;
