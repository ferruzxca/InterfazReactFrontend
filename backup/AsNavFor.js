// frontend/src/components/AsNavFor.js
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import "./AsNavFor.css";

function AsNavFor() {
  const [data, setData] = useState([]);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);
  const navigate = useNavigate();

  // Función para obtener datos desde el backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/urls');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Función para manejar el clic del botón de reproducción
  const handleButtonClick = (videoPath, videoTitle, videoDescription) => {
    navigate("/video", { state: { videoPath, videoTitle, videoDescription } });
  };

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  return (
    <div className="slider-container">
      <div className="img-logo"></div>
      <h1>Estrenos</h1>
      <Slider asNavFor={nav2} ref={sliderRef1}>
        {data.map((d) => (
          <Card key={d.UrlID} className="movie-card">
            <div className="image-container">
              <Card.Img variant="top" src={d.img} className="nav-image" />
              <div className="d-grid gap-2">
              <Button
                variant="primary" size="lg"
                onClick={() => handleButtonClick(d.video, d.name, d.review)}
              >
                Play
              </Button>
              </div>
            </div>
          </Card>
        ))}
      </Slider>
      <h1>Cartelera</h1>
      <Slider
        asNavFor={nav1}
        ref={sliderRef2}
        slidesToShow={5}
        swipeToSlide={true}
        focusOnSelect={true}
      >
        {data.map((d) => (
          <Card key={d.UrlID} className="movie-card">
            <Card.Img variant="top" src={d.img} className="movie-image" />
            <Card.Body>
              <Card.Title>{d.name}</Card.Title>
              <Card.Text className="movie-review">{d.review}</Card.Text>
            </Card.Body>
            <Button
              className="play-button"
              variant="primary"
              onClick={() => handleButtonClick(d.video, d.name, d.review)}
            >
              Play
            </Button>
          </Card>
        ))}
      </Slider>
      <h1>Top 10 Mundial</h1>
      <Slider
        asNavFor={nav1}
        ref={sliderRef2}
        slidesToShow={4}
        swipeToSlide={true}
        focusOnSelect={true}
      >
        {data.map((d) => (
          <Card key={d.UrlID} className="movie-card">
            <Card.Img variant="top" src={d.img} className="movie-image" />
            <Card.Body>
              <Card.Title>{d.name}</Card.Title>
              <Card.Text className="movie-review">{d.review}</Card.Text>
            </Card.Body>
            <Button
              className="play-button"
              variant="primary"
              onClick={() => handleButtonClick(d.video, d.name, d.review)}
            >
              Play
            </Button>
          </Card>
        ))}
      </Slider>

      <h1>Los Mas vistos</h1>
      <Slider
        asNavFor={nav1}
        ref={sliderRef2}
        slidesToShow={4}
        swipeToSlide={true}
        focusOnSelect={true}
      >
        {data.map((d) => (
          <Card key={d.UrlID} className="movie-card">
            <Card.Img variant="top" src={d.img} className="movie-image" />
            <Card.Body>
              <Card.Title>{d.name}</Card.Title>
              <Card.Text className="movie-review">{d.review}</Card.Text>
            </Card.Body>
            <Button
              className="play-button"
              variant="primary"
              onClick={() => handleButtonClick(d.video, d.name, d.review)}
            >
              Play
            </Button>
          </Card>
        ))}
      </Slider>

      <h1>Dales una oportunidad</h1>
      <Slider
        asNavFor={nav1}
        ref={sliderRef2}
        slidesToShow={4}
        swipeToSlide={true}
        focusOnSelect={true}
      >
        {data.map((d) => (
          <Card key={d.UrlID} className="movie-card">
            <Card.Img variant="top" src={d.img} className="movie-image" />
            <Card.Body>
              <Card.Title>{d.name}</Card.Title>
              <Card.Text className="movie-review">{d.review}</Card.Text>
            </Card.Body>
            <Button
                className="play-button"
                variant="primary"
                onClick={() => handleButtonClick(d.video, d.name, d.review)}
              >
                Play
              </Button>
          </Card>
        ))}
      </Slider>
    </div>
  );
}

export default AsNavFor;
