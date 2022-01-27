import { useEffect, useState } from "react";
import style from "./style.module.css";
import { getCords } from "../../redux/actions/cordsActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIncidents } from "../../redux/actions/incidentActions";
import AccidentNearby from "../AccidentNearby/AccidentNearby";
import { userPosition } from "../../redux/actions/nearbyActions";
const { REACT_APP_API_URLFRONT, REACT_APP_API_URL } = process.env;

function MapAllIncidents() {
  const [address, setAddress] = useState("");
  const currentPoint = useSelector((state) => state.cords);
  let allIncidents = useSelector((state) => state.incidents);
  const dispatch = useDispatch();
  let ymaps = window.ymaps;
  let myMap;
  let geoObjects = [];
  let navigate = useNavigate();
  const allNearbyIncidents = useSelector(
    (state) => state.nearby.nearbyIncidents
  );

  useEffect(() => {
    dispatch(getIncidents());

    setTimeout(() => {
      if ([...document.querySelector("#map").children].length > 0) {
        document.querySelector("#map").innerHTML = "";
        ymaps.ready(init);
      } else {
        document.querySelector("#map").innerHTML = "";
        ymaps.ready(init);
      }
    }, 500);
  }, [allIncidents]);

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

        let currentPlaceMark = new ymaps.Placemark(
          cordsWhereWeAre,
          {
            iconContent: `МЫ ТУТ`,
            balloonContentBody: [
              ` <h3>Наше местоположение по IP</h3>` +
                `<p>${cordsWhereWeAre}</p>` +
                `<img src="${REACT_APP_API_URLFRONT}/loc.png" style='height:120px; weight:120px '>`,
            ],
          },
          {
            preset: "twirl#redStretchyIcon",

            iconLayout: "default#imageWithContent",
            iconImageHref: `${REACT_APP_API_URLFRONT}/loc.png`,
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
            iconContentOffset: [35, 25],
            iconContentLayout: MyIconContentLayout,
          }
        );
        dispatch(userPosition(cordsWhereWeAre));
        dispatch(getCords(cordsWhereWeAre));
        myMap.geoObjects.add(currentPlaceMark);
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

    for (let i = 0; i < allIncidents.length; i++) {
      const category = allIncidents[i].category;
      let icon = null;

      if (category === "tech")
        icon = `${REACT_APP_API_URLFRONT}/tech.png`;
      else if (category === "criminal")
        icon = `${REACT_APP_API_URLFRONT}/robber.png`;
      else
        icon = `${REACT_APP_API_URLFRONT}/natur.png`;

      geoObjects[i] = new ymaps.Placemark( //
        [allIncidents[i].coords[0], allIncidents[i].coords[1]],
        {
          balloonContentHeader: allIncidents[i].title,
          balloonContentBody: [
            `<div>${allIncidents[i].description}</div>` +
              `<div>${allIncidents[i].address}</div>` +
              ` <br/> <button type="button" style="background: #FF6347;
          border-radius: 100px;
          color: black;
          padding: 8px;
          cursor: pointer;
          font-size: 14px;
          border: 1px solid transparent;
          text-align: center;" class="btn" data-id=${allIncidents[i].id}>Подробнее</button> <br/><br/>` +
              `<br> <img src="${REACT_APP_API_URL}/uploads/${allIncidents[i].img}" style='height:120px; weight:120px '> <br/>`,
          ],
        },
        {
          preset: "twirl#redStretchyIcon",
          iconLayout: "default#imageWithContent",
          iconImageHref: icon,
          iconImageSize: [48, 48],
          iconImageOffset: [-24, -24],
          iconContentOffset: [35, 25],
          iconContentLayout: MyIconContentLayout,
        }
      );
    }

    let clusterer = new ymaps.Clusterer({
      clusterIcons: [
        {
          href: `${REACT_APP_API_URLFRONT}/alert.png`,
          size: [40, 40],
          offset: [-20, -20],
        },
      ],
    });

    clusterer.add(geoObjects);
    myMap.geoObjects.add(clusterer);
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
    <div className={style.mapWrapper}>
      <div className={style.border}>
        <div className={style.map} id="map"></div>
      </div>
      <div className={style.mapLeft}>
        <h1 className={style.text}>Здесь все происшествия пользователей</h1>
        <div className={style.text}>
          <p>
            Количество происшествий рядом с вами:{" "}
            {allNearbyIncidents && allNearbyIncidents.length}
          </p>
          <h2>Ваша текущая позиция</h2>
          <p>{address}</p>
          <p>
            {currentPoint[0]}, {currentPoint[1]}
          </p>
        </div>
      </div>
      <AccidentNearby />
    </div>
  );
}

export default MapAllIncidents;
