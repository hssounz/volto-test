import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AjouterSociete from "../components/AjouterSociete";
import AjouterCompteurParSociete from "../components/AjouterCompteurParSociete";
import ListeSociete from "../components/ListeSociete";
import RechercherSociete from "../components/RechercherSociete";
import EffectuerUnCalcul from "../components/EffectuerUnCalcul";
import HistoriqueCalculs from "../components/HistoriqueCalculs";

export default function Home() {
  const [activePage, setActivePage] = useState("ListeSociete");
  const [userInfo, setUserInfo] = useState({});
  const router = useRouter();

  const handlePageChange = (pageName) => {
    setActivePage(pageName);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth/login");
  };
  let token, user;
  if (typeof window !== 'undefined') {
    // Access localStorage here
    token = localStorage.getItem("token");
    user = localStorage.getItem("user");
  }



  useEffect(() => {

    if (!token) {
      handleLogout();
    }
    setUserInfo(JSON.parse(user));
  }, []);

  return (
    <>
      <nav>
        <div className="nav-title">
          Welcome, {userInfo?.first_name} {userInfo?.last_name}!
        </div>
        <ul className="nav-list">
          <li>
            <Link
              href="/"
              className={
                activePage === "ListeSociete" ? "active nav-link" : "nav-link"
              }
              onClick={() => handlePageChange("ListeSociete")}
            >
              Liste des Societes
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={
                activePage === "RechercherSociete" ? "active nav-link" : "nav-link"
              }
              onClick={() => handlePageChange("RechercherSociete")}
            >
              Rechercher Societe
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={
                activePage === "AjouterSociete" ? "active nav-link" : "nav-link"
              }
              onClick={() => handlePageChange("AjouterSociete")}
            >
              Ajouter Societe
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={
                activePage === "AjouterCompteurParSociete"
                  ? "active nav-link"
                  : "nav-link"
              }
              onClick={() => handlePageChange("AjouterCompteurParSociete")}
            >
              Ajouter Compteur
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={
                activePage === "EffectuerUnCalcul"
                  ? "active nav-link"
                  : "nav-link"
              }
              onClick={() => handlePageChange("EffectuerUnCalcul")}
            >
              Effectuer Un Calcul
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={
                activePage === "HistoriqueCalculs"
                  ? "active nav-link"
                  : "nav-link"
              }
              onClick={() => handlePageChange("HistoriqueCalculs")}
            >
              Historiques
            </Link>
          </li>
          <li>
            <Link href="/" className="nav-link" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
      {activePage === "ListeSociete" && <ListeSociete token={token} handleLogout={handleLogout} />}
      {activePage === "RechercherSociete" && <RechercherSociete token={token} />}
      {activePage === "AjouterSociete" && <AjouterSociete token={token} />}
      {activePage === "EffectuerUnCalcul" && <EffectuerUnCalcul token={token} />}
      {activePage === "HistoriqueCalculs" && <HistoriqueCalculs token={token} />}
      {activePage === "AjouterCompteurParSociete" && (
        <AjouterCompteurParSociete token={token} />
      )}
    </>
  );
}
