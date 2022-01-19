import { useEffect, useState } from "react";
// import style from "./style.module.css";
import { getCords } from "../../redux/actions/cordsActions";
import { useDispatch, useSelector } from "react-redux";
// import { mockDB } from "../../../src/mockDB";
import { useNavigate } from "react-router-dom";
import { getIncidents } from "../../redux/actions/incidentActions";
import {userPosition, getNearbyIncidents} from "../../redux/actions/nearbyActions"

function AccidentNearby() {
  const userPoint = useSelector((state) => state.nearby.userPosition);
  const allIncidents = useSelector((state) => state.incidents);
  const [nearbyAccident, setNearbyAccident] = useState([])
  const dispatch = useDispatch();
  // dispatch(getIncidents());
  const gpscoord = useSelector((state) => state.nearby.userCords)
  let ymaps = window.ymaps;

  useEffect(() => {
    dispatch(getNearbyIncidents(nearbyAccident))
    
  }, [nearbyAccident])
  
  let navigate = useNavigate();

  function makeRadius(coord = [gpscoord[0], gpscoord[1]], radius = 1000) {
    return new ymaps.Circle([[coord[0], coord[1]], radius], null, {
      draggable: false,
    })
  } 

  useEffect(() => {
    document.querySelector("#map-2").innerHTML = "";
    ymaps.ready(init);
  }, []);

  function init() {
    let isIncidentsMatch = []; // массив для запушивания в него всех событий с целью дальнейшей проверки 
    let incidentNearby = []
    
        
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
    // функция, распаршивающая все события в подходящий для проверки вид  
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
        // [55.43, 37.7]
  
        // circle = new ymaps.Circle([[55.10, 37.50], 10000], null, { draggable: false });
  
        circle = makeRadius(gpscoord, 2000)
  
        myMap2.geoObjects.add(circle);
      // Объекты, попадающие в круг, будут становиться красными.
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
      setNearbyAccident(incidentNearby)

    }
    return (
    
        <div id="map-2" style={{ width: "0px", height: "0px" }}></div>
        
    );
  }
  

      export default AccidentNearby
