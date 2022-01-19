import { useEffect, useState } from "react";
import style from "./style.module.css";
import { getCords } from "../../redux/actions/cordsActions";
import { useDispatch, useSelector } from "react-redux";
import { setRadius } from "../../redux/actions/radiusActions";

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

        function createCircle(coords, radius = 3000) {
          return (myCircle = new ymaps.Circle(
            [
              // Координаты центра круга.
              coords,
              // Радиус круга в метрах.
              radius,
            ],
            {
              // Описываем свойства круга.
              // Содержимое балуна.
              balloonContent: `Радиус - ${radius} метров`,
              // Содержимое хинта.
              hintContent: "Установите область слежения",
            },
            {
              // Задаем опции круга.
              // Включаем возможность перетаскивания круга.
              draggable: true,
              // Цвет заливки.
              // Последний байт (77) определяет прозрачность.
              // Прозрачность заливки также можно задать используя опцию "fillOpacity".
              fillColor: "#FFA50060",
              // Цвет обводки.
              strokeColor: "#FFA500",
              // Прозрачность обводки.
              strokeOpacity: 0.8,
              // Ширина обводки в пикселях.
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

        // Слушаем событие окончания перетаскивания на метке.
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
        // myMap.geoObjects.add(currentPlaceMark); // ставим точку на нашу карту
        myMap.controls.add("zoomControl");
      });
  }

  return (
    <div>
      <div className={style.border} >
        <div className={style.map} id="map"></div>
      </div>

      <div className={style.text}>
        <h2>Центральная точка радиуса </h2>
        <p>{address}</p>
      </div>
    </div>
  );
}

export default MapSetCircle;
