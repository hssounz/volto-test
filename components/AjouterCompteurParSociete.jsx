import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-nextjs-toast";

const AjouterCompteurParSociete = ({ token }) => {
  const [companies, setCompanies] = useState([]);
  const [selectedSiret, setSelectedSiret] = useState("");

  const [formValues, setFormValues] = useState({
    numCompteur: "",
    consommation: "",
    typeEnergie: "",
  });

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

  const handleSelectChange = (event) => {
    setSelectedSiret(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEnergyType = (event) => {
    setFormValues({ ...formValues, typeEnergie: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData2 = new FormData();
    formData2.append("token", token);
    formData2.append("siret", selectedSiret);
    formData2.append("numCompteur", formValues.numCompteur);
    formData2.append("consommation", formValues.consommation);
    formData2.append("typeEnergie", formValues.typeEnergie);

    axios
      .post(
        "http://testbackend.smart-electricite.com/api/ajouterCompteurToSociete/",
        formData2
      )
      .then((response) => {
        toast.notify(response.data.type, {
          duration: 12,
          type: response.data.error ? "error" : "success",
          position: "bottom",
          title: response.data.error ? "error" : "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="siret-select">Select a siret :</label>
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

        <label htmlFor="numCompteur"> numCompteur : </label>
        <input
          type="text"
          name="numCompteur"
          id="numCompteur"
          onChange={handleInputChange}
        />

        <label htmlFor="consommation"> Consommation : </label>
        <input
          type="float"
          name="consommation"
          id="consommation"
          onChange={handleInputChange}
        />
        <div>
          <label htmlFor="typeEnergie">Type Energie :</label>
          <div>
            <label>
              <input
                type="radio"
                name="typeEnergie"
                value="GAZ"
                checked={formValues.typeEnergie === "GAZ"}
                onChange={handleEnergyType}
              />
              GAZ
            </label>

            <label>
              <input
                type="radio"
                name="typeEnergie"
                value="ELEC"
                checked={formValues.typeEnergie === "ELEC"}
                onChange={handleEnergyType}
              />
              ELEC
            </label>
          </div>
        </div>
        <button type="submit">Ajouter Compteur</button>
      </form>
    </div>
  );
};

export default AjouterCompteurParSociete;
