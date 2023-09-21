import React from "react";

function NoticeBoard() {
  return (
    <div className="bg-gray-100 mt-5 w-full  rounded-lg p-4">
      <div className="n-Header flex justify-between">
        <div className="notice-header">
          <h2 className="text-lg font-bold">Notice Board</h2>
          <p className="text-sm text-gray-500">
            Welcome to the Notice Board. Stay updated!
          </p>
        </div>
        <div className="add-notice bg-blue-500 hover:bg-blue-600 text-white rounded-full w-10 h-10 flex justify-center items-center cursor-pointer">
          <i className="fas fa-plus text-xl"></i>
        </div>
      </div>
      <div className="notice-list mt-4 h-72 overscroll-contain max-h-full overflow-scroll">
        <div className="notice-item bg-white flex mb-2 p-2 rounded">
          <img
            src="notice_image.jpg"
            alt="Notice Image"
            className="w-16 h-16 rounded mr-2"
          />
          <div className="notice-details flex  items-center ">
            <p className="description text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="date text-xs text-gray-500 w-max">Sep 15, 2023</p>
            <div className="social-icons mt-2 flex">
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-tiktok"></i>
              </a>
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
            src="notice_image.jpg"
            alt="Notice Image"
            className="w-16 h-16 rounded mr-2"
          />
          <div className="notice-details flex  items-center ">
            <p className="description text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="date text-xs text-gray-500 w-max">Sep 15, 2023</p>
            <div className="social-icons mt-2 flex">
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-tiktok"></i>
              </a>
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
            src="notice_image.jpg"
            alt="Notice Image"
            className="w-16 h-16 rounded mr-2"
          />
          <div className="notice-details flex  items-center ">
            <p className="description text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="date text-xs text-gray-500 w-max">Sep 15, 2023</p>
            <div className="social-icons mt-2 flex">
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-tiktok"></i>
              </a>
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
            src="notice_image.jpg"
            alt="Notice Image"
            className="w-16 h-16 rounded mr-2"
          />
          <div className="notice-details flex  items-center ">
            <p className="description text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="date text-xs text-gray-500 w-max">Sep 15, 2023</p>
            <div className="social-icons mt-2 flex">
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-tiktok"></i>
              </a>
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
            src="notice_image.jpg"
            alt="Notice Image"
            className="w-16 h-16 rounded mr-2"
          />
          <div className="notice-details flex  items-center ">
            <p className="description text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="date text-xs text-gray-500 w-max">Sep 15, 2023</p>
            <div className="social-icons mt-2 flex">
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-tiktok"></i>
              </a>
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
            src="notice_image.jpg"
            alt="Notice Image"
            className="w-16 h-16 rounded mr-2"
          />
          <div className="notice-details flex  items-center ">
            <p className="description text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="date text-xs text-gray-500 w-max">Sep 15, 2023</p>
            <div className="social-icons mt-2 flex">
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 mr-2">
                <i className="fab fa-tiktok"></i>
              </a>
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
