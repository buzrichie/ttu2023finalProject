import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Header from "./header";

function NoticeBoard() {
  return (
    <div className="bg-gray-100 mt-5 w-full  rounded-lg p-4">
      <div className="n-Header flex justify-between">
        <div className="notice-header">
          {/* <h2 className="text-lg font-bold">Notice Board</h2> */}
          <Header heading="Notice Board" />
          <p className="text-md text-gray-500">
            Welcome to the Notice Board. Stay updated!
          </p>
        </div>
        {/* <div className="add-notice bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10 flex justify-center items-center cursor-pointer">
          <i className="fas fa-plus text-xl">
          </i>
        </div> */}
        <AiOutlinePlus className="w-7 h-7 text-blue-500 hover:text-blue-300" />
      </div>
      <div className="notice-list mt-4 h-72 overscroll-contain max-h-full overflow-scroll">
        <div className="notice-item bg-white flex mb-2 p-2 rounded">
          <img
            src="images/Asset/books.jpg"
            alt="Notice Image"
            className="w-20 h-16 rounded mr-2"
          />
          <div className="notice-details w-full flex justify-between items-center ">
            <p className="description text-sm">
              Explore the world through books! Visit our school library for a
              treasure trove of knowledge and adventure. Happy reading!
            </p>
            <p className="date text-xs text-gray-500 w-max">Sep 24, 2023</p>
            <div className="flex -space-x-1 overflow-hidden">
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="video-views flex mt-2 flex items-center">
              <i className="fas fa-video text-green-500 mr-1"></i>
              <p className="view-count text-xs">1k</p>
            </div>
            <p className="read-more mt-2 text-xs cursor-pointer hover:underline">
              ...
            </p>
          </div>
        </div>
        <div className="notice-item bg-white flex mb-2 p-2 rounded">
          <img
            src="images/Asset/kidDay.jpg"
            alt="Notice Image"
            className="w-20 h-16 rounded mr-2"
          />
          <div className="notice-details flex w-full justify-between w-full justify-between items-center ">
            <p className="description text-sm">
              Happy Children's Day! Let's celebrate the joy, curiosity, and
              creativity of our wonderful students. You make our school shine!
            </p>
            <p className="date text-xs text-gray-500 w-max">Sep 18, 2023</p>
            <div className="flex -space-x-1 overflow-hidden">
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="video-views flex mt-2 flex items-center">
              <i className="fas fa-video text-green-500 mr-1"></i>
              <p className="view-count text-xs">1k</p>
            </div>
            <p className="read-more mt-2 text-xs cursor-pointer hover:underline">
              ...
            </p>
          </div>
        </div>
        <div className="notice-item bg-white flex mb-2 p-2 rounded">
          <img
            src="images/Asset/food.jpg"
            alt="Notice Image"
            className="w-20 h-16 rounded mr-2"
          />

          <div className="notice-details flex w-full justify-between  items-center ">
            <p className="description text-sm">
              Delicious and nutritious meals await you at our school canteen.
              Enjoy a healthy lunch and fuel your day!
            </p>
            <p className="date text-xs text-gray-500 w-max">Sep 15, 2023</p>
            <div className="flex -space-x-1 overflow-hidden">
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="video-views flex mt-2 flex items-center">
              <i className="fas fa-video text-green-500 mr-1"></i>
              <p className="view-count text-xs">1k</p>
            </div>
            <p className="read-more mt-2 text-xs cursor-pointer hover:underline">
              ...
            </p>
          </div>
        </div>
        <div className="notice-item bg-white flex mb-2 p-2 rounded">
          <img
            src="images/Asset/schoolbus.jpg"
            alt="Notice Image"
            className="w-20 h-16 rounded mr-2"
          />

          <div className="notice-details flex w-full justify-between  items-center ">
            <p className="description text-sm">
              Ride to success with our school bus service. Safety and
              convenience for our students on the go!
            </p>
            <p className="date text-xs text-gray-500 w-max">Sep 15, 2023</p>
            <div className="flex -space-x-1 overflow-hidden">
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="video-views flex mt-2 flex items-center">
              <i className="fas fa-video text-green-500 mr-1"></i>
              <p className="view-count text-xs">1k</p>
            </div>
            <p className="read-more mt-2 text-xs cursor-pointer hover:underline">
              ...
            </p>
          </div>
        </div>
        <div className="notice-item bg-white flex mb-2 p-2 rounded">
          <img
            src="images/Asset/trip.jpg"
            alt="Notice Image"
            className="w-20 h-16 rounded mr-2"
          />
          <div className="notice-details flex w-full justify-between  items-center ">
            <p className="description text-sm">
              Exciting adventures await! Join us on an upcoming school trip.
              Stay tuned for details and get ready to explore.
            </p>
            <p className="date text-xs text-gray-500 w-max">Sep 10, 2023</p>
            <div className="flex -space-x-1 overflow-hidden">
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="video-views flex mt-2 flex items-center">
              <i className="fas fa-video text-green-500 mr-1"></i>
              <p className="view-count text-xs">1k</p>
            </div>
            <p className="read-more mt-2 text-xs cursor-pointer hover:underline">
              ...
            </p>
          </div>
        </div>
        <div className="notice-item bg-white flex mb-2 p-2 rounded">
          <img
            src="images/Asset/books1.jpg"
            alt="Notice Image"
            className="w-20 h-16 rounded mr-2"
          />
          <div className="notice-details flex w-full justify-between  items-center ">
            <p className="description text-sm">
              Dear Teachers, Parents, and Students, remember that reading is the
              key to knowledge. Encourage your child to read daily. Let's
              inspire a love for books together.
            </p>
            <p className="date text-xs text-gray-500 w-max">Sep 08, 2023</p>
            <div className="flex -space-x-1 overflow-hidden">
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="video-views flex mt-2 flex items-center">
              <i className="fas fa-video text-green-500 mr-1"></i>
              <p className="view-count text-xs">1k</p>
            </div>
            <p className="read-more mt-2 text-xs cursor-pointer hover:underline">
              ...
            </p>
          </div>
        </div>

        {/* Repeat the .notice-item for more notices */}
      </div>
    </div>
  );
}

export default NoticeBoard;
