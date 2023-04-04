import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-nextjs-toast";
import moment from "moment";

const EffectuerUnCalcul = ({ token }) => {
  const [companies, setCompanies] = useState([]);
  const [compteurs, setCompteurs] = useState([]);
  const [selectedSiret, setSelectedSiret] = useState("");
  const [selectedCompteur, setSelectedCompteur] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [formatedDateDebut, setFormatedDateDebut] = useState(new Date());
  const [formatedDateFin, setFormatedDateFin] = useState(new Date());
  const [resultatCalcul, setResultatCalcul] = useState(0);

  useEffect(() => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("siret", selectedSiret);

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
  }, [selectedSiret]);

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

  const handleSelectSiret = (event) => {
    setSelectedSiret(event.target.value);
  };

  const handleSelectCompteur = (event) => {
    setSelectedCompteur(event.target.value);
  };

  const handleStartDateChange = (e) => {
    setDateDebut(e.target.value);
    const formattedDate = moment(e.target.value).format("DD/MM/YYYY");
    setFormatedDateDebut(formattedDate);
  };

  const handleEndDateChange = (e) => {
    setDateFin(e.target.value);
    const formattedDate = moment(e.target.value).format("DD/MM/YYYY");
    setFormatedDateFin(formattedDate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("token", token);
    formData.append("siret", selectedSiret);
    formData.append("numCompteur", selectedCompteur);
    formData.append("dateDebut", formatedDateDebut);
    formData.append("dateFin", formatedDateFin);

    axios
      .post(
        "http://testbackend.smart-electricite.com/api/effectuerUnCalcule/",
        formData
      )
      .then((response) => {
        toast.notify(
          (response.data.message || response.data.type) +
            ", Résultat : " +
            (response.data.resultat || "0"),
          {
            duration: 5,
            type: response.data.error ? "error" : "success",
            position: "bottom",
            title: response.data.error ? "error" : "success",
          }
        );
        setResultatCalcul(response.data.resultat || 0);
      })
      .catch((error) => {
        console.log(error);
      });
    // to be implemented
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="siret-select">Select a siret :</label>
        <select
          id="siret-select"
          value={selectedSiret}
          onChange={handleSelectSiret}
        >
          <option value="">Select a siret</option>
          {companies?.map((company) => (
            <option key={company.id}>{company.siret}</option>
          ))}
        </select>

        <label htmlFor="compteur-select">Select compteur :</label>
        <select
          id="compteur-select"
          value={selectedCompteur}
          onChange={handleSelectCompteur}
        >
          <option value="">Selectionner un compteur</option>
          {compteurs?.map((compteur) => (
            <option key={compteur.id}>{compteur.numCompteur}</option>
          ))}
        </select>

        <label htmlFor="start-date">Data Debut :</label>
        <input
          type="date"
          id="start-date"
          name="dateDebut"
          value={dateDebut}
          onChange={handleStartDateChange}
        />

        <label htmlFor="end-date">Date Fin :</label>
        <input
          type="date"
          id="end-date"
          name="dateFin"
          value={dateFin}
          onChange={handleEndDateChange}
        />

        <label htmlFor="resultat-calcul">Résultat de calcul :</label>
        <input
          type="text"
          id="resultat-calcul"
          name="resultat"
          readOnly
          value={resultatCalcul}
        />
        <button type="submit">Ajouter Compteur</button>
      </form>
    </div>
  );
};

export default EffectuerUnCalcul;
