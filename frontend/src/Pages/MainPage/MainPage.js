import "./MainPage.css";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import { Link } from "react-router-dom";

export default function MainPage() {
  useWebsiteTitle("Strona główna");

  return (
    <main>
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.pexels.com/photos/128304/pexels-photo-128304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Hotel Sokół"
              className="d-block w-100 carousel-image"
            />
            <div className="container">
              <div className="carousel-caption text-start">
                <h1>Hotel Sokół</h1>
                <p>
                  Jesteśmy jednym z najlepszych hoteli w Polsce, a także
                  zdobywcami wielu nagród w których klienci z całego kraju
                  opowiedzieli się za naszymi usługami.
                </p>
                <p>
                  <a className="btn btn-lg btn-primary btn-light">
                    <Link className="nav-link" to="/przegladarkapokoji">
                      Przeglądaj nasze oferty
                    </Link>
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1715782414430-e1f0f4df354e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Event Organization"
              className="d-block w-100 carousel-image"
            />
            <div className="container">
              <div className="carousel-caption ">
                <h1>Organizacja eventów</h1>
                <p>
                  Serdecznie zapraszamy do organizacji szkoleń, konferencji,
                  kongresów oraz bankietów i imprez okolicznościowych. Do
                  Państwa dyspozycji oddajemy kompleks klimatyzowanych sal
                  wielofunkcyjnych o łącznej powierzchni 800 m2.
                </p>
                <p>
                  <a className="btn btn-lg btn-primary btn-light" href="#">
                    Dowiedz się więcej
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1528164604878-28ea0fb4f462?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Beautiful Surroundings"
              className="d-block w-100 carousel-image"
            />
            <div className="container">
              <div className="carousel-caption text-end">
                <h1>Piękna okolica hotelu.</h1>
                <p>
                  Nasz kompleks znajduję się w środku lasu oraz niedaleko
                  jeziora zapewniając okazję do wypoczynku oraz wszelkich
                  aktywności.
                </p>
                <p>
                  <a className="btn btn-lg btn-primary btn-light" href="#">
                    Sprawdź mapę
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div class="container marketing">
        <div class="row">
          <div class="col-lg-4">
            <img
              src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              class="bd-placeholder-img rounded-circle"
              width="140"
              height="140"
              aria-label="Placeholder: 140x140"
              focusable="false"
            />
            <h2>Sprawdź bogatą ofertę naszych pokoi</h2>
            <p>
              Nie ważne jakie są twoje wymagania. My damy radę im sprostać,
              skorzystaj z naszej wyszukiwarki pokoi.
            </p>
            <p>
              <a class="btn btn-secondary">
                <Link className="nav-link" to="/przegladarkapokoji">
                        Przeglądaj nasze oferty &raquo;
                </Link>
              </a>

            </p>
          </div>
          <div class="col-lg-4">
            <img
              src="https://images.unsplash.com/photo-1541508159146-2ab9c877e804?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              class="bd-placeholder-img rounded-circle"
              width="140"
              height="140"
              aria-label="Placeholder: 140x140"
              focusable="false"
            />
            <h2>Potrzebujesz miejsca do organizacji eventu?</h2>
            <p>
              Zapoznaj się z naszą specjalną ofertą sal bankietowych dla
              klientów biznesowych.
            </p>
            <p>
              <a class="btn btn-secondary" href="#">
                Sprawdź ofertę &raquo;
              </a>
            </p>
          </div>
          <div class="col-lg-4">
            <img
              src="https://images.unsplash.com/photo-1601141586963-f213d2575b7f?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              class="bd-placeholder-img rounded-circle"
              width="140"
              height="140"
              aria-label="Placeholder: 140x140"
              focusable="false"
            />
            <h2>Znajdź nas na naszym profilu na Facebooku</h2>
            <p>
              Zaobserwuj nas, aby być na bieżąco z naszymi aktualnymi ofertami,
              a także zyskuj rabaty na wynajem.
            </p>
            <p>
              <a class="btn btn-secondary" href="#">
                Odwiedź nas &raquo;
              </a>
            </p>
          </div>
        </div>

        <hr class="featurette-divider" />

        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading">
              Zakochaj się w magii mazur.{" "}
              <span class="text-muted">
                Obudź się z rana widząc piekno natury.
              </span>
            </h2>
            <p class="lead">
              Lokalizacja naszego hotelu jest w stanie zaoferować widoki niczym
              wyjęte z obrazu. Jesteśmy otoczeni urokliwym lasem a parę kroków
              od hotelu możesz znaleźć bulwary oraz molo na jeziorze.
            </p>
          </div>
          <div class="col-md-5 d-flex align-items-center justify-content-center">
            <div class="square-container overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1698007520311-f899108a2614?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                class="featurette-image img-fluid img-thumbnail"
                alt="Beatiful Sight"
              />
            </div>
          </div>
        </div>

        <hr class="featurette-divider" />

        <div class="row featurette">
          <div class="col-md-7 order-md-2">
            <h2 class="featurette-heading">
              Niebo w ustach, reszta ciała w Sokolę.{" "}
              <span class="text-muted">Sam się przekonaj.</span>
            </h2>
            <p class="lead">
              Skorzystaj z naszej hotelowej restauracji która jest dostępna za
              darmo dla naszych klientów. Oferujemy szeroką gamę potraw od
              deserów po obiady. Profesjonalna kadra kucharzy oraz kelnerów
              zagwarantuje obsługę na jaką zasługujesz
            </p>
          </div>
          <div class="col-md-5 d-flex align-items-center justify-content-center">
            <div class="square-container overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1526234362653-3b75a0c07438?q=80&w=500&h=500&fit=crop&auto=format&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                class="featurette-image img-fluid img-thumbnail"
                alt="Hotel Restaurant"
              />
            </div>
          </div>
        </div>

        <hr class="featurette-divider" />

        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading">
              Relaks podstawą wypoczynku.{" "}
              <span class="text-muted">Pozwól sobie się odprężyć.</span>
            </h2>
            <p class="lead">
              W naszym hotelu oferujemy szeroki wybór masaży, które są dostępne
              dla wszystkich gości bez dodatkowych opłat. Każdy klient może
              skorzystać z relaksujących masaży aromaterapeutycznych oraz
              leczniczych masaży sportowych. Ponadto, na terenie hotelu znajdują
              się dwa baseny – jeden wewnętrzny, a drugi na świeżym powietrzu,
              które są dostępne dla gości przez cały rok.
            </p>
          </div>
          <div class="col-md-5 d-flex align-items-center justify-content-center">
            <div class="square-container">
              <img
                src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                class="featurette-image img-fluid img-thumbnail"
                alt="Relaxing Spa"
              />
            </div>
          </div>
        </div>

        <hr class="featurette-divider" />
      </div>
    </main>
  );
}
