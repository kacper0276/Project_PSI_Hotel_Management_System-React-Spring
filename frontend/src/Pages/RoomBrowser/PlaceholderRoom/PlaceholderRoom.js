import { Carousel } from "react-bootstrap";

export default function  PlaceholderRoom(){
    return(
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
              <h2>Apartament</h2>
              <div className="room-price">
                <span >już od</span>
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
    )
}