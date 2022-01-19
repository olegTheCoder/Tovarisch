import { useEffect, useState } from "react";
import style from "./style.module.css";
import { getCords } from "../../redux/actions/cordsActions";
import { useDispatch, useSelector } from "react-redux";

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

        // текущая точка, которая подгружается из браузера по айпи
        let currentPlaceMark = new ymaps.Placemark(
          cordsWhereWeAre,
          {
            // Свойства
            iconContent: `МЫ ТУТ`,
            balloonContentBody: [
              `  <h3>Наше местоположение по IP</h3>` +
                `<p>${cordsWhereWeAre}</p>` +
                `<img src="http://localhost:3001/loc.png" style='height:120px; weight:120px '>`,
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

    //////////////////////////////////////////////////////////////////
    // Поиск по клику
    myMap.events.add("click", function (e) {
      let coords = e.get("coords");

      // Если метка уже создана – просто передвигаем ее.
      if (myPlacemark) {
        myPlacemark.geometry.setCoordinates(coords);
      }
      // Если нет – создаем.
      else {
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
        // console.log("before dispatch", coords);

        // Слушаем событие окончания перетаскивания на метке.
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
          // Своё изображение иконки метки.
          iconImageHref: "http://localhost:3001/alert.png",
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

    ///////////////////////////////////////////////////////////////

    myMap.controls.add("zoomControl");
  }

  return (
    <div>
      <div className={style.border}>
        <div className={style.map} id="map"></div>
      </div>

      <div className={style.text}>
        <h2>Твоя выбранная точка </h2>
        <p>{address}</p>
      </div>
    </div>
  );
}

export default MapSetPoint;
