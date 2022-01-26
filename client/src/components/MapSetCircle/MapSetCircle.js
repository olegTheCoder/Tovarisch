import { useEffect, useState } from "react";
import style from "./style.module.css";
import { getCords } from "../../redux/actions/cordsActions";
import { useDispatch, useSelector } from "react-redux";
const { REACT_APP_API_URL, REACT_APP_API_FRONTPORT } = process.env;

function MapSetCircle() {
  const currentPoint = useSelector((state) => state.cords);
  const radiusRedux = useSelector((state) => state.radius);

  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  let ymaps = window.ymaps;
  let myMap;
  let myCircle;

  useEffect(() => {
    document.querySelector("#map").innerHTML = "";
    ymaps.ready(init());
  }, [radiusRedux.inputRadius]);

  function init() {
    const { geolocation } = ymaps;

    geolocation
      .get({
        provider: "browser",
        mapStateAutoApply: true,
      })
      .then((result) => {
        const cordsWhereWeAre = result.geoObjects.position;
        let MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<span style="color: #000000; font-size: 15px; font-weight: bold;">$[properties.iconContent]</span>'
        );
        let currentPlaceMark = new ymaps.Placemark(
          cordsWhereWeAre,
          {
            iconContent: `МЫ ТУТ`,
            balloonContentBody: [
              ` <h1>coords</h1>` +
                `<p>${cordsWhereWeAre}</p>` +
                `<img src="${REACT_APP_API_URL}:${REACT_APP_API_FRONTPORT}/loc.png" style='height:120px; weight:120px '>`,
            ],
          },
          {
            preset: "twirl#redStretchyIcon",
            iconLayout: "default#imageWithContent",
            iconImageHref: `${REACT_APP_API_URL}:${REACT_APP_API_FRONTPORT}/loc.png`,
            iconImageSize: [48, 48],
            iconImageOffset: [-24, -24],
            iconContentOffset: [35, 25],
            iconContentLayout: MyIconContentLayout,
          }
        );

        function createCircle(coords, radius = 3000) {
          return (myCircle = new ymaps.Circle(
            [coords, radius],
            {
              balloonContent: `Радиус - ${radius} метров`,
              hintContent: "Установите область слежения",
            },
            {
              draggable: true,
              fillColor: "#FFA50060",
              strokeColor: "#FFA500",
              strokeOpacity: 0.8,
              strokeWidth: 2,
            }
          ));
        }

        if (Number(radiusRedux.inputRadius) > 0) {
          myCircle = createCircle(
            cordsWhereWeAre,
            Number(radiusRedux.inputRadius) * 1000
          );
        } else {
          myCircle = createCircle(cordsWhereWeAre);
        }

        ymaps.geocode(cordsWhereWeAre).then(function (res) {
          let firstGeoObject = res.geoObjects.get(0);
          myCircle.properties.set({
            iconCaption: firstGeoObject.getAddressLine(),
            balloonContent: firstGeoObject.getAddressLine(),
          });
          setAddress(firstGeoObject.getAddressLine());
          let textAddress = firstGeoObject.getAddressLine();
          dispatch(getCords({ cordsWhereWeAre, textAddress }));
        });

        myCircle.events.add("dragend", function () {
          let coords = myCircle.geometry.getCoordinates();
          ymaps.geocode(coords).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);
            myCircle.properties.set({
              iconCaption: firstGeoObject.getAddressLine(),
              balloonContent: firstGeoObject.getAddressLine(),
            });
            setAddress(firstGeoObject.getAddressLine());
            let textAddress = firstGeoObject.getAddressLine();
            dispatch(getCords({ coords, textAddress }));
          });
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

        myMap.geoObjects.add(myCircle);
        myMap.controls.add("zoomControl");
      });
  }

  return (
    <div>
      <div className={style.border}>
        <div className={style.map} id="map"></div>
      </div>
    </div>
  );
}

export default MapSetCircle;
