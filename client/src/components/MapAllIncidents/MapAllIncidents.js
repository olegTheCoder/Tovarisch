import { useEffect, useState } from "react";
import style from "./style.module.css";
import { getCords } from "../../redux/actions/cordsActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIncidents } from "../../redux/actions/incidentActions";
import AccidentNearby from "../AccidentNearby/AccidentNearby";
import { userPosition } from "../../redux/actions/nearbyActions";

function MapAllIncidents() {
  const [address, setAddress] = useState("");
  const currentPoint = useSelector((state) => state.cords);
  let allIncidents = useSelector((state) => state.incidents);
  const dispatch = useDispatch();
  let ymaps = window.ymaps;
  let myMap;
  let geoObjects = [];
  let navigate = useNavigate();
  const allNearbyIncidents = useSelector((state) => state.nearby.nearbyIncidents)

  useEffect(() => {
    dispatch(getIncidents());
    document.querySelector("#map").innerHTML = "";
    ymaps.ready(init);
  }, []);

  function init() {
    const { geolocation } = ymaps;
    let MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<span style="color: #000000; font-size: 15px; font-weight: bold;">$[properties.iconContent]</span>'
    );

    geolocation
      .get({
        provider: "browser",
        mapStateAutoApply: true,
      })
      .then((result) => {
        const cordsWhereWeAre = result.geoObjects.position;
        ymaps.geocode(cordsWhereWeAre).then(function (res) {
          let firstGeoObject = res.geoObjects.get(0);
          setAddress(firstGeoObject.getAddressLine());
        });

        // текущая точка, которая подгружается из браузера по айпи
        let currentPlaceMark = new ymaps.Placemark(
          cordsWhereWeAre,
          {
            // Свойства
            iconContent: `МЫ ТУТ`,
            balloonContentBody: [
              ` <h1>coords</h1>` +
                `<p>${cordsWhereWeAre}</p>` +
                `<img src="https://cdn-icons-png.flaticon.com/512/0/191.png" style='height:120px; weight:120px '>`,
            ],
          },
          {
            // Опции
            preset: "twirl#redStretchyIcon", // иконка растягивается под контент

            iconLayout: "default#imageWithContent",
            // Своё изображение иконки метки.
            iconImageHref: "http://localhost:3001/loc.png",
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [35, 25],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout,
          }
        );
        /////////////////////////////////////////////////
        dispatch(userPosition(cordsWhereWeAre)) // сохранинение точки для создания зоны прослушивания событий поблизости
        dispatch(getCords(cordsWhereWeAre)); // сохранение текущей точки в редаксе
        myMap.geoObjects.add(currentPlaceMark); // ставим точку на нашу карту
      });

    myMap = new ymaps.Map(
      "map",
      {
        center: [55.753994, 37.622093],
        zoom: 10,
        controls: ["geolocationControl"],
      },
      {
        searchControlProvider: "yandex#search",
      }
    );
    myMap.controls.add("zoomControl");

    ////////////////////////////////////////////////////////////////////////
    // отображение всех точек из базы данных

    for (let i = 0; i < allIncidents.length; i++) {
      const category = allIncidents[i].category;
      let icon = null;

      if (category === "tech") icon = "http://localhost:3001/hammer.png";
      else if (category === "criminal")
        icon = "http://localhost:3001/thief.png";
      else icon = "http://localhost:3001/nature.png";

      console.log(allIncidents[i].img)

      geoObjects[i] = new ymaps.Placemark( // 
        [allIncidents[i].coords[0], allIncidents[i].coords[1]],
        {
          balloonContentHeader: allIncidents[i].title,
          balloonContentBody: [
            `<div>${allIncidents[i].description}</div>` +
              ` <br/> <button type="button" style="background: #D4145A;
          border-radius: 100px;
          color: black;
          padding: 8px;
          cursor: pointer;
          font-size: 14px;
          border: 1px solid transparent;
          text-align: center;" class="btn" data-id=${allIncidents[i].id}>Подробнее</button> <br/><br/>` +
          `<br> <img src="http://localhost:3000/uploads/${allIncidents[i].img}" style='height:120px; weight:120px '> <br/>`,
          ],
        },
        {
          // Опции
          preset: "twirl#redStretchyIcon", // иконка растягивается под контент
          iconLayout: "default#imageWithContent",
          // Своё изображение иконки метки.
          iconImageHref: icon,
          // Размеры метки.
          iconImageSize: [48, 48],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-24, -24],
          // Смещение слоя с содержимым относительно слоя с картинкой.
          iconContentOffset: [35, 25],
          // Макет содержимого.
          iconContentLayout: MyIconContentLayout,
        }
      );
    }
    ////////////////////////////////////////////////////////////////////////
    // добавим кластеризацию

    let clusterer = new ymaps.Clusterer({
      clusterIcons: [
        {
          href: "http://localhost:3001/alert.png",
          size: [40, 40],
          offset: [-20, -20],
        },
      ],
    });

    clusterer.add(geoObjects);
    myMap.geoObjects.add(clusterer);

    ////////////////////////////////////////////////////////////////////////
  }

  function detailOnMap(event) {
    event.preventDefault();
    if (event.target.tagName === "BUTTON") {
      navigate(`/incident/${event.target.dataset.id}`);
    }
  }

  let cardOnMap;
  useEffect(() => {
    cardOnMap = document.querySelector("#map");
    cardOnMap.addEventListener("click", detailOnMap);
  }, []);

  return (
    <div>
      <h1 className={style.text}>Здесь все происшествия пользователей</h1>
      <div className={style.map} id="map"></div>
      <div className={style.text}>
      <p>Количество происшествий рядом с вами: {allNearbyIncidents && allNearbyIncidents.length}</p>
        <h2>Ваша текущая позиция</h2>
        <p>{address}</p>
        <p>
          {currentPoint[0]}, {currentPoint[1]}
        </p>
      </div>
      <AccidentNearby/>
    </div>
  );
}

export default MapAllIncidents;
