import React, { useState } from "react";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RoomBrowser.css";
import axios from "axios";
import { API_URL } from "../../App";

export default function RoomBrowser() {
  useWebsiteTitle("Przeglądarka Pokoji");

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [roomType, setRoomType] = useState("");

  const decreaseValue = (type) => {
    switch (type) {
      case "adults":
        setAdults(adults > 0 ? adults - 1 : 0);
        break;
      case "children":
        setChildren(children > 0 ? children - 1 : 0);
        break;
      default:
        break;
    }
  };

  const increaseValue = (type) => {
    switch (type) {
      case "adults":
        setAdults(adults + 1);
        break;
      case "children":
        setChildren(children + 1);
        break;
      default:
        break;
    }
  };

  const searchRoom = async (e) => {
    e.preventDefault();

    await axios
      .get(`${API_URL}/pokoje/szukaj-ofert`, {
        params: {
          dateFrom: dateFrom,
          dateTo: dateTo,
          roomType: roomType,
          persons: adults + children,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <section className="room-availability spad">
      <div className="container">
        <div className="room-check">
          <div className="row">
            <div className="col-lg-6">
              <div className="room-item">
                <Carousel className="carousel-align">
                  <Carousel.Item className="carousel-item-align">
                    <img
                      className="d-block w-100"
                      src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Room 1"
                    />
                  </Carousel.Item>
                  <Carousel.Item className="carousel-item-align">
                    <img
                      className="d-block w-100"
                      src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Room 2"
                    />
                  </Carousel.Item>
                  <Carousel.Item className="carousel-item-align">
                    <img
                      className="d-block w-100"
                      src="https://images.unsplash.com/photo-1664227430687-9299c593e3da?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Room 3"
                    />
                  </Carousel.Item>
                </Carousel>
                <div className="room-text mt-3">
                  <div className="room-title">
                    <h2>Pokój dziecięcy</h2>
                    <div className="room-price">
                      <span>już od</span>
                      <h2 className="basic-text">250zł/doba</h2>
                    </div>
                  </div>
                  <div className="room-features d-flex justify-content-around align-items-center">
                    <div className="room-info text-center">
                      <span>Smart TV</span>
                      <img
                        src="https://img.icons8.com/?size=100&id=86639&format=png&color=000000"
                        alt="Smart TV"
                        className="icon"
                        width="40"
                        height="40"
                      />
                    </div>
                    <div className="room-info text-center">
                      <span>Wi-fi</span>
                      <img
                        src="https://img.icons8.com/?size=100&id=172&format=png&color=000000"
                        alt="High Wi-fi"
                        className="icon"
                        width="40"
                        height="40"
                      />
                    </div>
                    <div className="room-info text-center">
                      <span>Parking</span>
                      <img
                        src="https://img.icons8.com/?size=100&id=10738&format=png&color=000000"
                        alt="Parking"
                        className="icon"
                        width="40"
                        height="40"
                      />
                    </div>
                    <div className="room-info text-center">
                      <span>Basen</span>
                      <img
                        src="https://img.icons8.com/?size=100&id=37195&format=png&color=000000"
                        alt="Pool"
                        className="icon"
                        width="40"
                        height="40"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="check-form">
                <h2>Dopasuj ofertę do potrzeb</h2>
                <form action="#">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="fromDate" className="form-label">
                        Od
                      </label>
                      <input
                        type="text"
                        className="form-control datepicker-1"
                        id="fromDate"
                        placeholder="dd / mm / yyyy"
                        onChange={(e) => setDateFrom(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="toDate" className="form-label">
                        Do
                      </label>
                      <input
                        type="text"
                        className="form-control datepicker-2"
                        id="toDate"
                        placeholder="dd / mm / yyyy"
                        onChange={(e) => setDateTo(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label htmlFor="adults" className="form-label">
                        Dorośli
                      </label>
                      <div className="input-group">
                        <button
                          className="btn btn-outline-secondary btn-change"
                          type="button"
                          onClick={() => decreaseValue("adults")}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="form-control"
                          value={adults}
                          readOnly
                        />
                        <button
                          className="btn btn-outline-secondary btn-change"
                          type="button"
                          onClick={() => increaseValue("adults")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="children" className="form-label">
                        Dzieci
                      </label>
                      <div className="input-group">
                        <button
                          className="btn btn-outline-secondary btn-change"
                          type="button"
                          onClick={() => decreaseValue("children")}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="form-control"
                          value={children}
                          readOnly
                        />
                        <button
                          className="btn btn-outline-secondary btn-change"
                          type="button"
                          onClick={() => increaseValue("children")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="roomType" className="form-label">
                      Room
                    </label>
                    <select
                      className="form-select"
                      id="roomType"
                      onChange={(e) => setRoomType(e.target.value)}
                    >
                      <option value={"Apartament"}>Apartament</option>
                      <option value="Podwójny">Podwójny pokój</option>
                      <option value="Pojedynczy">Pojedynczy pokój</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-dark submit-btn"
                    onClick={searchRoom}
                  >
                    Sprawdź ofertę <i className="lnr lnr-arrow-right"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
