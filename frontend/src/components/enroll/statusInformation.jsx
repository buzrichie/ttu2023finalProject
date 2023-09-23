import Header from "../header";

const StatusInformation = (props) => {
    const newuser = JSON.parse(localStorage.getItem("newuser"));
    const { data } = props;
  
    console.log("statusInformation", data);
    return (
      <>
        <div className="flex mt-5 pt-5 md:pt-0 md:mt-1">
          <div className="w-full px-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Header heading="Status Tracking" />
              {data && (
                <p>
                  Admission Number: <span className="font-bold">{data.admissionNumber}</span>
                </p>
              )}
              {data && data.admission && data.admission.status ? (
                <p>
                  Admission Status: <span className="font-bold">{data.admission.status}</span>
                </p>
              ) : (
                ""
              )}
              {newuser && newuser.student && newuser.student.admissionNumber ? (
                <p>
                  Your registered login ID is: <span className="font-bold">{newuser.student.admissionNumber}</span>
                </p>
              ) : (
                ""
              )}
              {newuser && newuser.password ? (
                <p>
                  Your registered login password is: <span className="font-bold">{newuser.password}</span>
                </p>
              ) : (
                ""
              )}
  
              {data && data.admission && data.admission.studentID ? (
                <p>
                  Your new student ID is: <span className="font-bold">{data.admission.studentID}</span>
                </p>
              ) : (
                ""
              )}
              {data && data.admission && data.admission.studentPassword ? (
                <p>
                  Your password is: <span className="font-bold">{data.admission.studentPassword}</span>
                </p>
              ) : (
                ""
              )}
  
              {/* Remind the user to note down their ID and password */}
              <p className="mt-4 text-red-500">
                Please make sure to note down your ID and password as you will need them for future logins.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };
  
export default StatusInformation;