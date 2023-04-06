import React, { useEffect, useState } from "react";
import CompteursParSociete from "./CompteursParSociete";
import UserDetails from "./UserDetails";
import MiniHistory from "./MiniHistory";
import CompanyContainer from "./CompanyContainer";

const ListeSociete = ({ token, handleLogout, user }) => {
  const [companies, setCompanies] = useState([]);
  console.log(user, "tesst");
  useEffect(() => {
    const formData = new FormData();
    formData.append("token", token);

    fetch("http://testbackend.smart-electricite.com/api/getSocieteByCompte/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          handleLogout();
        }
        setCompanies(data.data);
      })
      .catch((error) => console.error(error));
  }, [token]);

  return (
    <div className="profile-page">
      <div className="left-col">
        <UserDetails user={user} />
        <MiniHistory token={token} />
      </div>
      <div className="right-col">
      {/* <h4 className="list-title1">Liste des sociétés : </h4> */}
        {companies?.map((company) => (
          <CompanyContainer token={token} key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
};

export default ListeSociete;
