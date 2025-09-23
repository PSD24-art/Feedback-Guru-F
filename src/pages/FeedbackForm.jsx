import { useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import questions from "../data/questions";
const FeedbackForm = () => {
  const [current, setCurrent] = useState(false);
  const [name, setName] = useState();
  const [roll, setRoll] = useState();
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const { id, subject } = useParams();
  const nameRef = useRef();
  const rollRef = useRef();
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch(
          `http://localhost:3420/faculties/${id}/tokens/${subject}`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );

        const data = await res.json();
        console.log("token data", data);

        if (data?.newToken?.token) {
          setToken(data.newToken.token);
        } else {
          console.warn("No token received for this subject");
        }
      } catch (err) {
        console.error("Failed to fetch token", err);
      }
    };
    fetchToken();
  }, [id, subject]);

  const handleChange = (IDX, value) => {
    setAnswers((prev) => ({
      ...prev,
      [IDX]: value,
    }));
  };

  const handleStudentDataSubmit = (e) => {
    e.preventDefault();
    const studentName = nameRef.current.value;
    const studentroll = rollRef.current.value;
    setRoll(studentroll);
    setName(studentName);

    console.log(`name: ${studentName} roll: ${studentroll}`);
    setCurrent(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(answers);
    const res = await fetch(`http://localhost:3420/feedback/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentName: name,
        studentRoll: roll,
        faculty: id,
        subject: subject,
        token: token,
        parameter1: {
          q1: answers[0],
          q2: answers[1],
          q3: answers[2],
        },
        parameter2: {
          q1: answers[3],
          q2: answers[4],
          q3: answers[5],
          q4: answers[6],
        },
        parameter3: {
          q1: answers[7],
          q2: answers[8],
          q3: answers[9],
        },
        parameter4: {
          q1: answers[10],
          q2: answers[11],
          q3: answers[12],
        },
        parameter5: {
          q1: answers[13],
          q2: answers[14],
          q3: answers[15],
        },
        overallEffectiveness: answers[16],
        strengths: answers[17],
        improvements: answers[18],
        additionalComments: answers[19],
      }),
    });
    const data = await res.json();
    console.log(data);
    alert("Feedback submitted successfully!");
  };

  return (
    <div className="mt-15">
      {!current ? (
        <form onSubmit={handleStudentDataSubmit}>
          <div>
            <p>Student Name:</p>
            <input type="text" ref={nameRef} id="" required />
          </div>
          <div>
            <p>Student Roll:</p>
            <input type="text" ref={rollRef} id="" required />
          </div>
          <button type="submit">Next</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 p-4">
          {questions.map((question, IDX) => (
            <div key={IDX} className="space-y-2">
              <p className="font-medium">{question}</p>
              <div className="flex space-x-4">
                {[1, 2, 3, 4, 5].map((num) => (
                  <label key={num} className="flex flex-col items-center">
                    <input
                      required
                      type="radio"
                      name={`question-${IDX}`}
                      value={num}
                      checked={answers[IDX] === num}
                      onChange={() => handleChange(IDX, num)}
                    />
                    <span>
                      {" "}
                      {num === 1
                        ? "Strongly Disagree"
                        : num === 2
                          ? "Disagree"
                          : num === 3
                            ? "Neutral"
                            : num === 4
                              ? "Agree"
                              : "Strongly Agree"}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;
