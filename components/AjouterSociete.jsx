import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-nextjs-toast";

const AjouterSociete = ({ token }) => {
  const [formValues, setFormValues] = useState({
    token,
    siret: "",
    RaisonSocial: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("token", formValues.token);
    formData.append("siret", formValues.siret);
    formData.append("RaisonSocial", formValues.RaisonSocial);

    axios
      .post(
        "http://testbackend.smart-electricite.com/api/ajouterSociete/",
        formData
      )
      .then((response) => {
        console.log(response.data.type);
        toast.notify(response.data.type, {
          duration: 5,
          type: response.data.error ? "error" : "success",
          position: "bottom",
          title: response.data.error ? "error" : "success",
        });

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="form">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="siret"> Siret : </label>
        <input
          type="text"
          name="siret"
          id="siret"
          onChange={handleInputChange}
        />
        <label htmlFor="rs"> Raison Social : </label>
        <input
          type="text"
          name="RaisonSocial"
          id="rs"
          onChange={handleInputChange}
        />
        <button> Ajouter </button>
      </form>
    </div>
  );
};

export default AjouterSociete;
