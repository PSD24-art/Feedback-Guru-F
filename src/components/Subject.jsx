import { useEffect, useState } from "react";
import CreateForm from "./CreateFrom";
import AddSubject from "./AddSubject";
import { useParams, useNavigate } from "react-router-dom";

const Subject = () => {
  const navigate = useNavigate();
  const [clickValue, setClickValue] = useState(null);
  const { id } = useParams();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [feedbackLinks, setFeedbackLinks] = useState([]);

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
        console.log("Fetched:", data.links);
        setFeedbackLinks(data.links);
      } catch (err) {
        console.error("Failed to fetch links", err);
      }
    };

    fetchAllLinks();
  }, [shouldFetch]);

  const handleDelete = async (link) => {
    const res = await fetch(
      `http://localhost:3420/faculties/${id}/feedback/${link}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    console.log(data);
    setShouldFetch((prev) => !prev);
  };

  return (
    <>
      <div className="mt-15 flex  flex-wrap">All Subjects</div>
      {feedbackLinks &&
        feedbackLinks.map((linkObj) => (
          <div key={linkObj._id}>
            <p>{linkObj.subject?.name}</p>
            <p>{linkObj.link}</p>
            <button onClick={() => handleDelete(linkObj._id)}>Delete</button>
          </div>
        ))}

      {clickValue === "AddSubject" && clickValue !== null ? (
        <AddSubject />
      ) : null}
      {clickValue === "CreateForm" && clickValue !== null ? (
        <CreateForm triggerFetch={() => setShouldFetch((prev) => !prev)} />
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
