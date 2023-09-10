import React from "react";

function UserSummaryDescription({ title, count, iconClass }) {
  return (
    <div className="user-summary-description-component">
      <div className="description-info">
        <p className="title">{title}</p>
        <p className="count">{count}</p>
      </div>
      <div className="details-icon">
        <i className={iconClass}></i>
      </div>
    </div>
  );
}

export default UserSummaryDescription;
