import React from "react";
import UserSummaryDescription from "./UserSummaryDescription";
import NoticeBoard from "./NoticeBoard";
import UserProfile from "./UserProfile";

function Dashboard() {
  return (
    <>
      <div className="flex">
        <div className="w-full lg:w-2/3 px-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
            <div className="flex">
              <UserSummaryDescription />
              <UserSummaryDescription />
              <UserSummaryDescription />
              <UserSummaryDescription />
            </div>
            <div></div>
            <div>
              <NoticeBoard />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 px-4 hidden lg:block">
          <UserProfile />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
