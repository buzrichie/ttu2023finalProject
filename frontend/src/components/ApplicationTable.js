import React from "react";

function ApplicationTable(props) {
  const { data } = props;
  return (
    <div>
      <table className="w-full border-collapse  border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-center font-medium">
              applicationNumber
            </th>
            <th className="py-2 px-4 text-center font-medium">Date</th>
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
