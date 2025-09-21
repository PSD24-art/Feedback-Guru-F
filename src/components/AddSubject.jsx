import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

const AddSubject = () => {
  const { id } = useParams();
  const nameRef = useRef();
  const codeRef = useRef();
  const departmentRef = useRef();
  const semesterRef = useRef();
  const [message, setMessage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const code = codeRef.current.value;
    const department = departmentRef.current.value;
    const semester = semesterRef.current.value;

    const res = await fetch(`http://localhost:3420/faculties/${id}/subject`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, code, department, semester }),
    });
    const data = await res.json();
    console.log(data);
    setMessage(data.message);
  };

  return (
    <>
      <h2>Add Subject</h2>
      {message === null ? (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Subject name" ref={nameRef} />
          <br />
          <input type="text" placeholder="Subject code" ref={codeRef} />
          <br />
          <input type="text" placeholder="Department" ref={departmentRef} />
          <br />
          <input type="text" placeholder="Semester" ref={semesterRef} />
          <br />
          <button type="submit">Add New Subject</button>
        </form>
      ) : (
        <h3>{message}</h3>
      )}
    </>
  );
};
export default AddSubject;
