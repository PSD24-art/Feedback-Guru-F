import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

const CreateForm = ({ subjects }) => {
  const { id } = useParams();
  const subjectRef = useRef();
  const [button, setButton] = useState(false);
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCode = subjectRef.current.value;
    setCode(selectedCode);

    console.log(selectedCode);

    const res = await fetch(`http://localhost:3420/faculties/${id}/subject`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: selectedCode }),
    });

    const data = await res.json();
    console.log(data);

    setButton(true);
  };

  return (
    <>
      {!button ? (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col flex-wrap ">
            <label htmlFor="subject">Subject</label>
            <select id="subject" ref={subjectRef}>
              {subjects?.map((subject) => (
                <option key={subject._id} value={subject.code}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Create Form</button>
        </form>
      ) : (
        <div className="flex flex-col flex-wrap">
          <h3>Please share the below link to get the feedback</h3>
          <div className="break-all flex flex-wrap justify-center items-center text-wrap text-blue-700 underline break-words w-100 h-15">
            <a
              href={`http://localhost:5173/faculty/${id}/feedback/${code}`}
            >{`http://localhost:5173/faculty/${id}/feedback/${code}`}</a>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateForm;
