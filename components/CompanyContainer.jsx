import React from "react";
import CompteursParSociete from "./CompteursParSociete";

const CompanyContainer = ({ company, token }) => {
  
  return (
    <>
      <div className="container">
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <p className="container-title"><span>SIRET : </span>{company.siret} </p>
          <p className="container-title"><span>RAISON SOCIAL : </span>{company.RaisonSocial} </p>
        </div>
        
        <CompteursParSociete token={token} siret={company.siret} />
        
      </div>
      
    </>
  );
};

export default CompanyContainer;
