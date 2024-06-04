import { Carousel } from "react-bootstrap";

export default function PlaceholderHall(){
    return(
        <div className="col-lg-6">
        <div className="room-item">
          <Carousel className="carousel-align">
            <Carousel.Item className="carousel-item-align">
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1624763149686-1893acf73092?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Room 1"
              />
            </Carousel.Item>
            <Carousel.Item className="carousel-item-align">
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1553026108-495a88f77fc5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJhbnF1ZXQlMjBoYWxsfGVufDB8fDB8fHww"
                alt="Room 2"
              />
            </Carousel.Item>
            <Carousel.Item className="carousel-item-align">
              <img
                className="d-block w-100"
                src="https://plus.unsplash.com/premium_photo-1673569508762-22f2b582414f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Room 3"
              />
            </Carousel.Item>
          </Carousel>
          <div class="room-text mt-3">
            <div class="room-title ">
              <h2>Sala konferencyjna</h2>
              <div class="room-price d-flex align-items-end price">
                <h2 class="basic-text mb-0">10 000zł/wieczór</h2>
              </div>
            </div>
            <div class="room-features d-flex justify-content-around align-items-center flex-wrap">
              <div class="room-info text-center">
                <span>Bar</span>
                <img
                  src="https://img.icons8.com/?size=100&id=8343&format=png&color=000000"
                  alt="Bar"
                  class="icon"
                  width="40"
                  height="40"
                />
              </div>
              <div class="room-info text-center">
                <span>Nagłośnienie</span>
                <img
                  src="https://img.icons8.com/?size=100&id=85682&format=png&color=000000"
                  alt="Speaker"
                  class="icon"
                  width="40"
                  height="40"
                />
              </div>
              <div class="room-info text-center">
                <span>Wi-fi</span>
                <img
                  src="https://img.icons8.com/?size=100&id=172&format=png&color=000000"
                  alt="High Wi-fi"
                  class="icon"
                  width="40"
                  height="40"
                />
              </div>
              <div class="room-info text-center">
                <span>Parking</span>
                <img
                  src="https://img.icons8.com/?size=100&id=10738&format=png&color=000000"
                  alt="Parking"
                  class="icon"
                  width="40"
                  height="40"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}