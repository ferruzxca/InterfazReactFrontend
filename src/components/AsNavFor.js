// frontend/src/components/AsNavFor.js
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from 'react-router-dom';
import "./AsNavFor.css";

function AsNavFor() {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);
  const navigate = useNavigate();

  const data = [
    {
      name: "Alien",
      img: "/img/Alien.jpg",
      review:
        "Cuarenta y cinco años, cinco secuelas, dos spin-offs y una gigantesca compra de marca después, la saga volverá a los cines con 'Alien: Romulus', la película con la que la ahora renombrada 20th Century Studios demuestra que su compra no ha sido en vano antes de que la serie 'Alien' llegue a Disney+.",
      video: "/vid/Alien.mp4",
    },
    {
      name: "Pobres Criaturas",
      img: "/img/PobresCriaturas.jpg",
      review:
        "'Pobres criaturas', la reinvención en clave de comedia negra de la historia de Frankenstein del director griego Yorgos Lanthimos, cuenta la historia de Bella Baxter (Emma Stone) y el científico que experimenta con ella: el Dr. Godwin Baxter, interpretado por nada más y nada menos que Willem Dafoe.",
      video: "/vid/PobresCriaturas.mp4",
    },
    {
      name: "Dune",
      img: "/img/Dune.jpeg",
      review:
        "'Dune', de Denis Villeneuve, termina cuando Paul se une oficialmente a los Fremen y planea traer la paz a Arrakis.",
      video: "/vid/Dune.mp4",
    },
    {
      name: "Cazafantasmas",
      img: "/img/Cazafantasmas.jpeg",
      review:
        "Las escenas poscréditos de 'Cazafantasmas: Más allá' (2021) revelaban que Winston (Ernie Hudson) era el dueño de la antigua estación de bomberos de los cazafantasmas. En 'Cazafantasmas: Imperio helado' regresamos a Nueva York para luchar contra nuevas entidades ectoplásmicas.",
      video: "/vid/Cazafantasmas.mp4",
    },
    {
      name: "Godzilla & Kong",
      img: "/img/GodzillayKong.jpg",
      review:
        "Se cuela entre las películas de 2024 la secuela directa de 'Godzilla vs. Kong', quinta entrega del monsterverse tras ésta, 'Godzilla' (2014), 'Kong, la Isla Calavera' (2017) y 'Godzilla, Rey de los Monstruos' (2019). Por primera vez en la franquicia, un director repite a los mandos de una nueva película.",
      video: "/vid/GodzillayKong.mp4",
    },
    {
      name: "Rivales",
      img: "/img/Rivales.jpg",
      review:
        "Luca Guadagnino, director de títulos como 'Call me by your name', 'Hasta los huesos: Bones & All' o 'We are who we are' se ha ganado un hueco entre las películas de 2024 con 'Rivales',",
      video: "/vid/Rivales.mp4",
    },
    {
      name: "El Especialista",
      img: "/img/ElEspecialista.jpg",
      review:
        "Recién salido de un accidente que casi acaba con su carrera, un doble de acción tiene que localizar a una estrella de cine desaparecida, resolver una conspiración e intentar recuperar al amor de su vida sin dejar de hacer su trabajo diario.",
      video: "/vid/ElEspecialista.mp4",
    },
    {
      name: "El Reino de los Simoios",
      img: "/img/ElReinodelosSimios.jpg",
      review: "Amazing film!",
      video: "/vid/ElReinodelosSimios.mp4",
    },
    {
      name: "Furiosa",
      img: "/img/Furiosa.jpeg",
      review:
        "Después de años de rumores, retrasos, falsas esperanzas y hasta juicios entre George Miller y Warner, la precuela de 'Mad Max: Furia en la carretera' tiene un hueco entre las películas de 2024. 'Furiosa: De la saga Mad Max'",
      video: "/vid/Furiosa.mp4",
    },
    {
      name: "Intensamente",
      img: "/img/Intensamente.jpg",
      review:
        "La secuela de 'Del revés', la película de Pixar ganadora del Premio Oscar a mejor película de animación en 2015, es uno de los grandes éxitos entre las películas de 2024.",
      video: "/vid/Intensamente.mp4",
    },
    {
      name: "Kind of Kindness",
      img: "/img/KindofKindness.jpg",
      review:
        "'Kinds of kindness' vuelve a juntar a Yorgos Lanthimos y a Emma Stone tras 'Pobres criaturas', haciendo doblete entre las películas de 2024 para, en esta ocasión, narrar tres historias:",
      video: "/vid/KindofKindness.mp4",
    },
    {
      name: "Padres no hay mas que uno",
      img: "/img/Padre.jpg",
      review:
        "El éxito comercial de ‘Padre no hay más que uno’ (2019), ‘Padre no hay más que uno 2: La llegada de la suegra’ (2020)",
      video: "/vid/Padre.mp4",
    },
    {
      name: "Deadpool",
      img: "/img/Deadpool.jpg",
      review:
        "Las dos primeras entregas del también conocido como 'Mercenario Bocazas' han sido un auténtico éxito de taquilla, sobre todo entre los jóvenes, y han conseguido hacer de Deadpool un anti-héroe mundialmente conocido, no solo por los fans de los cómics de Marvel.",
      video: "/vid/Deadpool.mp4",
    },
    {
      name: "Maxxine",
      img: "/img/Maxxine.jpg",
      review:
        "'MaXXXine', el cierre de la trilogía creada por Ti West y Mia Goth con nocturnidad y alevosía, es otra de las películas de 2024 fundamentales para los fans del género.",
      video: "/vid/Maxxine.mp4",
    },
    {
      name: "Bitelchús",
      img: "/img/Bitelchus.jpg",
      review:
        "Aunque comentada desde hace años, la inclusión de 'Bitelchús Bitelchús' entre las películas de 2024 se hizo realmente especial cuando se confirmó el regreso de Winona Ryder y Michael Keaton, además del fichaje de Jenna Ortega",
      video: "/vid/Bitelchus.mp4",
    },
    {
      name: "Joker",
      img: "/img/Joker.jpg",
      review:
        "'Joker 2', bautizada como 'Joker: Folie á Deux', está en camino, es sin duda la más esperada de las películas de 2024, al menos para los que entendieron la primera como un auténtico hito en plena fiebre del cine ambientado en personajes de cómic.",
      video: "/vid/Joker.mp4",
    },
    {
      name: "Terrifier",
      img: "/img/Terrifier.jpg",
      review:
        "Una vez que supe de qué iría la segunda parte, me di cuenta de que iba a ser, al menos, una trilogía",
      video: "/vid/Terrifier.mp4",
    },
    {
      name: "Gladiator",
      img: "/img/Gladiator.jpg",
      review:
        "'Gladiator' es (para algunos) una de las mejores películas de Ridley Scott. El realizador se la juega ahora con su secuela, 'Gladiator II', ambientada 25 años después, sigue los pasos de Lucius, el hijo de Lucilla (interpretada en la original por Connie Nielsen).",
      video: "/vid/Gladiator.mp4",
    },
    {
      name: "Lord of the Rings",
      img: "/img/LordofRings.jpg",
      review:
        "El señor de los anillos: La guerra de los Rohirrim’ es el nuevo y ambicioso proyecto de Warner, un largometraje animado que nos llevará hasta el reino de Rohan durante el apogeo de la Marca",
      video: "/vid/LordofRings.mp4",
    },
    {
      name: "Kraven",
      img: "/img/Kraven.jpg",
      review:
        "'Kraven el Cazador' seguirá ampliando dentro de las películas de 2024 el muestrario de villanos de Marvel en Sony después de los estrenos de 'Venom' y 'Morbius'. ",
      video: "/vid/Kraven.mp4",
    },
    {
      name: "Mufasa",
      img: "/img/Mufasa.jpg",
      review:
        "¿Qué pasó con el cadáver de Mufasa en 'El rey león? No lo descubriremos aquí, ya que la historia principal de 'Mufasa: El rey león' se centrará en el origen del padre de Simba, explorando su infancia al crecer con su hermano Scar.",
      video: "/vid/Mufasa.mp4",
    },
    {
      name: "Nosferatu",
      img: "/img/Nosferatu.jpg",
      review:
        "Ambientada en el siglo XIX, esta historia gótica de obsesión, amor, seducción y miedo sigue a un joven llamado Thomas Hutter que es enviado por su jefe al castillo del Conde Orlok (también conocido como Drácula). ",
      video: "/vid/Nosferatu.mp4",
    },
  ];

  const handleButtonClick = (videoPath, videoTitle, videoDescription) => {
    navigate('/video', { state: { videoPath, videoTitle, videoDescription } });
  };
  

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  return (
    <div className="slider-container">
      <div className="img-logo"></div>
      <h1>Estrenos</h1>
      <Slider asNavFor={nav2} ref={(slider) => (sliderRef1 = slider)}>
        {data.map((d) => (
          <Card key={d.name} className="movie-card">
            <div className="image-container">
              <Card.Img variant="top" src={d.img} className="nav-image" />
              <Button
                className="play-button"
                variant="primary"
                onClick={() => handleButtonClick(d.video, d.name, d.review)}
              >
                Play
              </Button>
            </div>
          </Card>
        ))}
      </Slider>
      <h1>Cartelera</h1>
      <Slider
        asNavFor={nav1}
        ref={(slider) => (sliderRef2 = slider)}
        slidesToShow={4}
        swipeToSlide={true}
        focusOnSelect={true}
      >
        {data.map((d) => (
          <Card key={d.name} className="movie-card">
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
