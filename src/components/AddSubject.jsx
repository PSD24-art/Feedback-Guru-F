import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

const AddSubject = () => {
  const { id } = useParams();
  const nameRef = useRef();
  const deptRef = useRef();
  const codeRef = useRef();
  const semesterRef = useRef();
  const [message, setMessage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const code = codeRef.current.value;
    const department = deptRef.current.value;
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
          <input
            type="text"
            name=""
            id="subName"
            ref={nameRef}
            placeholder="Subject Name"
          />
          <label htmlFor="department"></label>
          <select ref={deptRef} id="department">
            <option value="CS">Computer Science</option>
            <option value="CE">Civil Engineering</option>
            <option value="EE">Electrical Engineering</option>
            <option value="ME">Mechanical Engineering</option>
            <option value="EC">Electronics and Telecommunication</option>
          </select>
          <br />
          <label htmlFor="code">Code</label>
          <select ref={codeRef} id="code">
            <option value="01">1</option>
            <option value="02">2</option>
            <option value="03">3</option>
            <option value="04">4</option>
            <option value="05">5</option>
            <option value="06">6</option>
            <option value="07">7</option>
            <option value="08">8</option>
            <option value="09">9</option>
            <option value="10">10</option>
          </select>
          <br />
          <select ref={semesterRef} id="semester">
            <option value="01">SEM I</option>
            <option value="02">SEM II</option>
            <option value="03">SEM III</option>
            <option value="04">SEM IV</option>
            <option value="05">SEM V</option>
            <option value="06">SEM VI</option>
            <option value="07">SEM VII</option>
            <option value="08">SEM VIII</option>
          </select>
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
