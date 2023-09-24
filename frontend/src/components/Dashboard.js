import React from "react";
import UserSummaryDescription from "./UserSummaryDescription";
import NoticeBoard from "./NoticeBoard";
import UserProfile from "./UserProfile";
import Header from "./header";
import { PiStudentDuotone } from "react-icons/pi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { RiParentLine } from "react-icons/ri";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import ScoreTable from "./ScoreTable";

function Dashboard() {
  let localUser = JSON.parse(localStorage.getItem("userData"));

  let userData = null;
  const data = {
    title: "Fees",
    amount: "200",
    paid: "50",
    balance: "150",
  };
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
              {localUser && localUser.admin && (
                <UserSummaryDescription
                  title="Student"
                  count="20"
                  icon={<PiStudentDuotone />}
                />
              )}
              {localUser && localUser.admin && (
                <UserSummaryDescription
                  title="Teacher"
                  count="24"
                  icon={<LiaChalkboardTeacherSolid />}
                />
              )}
              {localUser && localUser.admin && (
                <UserSummaryDescription
                  title="Earning"
                  count="$24000"
                  icon={<HiMiniArrowUpRight />}
                />
              )}
              {localUser && localUser.student && (
                <UserSummaryDescription
                  data={{
                    title: "Class",
                    class: "JHS3",
                    onroll: "23",
                    term: "2",
                  }}
                  icon={<RiParentLine />}
                />
              )}
              {localUser && localUser.student && (
                <UserSummaryDescription
                  data={{ title: "Score", aggregate: "17", position: "6" }}
                  icon={<RiParentLine />}
                />
              )}
              {localUser && localUser.student && (
                <UserSummaryDescription
                  data={{
                    title: "Remarks",
                    interest: "Reading",
                    attitude: "Humble",
                    weakness: "Maths",
                  }}
                  icon={<RiParentLine />}
                />
              )}
              {localUser && localUser.student && (
                <UserSummaryDescription data={data} icon={<RiParentLine />} />
              )}
            </div>
            <div>
              <NoticeBoard />
            </div>
            {localUser && localUser.student && (
              <div className="my-5 py-5">
                <Header heading="End Of Term Result" />
                <ScoreTable
                  data={[
                    { subject: "Math", examsScore: 67, classScore: 12 },
                    { subject: "Science", examsScore: 40, classScore: 25 },
                    { subject: "History", examsScore: 45, classScore: 21 },
                    { subject: "English", examsScore: 34, classScore: 21 },
                  ]}
                />
              </div>
            )}
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
