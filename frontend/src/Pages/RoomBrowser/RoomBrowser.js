import React, { useState } from "react";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RoomBrowser.css";
import PlaceholderRoom from "./PlaceholderRoom/PlaceholderRoom";
import PlaceholderRoom2 from "./PlaceholderRoom/PlaceholderRoom2";

export default function RoomBrowser() {
  useWebsiteTitle("Przeglądarka Pokoji");

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [offerChecked, setOfferChecked] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [prevRoomType, setPrevRoomType] = useState("");

  const decreaseValue = (type) => {
    switch (type) {
      case "adults":
        setAdults(adults > 0 ? adults - 1 : 0);
        break;
      case "children":
        setChildren(children > 0 ? children - 1 : 0);
        break;
      case "rooms":
        setRooms(rooms > 0 ? rooms - 1 : 0);
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
      case "rooms":
        setRooms(rooms + 1);
        break;
      default:
        break;
    }
  };
  const handleCheckOffer = () => {
    if (selectedRoomType === "") {
      alert("Proszę wybrać rodzaj pokoju przed sprawdzeniem oferty.");
      return;
    }
    
    setOfferChecked(true);
    setPrevRoomType(selectedRoomType);
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

  return (
    <section className="room-availability spad">
      <div className="container">
        <div className={`room-check row`}>
          <div className={`col-lg-6 check-form-container ${offerChecked ? "order-2 fade-in-left" : "order-1"}`}>
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
                      placeholder="dd / mm / yyyy"
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
                      placeholder="dd / mm / yyyy"
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
                  <select className="form-select" id="roomType" onChange={handleRoomTypeChange}>
                    <option value="apartment">Wybierz rodzaj pokoju</option>
                    <option value="apartment">Apartament</option>
                    <option value="double">Podwójny pokój</option>
                    <option value="single">Pojedynczy pokój</option>
                  </select>
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
