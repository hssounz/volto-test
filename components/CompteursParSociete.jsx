import React, { useEffect, useState } from 'react'

const CompteursParSociete = ({token, siret}) => {
    const [compteurs, setCompteurs] = useState([]);
    useEffect(() => {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("siret", siret);
  
      fetch("http://testbackend.smart-electricite.com/api/getListeCompteurParSociete/", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
            setCompteurs(data.data);
        })
        .catch((error) => console.error(error));
    }, [token, siret]);
  return (
    <div className="compteurs-list">
    {compteurs?.map((compteur) => (
      <div className="compteur-container" key={compteur.id}>
        <h4>{compteur.numCompteur}</h4>
        <h3>{compteur.typeEnergie}</h3>
        <h5>{compteur.consommation}</h5>
      </div>
    ))}
  </div>
  )
}

export default CompteursParSociete