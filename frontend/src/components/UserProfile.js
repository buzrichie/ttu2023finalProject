import React from "react";

function UserProfile() {
  return (
    <div className="user-profile-container">
      <div className="user-profile">
        <p>ID: 12345</p>
        <div className="profile-picture">
          <img src="user_avatar.jpg" alt="User Avatar" />
        </div>
        <div className="user-info">
          <p>Name: John Doe</p>
          <p>Class: Grade 10</p>
          <p>Role: Student</p>
          <p>Email: john@example.com</p>
          {/* Add more user info as needed */}
        </div>
        <div className="contact-info">
          <p>Message</p>
          <p>Phone</p>
          <p>Email</p>
        </div>
        <div className="about-section">
          <h3>About</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
            lectus eu efficitur.
          </p>
        </div>
        {/* Add more sections and interactive buttons as needed */}
      </div>
    </div>
  );
}

export default UserProfile;
