import React, { useState, FormEvent } from "react";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HallBrowser.css";
import PlaceholderHall from "./PlaceholderHall/PlaceholderHall";
import PlaceholderHall2 from "./PlaceholderHall/PlacehodlerHall2";

export default function HallBrowser() {
  useWebsiteTitle("Przeglądarka Sal");

  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [guests, setGuests] = useState<string>("");
  const [hallType, setHallType] = useState<string>("");
  const [findHall, setFindHall] = useState<any>(null);
  const [offerChecked, setOfferChecked] = useState<boolean>(false);
  const [selectedHallType, setSelectedHallType] = useState<string>("");
  const [prevHallType, setPrevHallType] = useState<string>("");

  const handleCheckOffer = (e: FormEvent) => {
    e.preventDefault();

    if (selectedHallType === "") {
      alert("Proszę wybrać rodzaj sali przed sprawdzeniem oferty.");
      return;
    }

    setOfferChecked(true);
    setPrevHallType(selectedHallType);
  };

  const handleHallTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedHallType(event.target.value);
  };

  const getPlaceholderHallComponent = () => {
    switch (prevHallType) {
      case "conference":
        return <PlaceholderHall />;
      case "banquet":
      case "training":
        return <PlaceholderHall2 />;
      default:
        return null;
    }
  };

  return (
    <section className="room-availability spad">
      <div className="container">
        <div className="room-check row">
          <div
            className={`col-lg-6 check-form-container ${
              offerChecked ? "order-2 fade-in-left" : "order-1"
            }`}
          >
            <div className="check-form">
              <h2>Dopasuj ofertę do potrzeb</h2>
              <form onSubmit={handleCheckOffer}>
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
                  <div className="col-md-12">
                    <label htmlFor="guests" className="form-label">
                      Liczba Gości
                    </label>
                    <select
                      className="form-select"
                      id="guests"
                      onChange={(e) => setGuests(e.target.value)}
                    >
                      <option value="">Wybierz liczbę gości</option>
                      <option value="10-50">10-50 osób</option>
                      <option value="50-100">50-100 osób</option>
                      <option value="100-150">100-150 osób</option>
                      <option value="150-200">150-200 osób</option>
                      <option value="200+">Powyżej 200 osób</option>
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="hallType" className="form-label">
                    Sala
                  </label>
                  <select
                    className="form-select"
                    id="hallType"
                    onChange={handleHallTypeChange}
                    value={selectedHallType}
                  >
                    <option value="">Wybierz rodzaj sali</option>
                    <option value="conference">Sala konferencyjna</option>
                    <option value="banquet">Sala bankietowa</option>
                    <option value="training">Sala szkoleniowa</option>
                  </select>
                </div>
                <div className="d-flex justify-content-around">
                  <button
                    type="submit"
                    className="btn btn-primary btn-dark submit-btn"
                  >
                    Sprawdź ofertę <i className="lnr lnr-arrow-right"></i>
                  </button>
                  {offerChecked && (
                    <button
                      type="button"
                      className="btn btn-primary btn-dark submit-btn"
                    >
                      Zarezerwuj <i className="lnr lnr-arrow-right"></i>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          {offerChecked && (
            <div className="col-lg-6 fade-in-right">
              {getPlaceholderHallComponent()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
