import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";
import { toast } from "react-nextjs-toast";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post("http://testbackend.smart-electricite.com/api/login/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.login === true) {
          // Save user info in local storage
          // its not a safe way, but its for testing purpose only.
          toast.notify("Login avec succées", {
            duration: 5,
            type: "success",
            position: "bottom",
            title: "SUCCESS",
          });
          const user = {
            first_name: response.data.nom,
            last_name: response.data.prenom,
            email: response.data.email,
          };

          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(user));

          Router.push("/");
        } else {
          toast.notify("Incorrecte", {
            duration: 5,
            type: "error",
            position: "bottom",
            title: "ERROR",
          });
        }
      })
      .catch((error) => {
        // Handle any errors here
        toast.notify(error.message, {
          duration: 5,
          type: "error",
          position: "bottom",
          title: "ERROR",
        });
      });
  };

  return (
    <div className="form">
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email"> Email : </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password"> Password : </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button> Log in </button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link className="form-link" href="/auth/register">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default login;
