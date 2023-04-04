import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";
import { toast } from "react-nextjs-toast";

const register = () => {
  const [formValues, setFormValues] = useState({
    token:
      "jhgjsknbhjguskl5554df464dg4fjghf54sd5d6df7468f7hg5f4gvd46cs7s8fth64g6fd788654cs6r7f87fd64s8r67f",
    password: "",
    email: "",
    nom: "",
    prenom: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("token", formValues.token);
    formData.append("nom", formValues.nom);
    formData.append("prenom", formValues.prenom);
    formData.append("email", formValues.email);
    formData.append("password", formValues.password);
    axios
      .post(
        "http://testbackend.smart-electricite.com/api/createCompte/",
        formData
      )
      .then((response) => {
        console.log(response.data.data);
        if (response.data.data === true) {
          toast.notify("Création de compte avec succées", {
            duration: 5,
            type: "success",
            position: "bottom",
            title: "SUCCESS"
          });
          Router.push("/auth/login"); // redirect to login page
        } else {
          
          toast.notify(response.data.data, {
            duration: 5,
            type: "error",
            position: "bottom",
            title: "ERROR"
          });
        }
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
    <>
      <div className="form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="email"> Email : </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleInputChange}
          />
          <label htmlFor="first_name"> First Name : </label>
          <input
            type="text"
            name="nom"
            id="first_name"
            onChange={handleInputChange}
          />
          <label htmlFor="last_name"> Last Name : </label>
          <input
            type="text"
            name="prenom"
            id="first_name"
            onChange={handleInputChange}
          />
          <label htmlFor="password"> Password : </label>
          <input
            type="text"
            name="password"
            id="password"
            onChange={handleInputChange}
          />
          <button> Register </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link className="form-link" href="/auth/login">
            Login here
          </Link>
        </p>
      </div>
      
    </>
  );
};

export default register;
