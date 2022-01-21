import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import ListItem from '../ListItem/ListItem'
import style from './style.module.css'

function MapInCircle() {
    const allIncidents = useSelector((state) => state.incidents)
    let myRadius = useSelector((state) => state.radius)
    const allNearbyIncidents = useSelector((state) => state.nearby.nearbyIncidents)
    // console.log(myRadius)
    let ymaps = window.ymaps
    const [mathchedIncidents, setMathchedIncidents] = useState([])
    useEffect(() => {
        document.querySelector('#map').innerHTML = ''
        ymaps.ready(init)
    }, [])


    function makeRadius(coord = [55.752175, 37.619509], radius = 0) {
        return new ymaps.Circle([[coord[0], coord[1]], radius], null, {
            draggable: false,
        })
    } //Функция, создающая кастомный радиус для прослушиваний событий

    function init() {
        let isIncidentsMatch = [] // массив для запушивания в него всех событий с целью дальнейшей проверки
        console.log(allIncidents)

        let arr = []

        function createArr() {
            for (let i = 0; i < allIncidents.length; i++) {
                let newPoint = {
                    type: 'Point',
                    iconContent: 'Москва',
                    coordinates: [allIncidents[i].coords[0], allIncidents[i].coords[1]],
                }
                isIncidentsMatch.push(newPoint)
            }
        }

        // функция, распаршивающая все события в подходящий для проверки вид
        createArr()
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
                'map',
                {
                    center: [55.43, 37.75],
                    zoom: 8,
                },
                {
                    searchControlProvider: 'yandex#search',
                }
            ),
            objects = ymaps.geoQuery(isIncidentsMatch).addToMap(myMap),
            // [55.43, 37.7]

            // circle = new ymaps.Circle([[55.10, 37.50], 10000], null, { draggable: false });

            circle = makeRadius(myRadius.currentPoint.coords, myRadius.radiusMetr)

        myMap.geoObjects.add(circle)
        // Объекты, попадающие в круг, будут становиться красными.
        let objectsInsideCircle = objects.searchInside(circle)

        objectsInsideCircle.each(function (element) {
            arr.push(element.geometry.getCoordinates())
        })

        arr.forEach((el) => {
            allIncidents.find((el1) => {
                if (el1.coords[0] === el[0] && el1.coords[1] === el[1]) {
                    setMathchedIncidents((prev) => [...prev, el1])
                }
            })
        })
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
            <div id="map" style={{width: '0px', height: '0px'}}></div>
            {mathchedIncidents.length ? (
                <div>
                    <h2>События, произошедшие в зоне {myRadius.inputTitle}</h2>
                    <ul>
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
                    <h2>События, произошедшие рядом</h2>
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

            {/* <div>{mathchedIncidents[0].title}</div> */}
        </>
    )
}

export default MapInCircle
