import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FacultyData from "../components/FacultyData";
import { useNavigate } from "react-router-dom";

const FacultyDashboard = () => {
  const [facultyData, setFacultyData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchFaculty = async () => {
      const res = await fetch(`http://localhost:3420/faculties/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log("Faculty Data", data.faculty);
      setFacultyData(data.faculty);
    };
    fetchFaculty();
  }, []);

  const handleOnClick = () => {
    navigate(`/faculty/${id}/form`);
  };

  return (
    <>
      {facultyData && <h2 className="mt-15">Welcome {facultyData.name}</h2>}
      <FacultyData facultyData={facultyData} handleOnClick={handleOnClick} />
    </>
  );
};

export default FacultyDashboard;
