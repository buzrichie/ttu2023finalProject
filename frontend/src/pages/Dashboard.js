function Dashboard() {
  return (
    <div className="container">
      <div className="sidebar">
        <div className="logo">
          <img src="school_logo.png" alt="School Logo" />
        </div>
        <ul className="nav-tabs">
          <li>
            <a href="#">
              <i className="fas fa-home"></i> Dashboard
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-user"></i> Userbase
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-chalkboard"></i> Courses
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fas fa-calendar"></i> G-Question
            </a>
          </li>
          {/* Add more navigation items as needed */}
        </ul>
        {/* ... (previous HTML code) */}
        <div className="actions">
          <ul className="action-list">
            <li>
              <a href="#">
                <i className="fas fa-file-alt"></i> Reports
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-question-circle"></i> Help
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fas fa-cog"></i> Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="user-info">
          <div className="notification">
            <i className="fas fa-bell"></i>
          </div>
          <div className="avatar">
            <img src="user_avatar.png" alt="User Avatar" />
          </div>
          <div className="user-name">John Doe</div>
          {/* Replace with the user's name */}
        </div>
      </div>
      <div className="main-content">{/* Add your main content here */}</div>
    </div>
  );
}

export default Dashboard;
