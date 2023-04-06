import React, { useEffect, useState } from "react";

const CompteursParSociete = ({ token, siret }) => {
  const [compteurs, setCompteurs] = useState([]);
  useEffect(() => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("siret", siret);

    fetch(
      "http://testbackend.smart-electricite.com/api/getListeCompteurParSociete/",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCompteurs(data.data);
      })
      .catch((error) => console.error(error));
  }, [token, siret]);
  return (
    <div className="">
      {compteurs.length > 0 ? <hr color="#FFCB35" /> : <p style={{textAlign: "center"}}>Pas de compteurs..</p>}
      {compteurs?.map((compteur) => (
        <div className="container" key={compteur.id}>
          <div
            style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
          >
            <p className="container-title">
              <span>Numéro compteur : </span>
              {compteur.numCompteur}
            </p>
            <p className="container-title">
              <span>Type d'énergie : </span>
              {compteur.typeEnergie}
            </p>
            <p className="container-title">
              <span>Consammation : </span>
              {compteur.consommation}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompteursParSociete;
