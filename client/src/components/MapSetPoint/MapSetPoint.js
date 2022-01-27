import { useEffect, useState } from "react";
import style from "./style.module.css";
import { getCords } from "../../redux/actions/cordsActions";
import { useDispatch, useSelector } from "react-redux";
const { REACT_APP_API_URLFRONT } = process.env;

function MapSetPoint() {
  const currentPoint = useSelector((state) => state.cords);
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  let ymaps = window.ymaps;
  let myMap;
  let myPlacemark;

  useEffect(() => {
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

        let currentPlaceMark = new ymaps.Placemark(
          cordsWhereWeAre,
          {
            iconContent: `МЫ ТУТ`,
            balloonContentBody: [
              `  <h3>Наше местоположение по IP</h3>` +
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

    myMap.events.add("click", function (e) {
      let coords = e.get("coords");

      if (myPlacemark) {
        myPlacemark.geometry.setCoordinates(coords);
      } else {
        myPlacemark = createPlacemark(coords);

        ymaps.geocode(coords).then(function (res) {
          let firstGeoObject = res.geoObjects.get(0);
          myPlacemark.properties.set({
            iconCaption: firstGeoObject.getAddressLine(),
            balloonContent: firstGeoObject.getAddressLine(),
          });
          setAddress(firstGeoObject.getAddressLine());
          let textAddress = firstGeoObject.getAddressLine();
          dispatch(getCords({ coords, textAddress }));
        });

        myMap.geoObjects.add(myPlacemark);

        myPlacemark.events.add("dragend", function () {
          let coords = myPlacemark.geometry.getCoordinates();
          ymaps.geocode(coords).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);
            myPlacemark.properties.set({
              iconCaption: firstGeoObject.getAddressLine(),
              balloonContent: firstGeoObject.getAddressLine(),
            });
            setAddress(firstGeoObject.getAddressLine());
            let textAddress = firstGeoObject.getAddressLine();
            dispatch(getCords({ coords, textAddress }));
          });
        });
      }
    });

    function createPlacemark(coords) {
      let MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<span style="color: #000000; font-size: 15px; font-weight: bold;">$[properties.iconContent]</span>'
      );

      return new ymaps.Placemark(
        coords,
        {
          iconCaption: "",
        },
        {
          preset: "twirl#redStretchyIcon",
          draggable: true,
          iconLayout: "default#imageWithContent",
          iconImageHref: `${REACT_APP_API_URLFRONT}/alert.png`,
          iconImageSize: [48, 48],
          iconImageOffset: [-24, -24],
          iconContentOffset: [35, 25],
          iconContentLayout: MyIconContentLayout,
        }
      );
    }

    myMap.controls.add("zoomControl");
  }

  return (
    <div>
      <div className={style.border}>
        <div className={style.map} id="map"></div>
      </div>
    </div>
  );
}

export default MapSetPoint;
