import React from "react";
import UserSummaryDescription from "./UserSummaryDescription";
import NoticeBoard from "./NoticeBoard";
import UserProfile from "./UserProfile";
import Header from "./header";

function Dashboard() {
  return (
    <>
      <div className="flex mt-5 pt-5 md:pt-0 md:mt-1">
        <div className="w-full lg:w-2/3 px-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Header heading="Dashboard" />
            <div className="flex gap-x-4 gap-y-4 flex-wrap">
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
