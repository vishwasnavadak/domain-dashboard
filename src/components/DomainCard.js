import React from "react";

const DomainCard = props => {
  return (
    <li className="card z-depth-1 domain-card">
      <div className="domain-title">
        {props.title}
        <br />
        <small>{props.url}</small>
      </div>
      <div className="domain-date" id="renewed">
        <small>Renewed: </small>
        <br />
        {props.dates.renewedDate}
      </div>
      <div className="domain-date" id="expiry">
        <small>Expiry: </small>
        <br />
        {props.dates.expiryDate}
      </div>
    </li>
  );
};

export default DomainCard;
