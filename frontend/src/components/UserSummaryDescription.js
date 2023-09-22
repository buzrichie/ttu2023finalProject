import React from "react";
function UserSummaryDescription(props) {
  const { title, count, icon } = props;
  return (
    <div className="bg-gray-100 w-44 p-4 flex flex-1 rounded-lg md:mb-4 justify-between items-center transition duration-300 hover:bg-gray-400">
      <div className="flex flex-col">
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="font-bold text-black">{count}</p>
      </div>
      <div className="bg-white text-gray-700 cursor-pointer w-8 h-8 flex justify-center items-center rounded-full transition duration-300 transform rotate-330 hover:bg-gray-200 hover:text-white">
        <i className="text-blue-700 text-xl">{icon}</i>
      </div>
    </div>
  );
}

export default UserSummaryDescription;
