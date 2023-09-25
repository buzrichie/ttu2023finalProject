import React from "react";
function UserSummaryDescription(props) {
  const { title, count, icon, data } = props;
  return (
    <div className="bg-gray-100 w-48 p-4 flex flex-1 rounded-lg md:mb-4 justify-between items-center transition duration-300 hover:bg-gray-400">
      <div className="flex flex-col w-max">
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        {count && <p className="font-bold text-black">{count}</p>}
        {data && data.title && (
          <p className="text-sm text-gray-500 mb-1">{data.title}</p>
        )}
        {data && data.amount && (
          <p className="font-bold text-black">Amount: GHc{data.amount}</p>
        )}
        {data && data.paid && (
          <p className="font-bold text-black">Paid: GHc{data.paid}</p>
        )}
        {data && data.balance && (
          <p className="font-bold text-black">Balance: GHc{data.balance}</p>
        )}
        {/* {data && data.class && (
          <p className="font-bold text-black">Class: {data.class}</p>
        )} */}
        {data && data.onroll && (
          <p className="font-bold text-black">No. on roll: {data.onroll}</p>
        )}
        {data && data.term && (
          <p className="font-bold text-black">Term: {data.term}</p>
        )}
        {data && data.aggregate && (
          <p className="font-bold text-black">Aggregate: {data.aggregate}</p>
        )}
        {data && data.position && (
          <p className="font-bold text-black">Position: {data.position}</p>
        )}
        {data && data.interest && (
          <p className="font-bold text-black">Interest: {data.interest}</p>
        )}
        {data && data.weakness && (
          <p className="font-bold text-black">Weakness: {data.weakness}</p>
        )}
        {data && data.attitude && (
          <p className="font-bold text-black">Attitude: {data.attitude}</p>
        )}
      </div>
      <div className="bg-white text-gray-700 cursor-pointer w-8 h-8 flex justify-center items-center rounded-full transition duration-300 transform rotate-330 hover:bg-gray-200 hover:text-white">
        <i className="text-blue-700 text-xl">{icon}</i>
      </div>
    </div>
  );
}

export default UserSummaryDescription;
