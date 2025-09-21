const FacultyData = ({ facultyData, handleOnClick }) => {
  return (
    <>
      {facultyData ? (
        <div>
          <div className="w-full h-[calc(100dvh-500px)] mb-4 flex justify-between">
            Faculty Analytics
            <select name="" id="" className="h-8 me-6">
              <option value="">CC</option>
              <option value="">DBMS</option>
            </select>
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

export default FacultyData;
