import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [facultyList, setFacultyList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3420/admin", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setFacultyList(data.allFaculties);
      console.log(data.allFaculties);
    };
    fetchData();
  }, []);

  const handleOnClick = (id) => {
    console.log("Clicked Faculty");
    navigate(`/admin/faculty/${id}`);
  };

  const handleAddFacultyClick = async () => {
    console.log("Clicked Add faculty");
    navigate("/admin/faculty/new");
  };
  return (
    <>
      <div className="mt-15">
        <h2>Welcome to Admin Dash</h2>
        {/*Add filter for department wise faculties later*/}
        <div className="flex flex-col">
          <div>
            <label htmlFor="dept">Department: </label>
            <select name="" id="dept">
              <option value="">Select Dpartment</option>
              <option value="CS">Computer Science</option>
            </select>
          </div>
          <br />
          <ul>
            {facultyList.map((faculty) => (
              <li key={faculty._id} onClick={() => handleOnClick(faculty._id)}>
                <div>
                  {faculty.name} <br /> {faculty.username} <br />
                  {faculty.department}
                </div>
                <br />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center">
          <button onClick={handleAddFacultyClick}>Add Faculty</button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
