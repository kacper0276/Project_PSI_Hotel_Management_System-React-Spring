import React, { useState } from "react";
import ManageUsers from "../../../Pages/AdminPanel/ManageUsers/ManageUsers";
import EditUserData from "../../../Pages/AdminPanel/EditUserData/EditUserData";
import AddNewRoom from "../../../Pages/AdminPanel/AddNewRoom/AddNewRoom";
import EditRooms from "../../../Pages/AdminPanel/EditRooms/EditRooms";
import ManagePayments from "../../../Pages/AdminPanel/ManagePayments/ManagePayments";
import "./AdminMenuNavigation.css";
import { Link } from "react-router-dom";

export default function AdminMenuNavigation(props) {
  const [activeBtn, setActiveBtn] = useState(null);
  const panels = [
    <ManageUsers />,
    <EditUserData />,
    <AddNewRoom />,
    <EditRooms />,
    <ManagePayments />,
  ];

  const changeActive = (id) => {
    setActiveBtn(id === activeBtn ? null : id);
    props.panel(panels[id]);
  };

  const icons = [
    "https://img.icons8.com/?size=50&id=99268&format=png&color=000000",
    "https://img.icons8.com/?size=50&id=52883&format=png&color=000000",
    "https://img.icons8.com/?size=50&id=8021&format=png&color=000000",
    "https://img.icons8.com/?size=50&id=37839&format=png&color=000000",
    "https://img.icons8.com/?size=50&id=24836&format=png&color=000000",
  ];

  return (
    <div className="container-fluid whole-container">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-5 d-none d-sm-inline text-dark">Menu</span>
            </Link>
            <nav
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              {[
                "Ustawienia użytkowników",
                "Ustawienia danych administratora",
                "Dodaj nową ofertę pokoju",
                "Edytuj oferty pokoi",
                "Zarządzaj płatnościami",
              ].map((label, index) => (
                <button
                  key={index}
                  className={` align-middle px-0 d-flex justify-content-between ${
                    activeBtn === index
                      ? "active btn btn-dark w-100"
                      : "btn btn-light w-100"
                  }`}
                  onClick={() => changeActive(index)}
                  style={{ textAlign: "left" }}
                >
                  <img
                    src={icons[index]}
                    alt={`Icon ${index + 1}`}
                    className="icon-img"
                  />
                  <span style={{ flexGrow: 1 }}>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
        <div className="col py-3">
          <div className="text-center">
            {activeBtn === null ? (
              <h3>Panel administratora</h3>
            ) : (
              panels[activeBtn]
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
