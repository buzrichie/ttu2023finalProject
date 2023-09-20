import React from "react";

function ApplicationTable(props) {
  const { data } = props;
  return (
    <div>
      <h2>Application Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>applicationNumber</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {/* {data.map((application) => (
            <tr key={application._id}>
              <td>{application.applicationNumber}</td>
              <td>{application.date}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationTable;
