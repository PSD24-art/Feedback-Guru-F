import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FacultyDashFromAdmin = () => {
  const { id, subject } = useParams();
  const [count, setCount] = useState();
  console.log(id);
  const [facultyData, setFacultyData] = useState();
  const [subjects, setSubjects] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFaculty = async () => {
      const res = await fetch(`http://localhost:3420/admin/faculties/${id}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log("Individual Faculty: ", data);
      setFacultyData(data.faculty);
    };
    fetchFaculty();
  }, []);

  useEffect(() => {
    const fetchAllLinks = async () => {
      try {
        const res = await fetch(
          `http://localhost:3420/admin/faculties/${id}/links`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await res.json();
        console.log("Fetched from facultyy dashboard:", data.links);
        setSubjects(data.links);
      } catch (err) {
        console.error("Failed to fetch links", err);
      }
    };
    fetchAllLinks();
  }, []);

  const handleOnChange = async () => {
    console.log("select option changed");
    const subjectId = document.getElementById("linkSubject").value;
    console.log(subjectId);

    try {
      const res = await fetch(
        `http://localhost:3420/admin/faculties/${id}/feedback/${subjectId}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      console.log("Feedbacks: ", data);
      setCount(data.FeedbackLength);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleDeleteFaculty = async () => {
    confirm("Really want to delete the faculty");
    const res = await fetch(`http://localhost:3420/admin/faculties/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    alert(data.message);
    navigate("/admin");
  };
  return (
    <>
      {facultyData && <h2 className="mt-15">{facultyData.name}</h2>}
      {facultyData ? (
        <div className="">
          <div className=" relative w-full h-[calc(100dvh-500px)] mb-4 flex flex-col">
            <div className="flex justify-between w-[100%]">
              Faculty Analytics
              <select
                name=""
                id="linkSubject"
                className="h-8 me-6"
                onChange={handleOnChange}
              >
                <option value="Select Subject">Select Subject</option>
                {subjects &&
                  subjects.map((link) => (
                    <option key={link._id} value={link.subject._id}>
                      {link.subject.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="absolute w-17 h-6 top-10">
              <p>
                Count: <span>{count}</span>
              </p>
            </div>
            <div className="h-full border-amber-600 w-[100%] flex justify-center items-center">
              No Data to show
            </div>
          </div>
          <div className="p-2">
            <p className="mt-2">{facultyData.name}</p>
            <p className="mt-2">{facultyData.department}</p>
            <p className="mt-2">{facultyData.email}</p>
          </div>
          <div>
            <button onClick={handleDeleteFaculty}>Delete Faculty</button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FacultyDashFromAdmin;
