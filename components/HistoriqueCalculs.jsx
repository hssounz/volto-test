import React, { useEffect, useState } from "react";

const HistoriqueCalculs = ({ token }) => {
  const [calculs, setCalculs] = useState([]);
  const [selectedSiret, setSelectedSiret] = useState("");
  const [companies, setCompanies] = useState([]);

  const fetchAllCalculs = () => {
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
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchAllCalculs();
  }, [token]);

  useEffect(() => {
    const formData = new FormData();
    formData.append("token", token);

    fetch("http://testbackend.smart-electricite.com/api/getSocieteByCompte/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data.data);
      })
      .catch((error) => console.error(error));
  }, [token]);

  useEffect(() => {
    if(selectedSiret.length > 0){
        const formData = new FormData();
        formData.append("token", token);
        formData.append("siret", selectedSiret);
    
        fetch(
          "http://testbackend.smart-electricite.com/api/getHistoriqueDeCalculeParSociete/",
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setCalculs(data.data);
          })
          .catch((error) => console.error(error));
    } else {
      fetchAllCalculs();
    }
  }, [selectedSiret]);

  const handleSelectChange = (event) => {
    setSelectedSiret(event.target.value);
  };

  return (
    <div>
      <label style={{color:"#fff"}} htmlFor="siret-select">Chercher un calcul par siret de societé :</label>
      <select
        id="siret-select"
        value={selectedSiret}
        onChange={handleSelectChange}
      >
        <option value="">Select a siret</option>
        {companies?.map((company) => (
          <option key={company.id}>{company.siret}</option>
        ))}
      </select>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {calculs?.map((calcul) => (
          <div className="calcul-container" key={calcul.id}>
            <div>
              <h2>Num Compteur : {calcul.numCompteur}</h2>
              <h3>Consommation : {calcul.consommation}</h3>
              <h4>Resultat de calcul : {calcul.resultat}</h4>
              <h4>Type d'Energie : {calcul.typeEnergie}</h4>
              <h5>Siret societé : {calcul.societe_siret}</h5>
              <h5>Raison sociale société : {calcul.societe_Raison}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoriqueCalculs;
