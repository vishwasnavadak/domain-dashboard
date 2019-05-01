// App Page
import React, { useState, useEffect } from "react";
// import axios from "axios";

import userDomains from "../sites.json";
// import { whoIs } from "../config.json";

import NavBar from "./NavBar";
import AddDomain from "./AddDomain";
import DomainCard from "./DomainCard";

const Dashboard = props => {
  useEffect(() => {
    const { renewSession } = props.auth;
    if (localStorage.getItem("isLoggedIn") === "true") {
      renewSession();
    }
    console.log(props.auth.getAccessToken());
  });
  const [domains, setDomain] = useState(userDomains);
  return (
    <div>
      <NavBar auth={props.auth} />
      <AddDomain />
      <ul className="domain-listing">
        {domains.map(domain => {
          return (
            <DomainCard
              key={domain.url}
              title={domain.title}
              dates={domain.dates}
              url={domain.url}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Dashboard;

// fetchWhoIs(domainName) {
//   return axios
//     .get(`${whoIs.API_URL}?key=${whoIs.API_KEY}&domain=${domainName}`, {
//       crossdomain: true
//     })
//     .then(res => {
//       const { result } = res.data;
//       return {
//         createdDate: result.created,
//         renewedDate: result.changed,
//         expiryDate: result.expires
//       };
//     })
//     .catch(err => console.log("Error Fetching Expiry Date", err));
// }
// checkDomain(domainName) {
//   let className = "domain-block ";
//   let domainDates = {};
//   ping.ping("http://" + domainName, async (err, data) => {
//     if (err) {
//       className += "site-down";
//       domainDates = {
//         createdDate: "NA",
//         renewedDate: "NA",
//         expiryDate: "NA"
//       };
//       //console.log(domainName+" is unaccessible");
//     } else {
//       className += "site-up";
//       //const domainDates = fetchWhoIs()
//       //console.log(domainName+" is up");
//     }
//   });
//   return (
//     <Domain
//       url={domainName}
//       className={className}
//       key={domainName}
//       dates={domainDates}
//     />
//   );
// }
