import { useEffect, useState } from "react";

const AdminDashboard = () => {
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
  return (
    <>
      <h2>Welcome to Admin Dash</h2>
      <ul>
        {facultyList.map((faculty) => (
          <li key={faculty._id}>
            {faculty.name} <br /> {faculty.username} <br />
            {faculty.department}
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

export default AdminDashboard;
