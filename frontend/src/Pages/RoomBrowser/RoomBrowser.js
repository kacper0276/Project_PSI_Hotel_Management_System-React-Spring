import React, { useContext, useState } from "react";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RoomBrowser.css";
import PlaceholderRoom from "./PlaceholderRoom/PlaceholderRoom";
import PlaceholderRoom2 from "./PlaceholderRoom/PlaceholderRoom2";
import axios from "axios";
import { API_URL } from "../../App";
import MainContext from "../../context/MainContext";

export default function RoomBrowser() {
  useWebsiteTitle("Przeglądarka Pokoji");
  const context = useContext(MainContext);

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [roomType, setRoomType] = useState("Apartament");
  const [findRoom, setFindRoom] = useState(null);
  const [offerChecked, setOfferChecked] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [prevRoomType, setPrevRoomType] = useState("");
  const [reservationData, setReservationData] = useState({
    cena: 0,
    dataWymeldowania: null,
    dataZameldowania: null,
    nazwiskoKlienta: null,
    nrTelKontaktowy: null,
    status: "Stworzona",
    pokoje_id: null,
  });

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
  const handleCheckOffer = async (e) => {
    e.preventDefault();

    if (selectedRoomType === "") {
      alert("Proszę wybrać rodzaj pokoju przed sprawdzeniem oferty.");
      return;
    }

    setOfferChecked(true);
    setPrevRoomType(selectedRoomType);

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
        setFindRoom(res.data);
        setReservationData({
          ...reservationData,
          cena: res.data.cena,
          dataWymeldowania: dateTo,
          dataZameldowania: dateFrom,
          pokoje_id: res.data.id,
        });
      });
  };

  const handleRoomTypeChange = (event) => {
    setSelectedRoomType(event.target.value);
  };
  const getPlaceholderRoomComponent = () => {
    if (prevRoomType === "apartment") {
      return <PlaceholderRoom />;
    } else if (prevRoomType === "double" || prevRoomType === "single") {
      return <PlaceholderRoom2 />;
    } else {
      return null;
    }
  };

  const reserveRoom = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(reservationData).forEach((key) => {
      formData.append(key, reservationData[key]);
    });

    axios
      .post(`${API_URL}/rezerwacje/${context.state.userName}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <section className="room-availability spad">
      <div className="container">
        <div className={`room-check row`}>
          <div
            className={`col-lg-6 check-form-container ${
              offerChecked ? "order-2 fade-in-left" : "order-1"
            }`}
          >
            <div className="check-form">
              <h2>Dopasuj ofertę do potrzeb</h2>
              <form action="#">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="fromDate" className="form-label">
                      Od
                    </label>
                    <input
                      type="date"
                      className="form-control datepicker-1"
                      id="fromDate"
                      placeholder="yyyy-mm-dd"
                      onChange={(e) => setDateFrom(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="toDate" className="form-label">
                      Do
                    </label>
                    <input
                      type="date"
                      className="form-control datepicker-2"
                      id="toDate"
                      placeholder="yyyy-mm-dd"
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
                    onChange={handleRoomTypeChange}
                  >
                    <option value="">Wybierz rodzaj pokoju</option>
                    <option value="apartment">Apartament</option>
                    <option value="double">Podwójny pokój</option>
                    <option value="single">Pojedynczy pokój</option>
                  </select>
                </div>
                <div className="d-flex gap-3 row">
                  <label htmlFor="roomType" className="form-label">
                    Naziwsko klienta (Potrzebne przy zameldowaniu)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    onChange={(e) => {
                      setReservationData({
                        ...reservationData,
                        nazwiskoKlienta: e.target.value,
                      });
                    }}
                  />
                  <label htmlFor="phoneNumber" className="form-label">
                    Podaj numer telefonu
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    onChange={(e) => {
                      setReservationData({
                        ...reservationData,
                        nrTelKontaktowy: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="d-flex justify-content-around">
                  <button
                    type="button"
                    className="btn btn-primary btn-dark submit-btn"
                    onClick={handleCheckOffer}
                  >
                    Sprawdź ofertę <i className="lnr lnr-arrow-right"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-dark submit-btn"
                    style={{ visibility: offerChecked ? "visible" : "hidden" }}
                    onClick={reserveRoom}
                  >
                    Zarezerwuj <i className="lnr lnr-arrow-right"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
          {offerChecked && (
            <div className="col-lg-6 fade-in-right">
              {getPlaceholderRoomComponent()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
