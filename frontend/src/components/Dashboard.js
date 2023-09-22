import React from "react";
import UserSummaryDescription from "./UserSummaryDescription";
import NoticeBoard from "./NoticeBoard";
import UserProfile from "./UserProfile";
import Header from "./header";
import { PiStudentDuotone } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { RiParentLine } from "react-icons/ri";
import { HiMiniArrowUpRight } from "react-icons/hi2";

function Dashboard() {
  let localUser = JSON.parse(localStorage.getItem("userData"));

  let userData = null;

  if (localUser) {
    if (localUser.admin) {
      userData = localUser.admin;
    } else if (localUser.student) {
      userData = localUser.student;
    } else if (localUser.teacher) {
      userData = localUser.teacher;
    }
  }
  return (
    <>
      <div className="flex mt-5 pt-5 md:pt-0 md:mt-1">
        <div className="w-full lg:w-2/3 px-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Header heading="Dashboard" />
            <div className="flex gap-x-4 gap-y-4 flex-wrap">
              {PiStudentDuotone && (
                <UserSummaryDescription
                  title="Student"
                  count="20"
                  icon={<PiStudentDuotone />}
                />
              )}
              <UserSummaryDescription
                title="Teacher"
                count="24"
                icon={<LiaChalkboardTeacherSolid />}
              />
              <UserSummaryDescription
                title="Parent"
                count="12"
                icon={<RiParentLine />}
              />
              <UserSummaryDescription
                title="Earning"
                count="$24000"
                icon={<HiMiniArrowUpRight />}
              />
            </div>
            <div></div>
            <div>
              <NoticeBoard />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 px-4 hidden lg:block">
          {localUser && userData ? <UserProfile userData={userData} /> : ""}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
