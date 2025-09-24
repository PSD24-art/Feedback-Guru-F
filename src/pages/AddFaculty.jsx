import { useRef } from "react";

const AddFaculty = () => {
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const department = deptRef.current.value;
    confirm(`You are going to add ${name} in database, click ok to confirm`);
    const res = await fetch("http://localhost:3420/admin/faculties/new", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, department }),
    });

    const data = await res.json();
    console.log(data);
  };
  const nameRef = useRef();
  const emailRef = useRef();
  const deptRef = useRef();
  return (
    <div className="mt-15">
      <form onSubmit={handleOnSubmit}>
        <input type="text" ref={nameRef} placeholder="Faculty Full Name here" />
        <hr />
        <br />
        <input type="email" ref={emailRef} placeholder="Faculty Email here" />
        <hr />
        <br />
        <select ref={deptRef} id="department">
          <option value="CS">Computer Science</option>
          <option value="CE">Civil Engineering</option>
          <option value="EE">Electrical Engineering</option>
          <option value="ME">Mechanical Engineering</option>
          <option value="EC">Electronics and Telecommunication</option>
        </select>
        <hr />
        <br />
        <button type="submit">Add Faculty</button>
      </form>
    </div>
  );
};
export default AddFaculty;
