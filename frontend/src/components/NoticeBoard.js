import React from "react";

function NoticeBoard() {
  return (
    <div className="notice-board">
      <div className="n-Header">
        <div className="notice-header">
          <h2>Notice Board</h2>
          <p>Welcome to the Notice Board. Stay updated!</p>
        </div>
        <div className="add-notice">
          <i className="fas fa-plus"></i>
        </div>
      </div>
      <div className="notice-list">
        <div className="notice-item">
          <img src="notice_image.jpg" alt="Notice Image" />
          <div className="notice-details">
            <p className="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="date">Sep 15, 2023</p>
            <div className="social-icons">
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
            <div className="video-views">
              <i className="fas fa-video"></i>
              <p className="view-count">1k</p>
            </div>
            <p className="read-more">...</p>
          </div>
        </div>
        {/* Repeat the .notice-item for more notices */}
      </div>
    </div>
  );
}

export default NoticeBoard;
