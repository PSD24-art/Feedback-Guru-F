import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PasswordReset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const oldPassRef = useRef();
  const newPassRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const oldPassword = oldPassRef.current.value;
    const newPassword = newPassRef.current.value;
    try {
      const res = await fetch(`http://localhost:3420/change-password/${id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json();
      console.log(data);
      alert("Password changed successfully");
      if (data.role === "admin") {
        navigate(`/admin/${id}`);
      } else if (data.role === "faculty") {
        navigate(`/faculty/${id}`);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <div className="mt-15">
        <form onSubmit={handleSubmit}>
          <hr />
          <input type="password" placeholder="Old password" ref={oldPassRef} />
          <hr />
          <br />
          <input type="password" placeholder="New password" ref={newPassRef} />
          <hr />
          <button type="submit">Reset</button>
        </form>
      </div>
    </>
  );
};
export default PasswordReset;
