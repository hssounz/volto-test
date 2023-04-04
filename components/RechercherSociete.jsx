import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

const RechercherSociete = ({ token }) => {
  const [siret, setSiret] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // create formData with siret value
    const formData = new FormData();
    formData.append("token", token);
    formData.append("siret", siret);

    const response = await fetch(
      "http://testbackend.smart-electricite.com/api/getSocieteBySiret/",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    if (data?.trouve) {
      setSearchResults(data.data);
    } else {
        setSearchResults(null);
    }
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Type Siret..."
          value={siret}
          onChange={(event) => setSiret(event.target.value)}
        />
        <BiSearchAlt
          color="#FFCB35"
          size={36}
          style={{ cursor: "pointer" }}
          onClick={handleSubmit}
        />
      </div>
      <div className="search-result">
        {searchResults ? (
          <>
            <div className="company-container" key={searchResults.id}>
              <h4>{searchResults.siret}</h4>
              <h3>{searchResults.RaisonSocial}</h3>
            </div>
          </>
        ) : (
          <h3>PAS DE RESULTAT.</h3>
        )}
      </div>
    </div>
  );
};

export default RechercherSociete;
