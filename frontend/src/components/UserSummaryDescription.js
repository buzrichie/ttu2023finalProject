import React from "react";
function UserSummaryDescription() {
  return (
    <div className="bg-gray-100 w-44 p-4 flex flex-1 rounded-lg md:mb-4 justify-between items-center transition duration-300 hover:bg-gray-400">
      <div className="flex flex-col">
        <p className="text-sm text-gray-500 mb-1">Title</p>
        <p className="font-bold text-black">count</p>
      </div>
      <div className="bg-white text-gray-700 cursor-pointer w-6 h-6 flex justify-center items-center rounded-full transition duration-300 transform rotate-330 hover:bg-gray-700 hover:text-white">
        <i className="{iconClass}"></i>
      </div>
    </div>
  );
}

export default UserSummaryDescription;
