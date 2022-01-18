import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListItem from "../ListItem/ListItem";

function MapInCircle() {
  const allIncidents = useSelector((state) => state.incidents);
  let ymaps = window.ymaps;
  const [mathchedIncidents, setMathchedIncidents] = useState([]);
  useEffect(() => {
    document.querySelector("#map").innerHTML = "";
    ymaps.ready(init);
  }, []);

  function init() {
    let isIncidentsMatch = [];

    let arr = [];
    function createArr() {
      for (let i = 0; i < allIncidents.length; i++) {
        let newPoint = {
          type: "Point",
          iconContent: "Москва",
          coordinates: [allIncidents[i].coords[0], allIncidents[i].coords[1]],
        };
        isIncidentsMatch.push(newPoint);
      }
    }

    createArr();
    // let a = [
    //   {
    //     type: 'Point',
    //     iconContent: 'Москва',
    //     coordinates: [55.73, 37.75]
    //   },
    //   {
    //     type: 'Point',
    //     coordinates: [55.10, 37.45]
    //   },
    //   {
    //     type: 'Point',
    //     coordinates: [55.25, 37.35]
    //   }
    // ]

    let myMap = new ymaps.Map(
        "map",
        {
          center: [55.43, 37.75],
          zoom: 8,
        },
        {
          searchControlProvider: "yandex#search",
        }
      ),
      objects = ymaps.geoQuery(isIncidentsMatch).addToMap(myMap),
      // [55.43, 37.7]

      // circle = new ymaps.Circle([[55.10, 37.50], 10000], null, { draggable: false });

      circle = new ymaps.Circle([[55.75973, 37.627511], 1500], null, {
        draggable: false,
      });
    myMap.geoObjects.add(circle);
    // Объекты, попадающие в круг, будут становиться красными.
    let objectsInsideCircle = objects.searchInside(circle);

    objectsInsideCircle.each(function (element) {
      arr.push(element.geometry.getCoordinates());
    });

    arr.forEach((el) => {
      allIncidents.find((el1) => {
        if (el1.coords[0] === el[0] && el1.coords[1] === el[1]) {
          setMathchedIncidents((prev) => [...prev, el1]);
        }
      });
    });
  }

  // function init() {
  //   var myMap = new ymaps.Map("map", {
  //     center: [55.43, 37.75],
  //     zoom: 8
  //   }, {
  //     searchControlProvider: 'yandex#search'
  //   }),

  //     circle = new ymaps.Circle([[30, 42], 5000]);
  //   //Добавление круга на карту.
  //   myMap.geoObjects.add(circle);
  //   // Формирование источника данных.
  //   let objects = [
  //     new ymaps.Placemark([34, 56]),
  //     new ymaps.Rectangle([[34, 56], [36, 57]]),
  //     circle
  //   ],
  //     // Формирование выборки.
  //     storage = ymaps.geoQuery(objects);

  //     useEffect(() => {
  //       ymaps.ready(init)}, [])

  return (
    <>
      <div id="map" style={{ width: "500px", height: "500px" }}></div>
      {mathchedIncidents.length ? (
        <div>
          <h2>События, произошедшие в отслеживаемой зоне</h2>
          <ul>
            {mathchedIncidents.map((el, index) => (
              <ListItem key={el.id} index={index} {...el} />
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}

      {/* <div>{mathchedIncidents[0].title}</div> */}
    </>
  );
}

export default MapInCircle;
