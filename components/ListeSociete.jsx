import React, { useEffect, useState } from "react";
import CompteursParSociete from "./CompteursParSociete";

const ListeSociete = ({ token, handleLogout }) => {
  const [companies, setCompanies] = useState([]);


  useEffect(() => {
    const formData = new FormData();
    formData.append("token", token);

    fetch("http://testbackend.smart-electricite.com/api/getSocieteByCompte/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.error){
          handleLogout();
        }
        setCompanies(data.data);
      })
      .catch((error) => console.error(error));
  }, [token]);

  return (
    <div className="lists-page">
        <div className="list-title">
            <h3>Sociétés : </h3>
            <h3> : Compteurs</h3>
        </div>
      {companies?.map((company) => (
        <div key={company.id} className="companies-list">
          <div className="company-container" key={company.id}>
            <h4>{company.siret}</h4>
            <h3>{company.RaisonSocial}</h3>
          </div>
          <CompteursParSociete token={token} siret={company.siret} />
        </div>
      ))}
    </div>
  );
};

export default ListeSociete;
