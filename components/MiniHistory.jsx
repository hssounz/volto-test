import React, { useEffect, useState } from "react";

const MiniHistory = ({ token }) => {
  const [calculs, setCalculs] = useState([]);
  console.log(calculs," calcuuls")
  useEffect(() => {
    const formData = new FormData();
    formData.append("token", token);

    fetch(
      "http://testbackend.smart-electricite.com/api/getHistoriqueDeCalculeParCompte/",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCalculs(data.data);
        console.log(data.data);
      })
      .catch((error) => console.error(error));
  }, [token]);

  return (
    <div className="mini-history">
      {calculs?.map((calc) => (
        <div className="container2" key={calc.id}>
          <div
            style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
          >
            <p className="container-title2">
              <span>Numéro Compteur : </span>
              {calc.numCompteur}
            </p>
            <p className="container-title2">
              <span>Type d'énergie : </span>
              {calc.typeEnergie}
            </p>
            <p className="container-title2">
              <span>Résultat : </span>
              {calc.resultat}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MiniHistory;
