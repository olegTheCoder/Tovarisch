import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListItem from "../ListItem/ListItem";
import style from "./style.module.css";

function MapInCircle() {
  const allIncidents = useSelector((state) => state.incidents);
  let myRadius = useSelector((state) => state.radius);
  const allNearbyIncidents = useSelector(
    (state) => state.nearby.nearbyIncidents
  );
  let ymaps = window.ymaps;
  const [mathchedIncidents, setMathchedIncidents] = useState([]);
  useEffect(() => {
    document.querySelector("#map").innerHTML = "";
    ymaps.ready(init);
  }, []);

  function makeRadius(coord = [55.752175, 37.619509], radius = 0) {
    return new ymaps.Circle([[coord[0], coord[1]], radius], null, {
      draggable: false,
    });
  }

  function init() {
    let isIncidentsMatch = [];
    console.log(allIncidents);

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
      circle = makeRadius(myRadius.currentPoint.coords, myRadius.radiusMetr);

    myMap.geoObjects.add(circle);
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

  return (
    <>
      <div id="map" style={{ width: "0px", height: "0px" }}></div>
      {mathchedIncidents.length ? (
        <div>
          <h2>События, произошедшие в зоне "{myRadius.inputTitle}":</h2>
          <ul className={style.list}>
            {mathchedIncidents.map((el, index) => (
              <ListItem key={el.id} index={index} {...el} />
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}

      {allNearbyIncidents.length ? (
        <div>
          <h2>События, произошедшие рядом:</h2>
          <div className={style.input}>
            <ul>
              {allNearbyIncidents.map((el, index) => (
                <ListItem key={el.id} index={index} {...el} />
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default MapInCircle;
