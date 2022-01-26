import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNearbyIncidents } from "../../redux/actions/nearbyActions";

function AccidentNearby() {
  const userPoint = useSelector((state) => state.nearby.userPosition);
  const allIncidents = useSelector((state) => state.incidents);
  const [nearbyAccident, setNearbyAccident] = useState([]);
  const dispatch = useDispatch();
  const gpscoord = useSelector((state) => state.nearby.userCords);
  let ymaps = window.ymaps;

  useEffect(() => {
    dispatch(getNearbyIncidents(nearbyAccident));
  }, [nearbyAccident]);

  let navigate = useNavigate();

  function makeRadius(coord = [gpscoord[0], gpscoord[1]], radius = 1000) {
    return new ymaps.Circle([[coord[0], coord[1]], radius], null, {
      draggable: false,
    });
  }

  useEffect(() => {
    document.querySelector("#map-2").innerHTML = "";
    ymaps.ready(init);
  }, []);

  function init() {
    let isIncidentsMatch = [];
    let incidentNearby = [];

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

    let myMap2 = new ymaps.Map(
        "map-2",
        {
          center: [55.43, 37.75],
          zoom: 8,
        },
        {
          searchControlProvider: "yandex#search",
        }
      ),
      objects = ymaps.geoQuery(isIncidentsMatch).addToMap(myMap2),
      circle = makeRadius(gpscoord, 2000);

    myMap2.geoObjects.add(circle);
    let objectsInsideCircle = objects.searchInside(circle);

    objectsInsideCircle.each(function (element) {
      arr.push(element.geometry.getCoordinates());
    });

    arr.forEach((el) => {
      allIncidents.find((el1) => {
        if (el1.coords[0] === el[0] && el1.coords[1] === el[1]) {
          incidentNearby.push(el1);
        }
      });
    });
    setNearbyAccident(incidentNearby);
  }
  return <div id="map-2" style={{ width: "0px", height: "0px" }}></div>;
}

export default AccidentNearby;
