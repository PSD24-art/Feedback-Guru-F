import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FacultyDashboard = () => {
  const [facultyData, setFacultyData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchAllLinks = async () => {
      try {
        const res = await fetch(
          `http://localhost:3420/faculties/${id}/feedback`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();
        console.log("Fetched from facukty dashbiard:", data.links);
        setSubjects(data.links);
      } catch (err) {
        console.error("Failed to fetch links", err);
      }
    };

    fetchAllLinks();
  }, []);

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

  const handleOnChange = async () => {
    console.log("select option changed");
  };

  return (
    <>
      {facultyData && <h2 className="mt-15">Welcome {facultyData.name}</h2>}
      {facultyData ? (
        <div>
          <div className="w-full h-[calc(100dvh-500px)] mb-4 flex flex-col">
            <div className="flex justify-between w-[100%]">
              Faculty Analytics
              <select
                name=""
                id=""
                className="h-8 me-6"
                onChange={handleOnChange}
              >
                {subjects &&
                  subjects.map((link) => (
                    <option key={link._id} value={link._id}>
                      {link.subject.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="h-full border-amber-600 w-[100%] flex justify-center items-center">
              No Data to show
            </div>
          </div>
          <div className="p-2">
            <p className="mt-2">{facultyData.name}</p>
            <p className="mt-2">{facultyData.department}</p>
            <p className="mt-2">{facultyData.email}</p>
            <div className="flex justify-center mt-3">
              <button onClick={handleOnClick}>Feedback form</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FacultyDashboard;
