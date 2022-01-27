import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import style from "./style.module.css";
import Comment from "../Comment/Comment";
const { REACT_APP_API_URL } = process.env;

function Incident() {
  const { id } = useParams();
  const allIncidents = useSelector((state) => state.incidents);
  const accident = allIncidents.find((el) => el.id === Number(id));

  return (
    <div className={style.windowForm}>
      <>
        <div className={style.detailBox}>
          <div className={style.boxInfo}>
            <h2>Заголовок события: {accident.title}</h2>
            <h3>Описание события: {accident.description}</h3>
            <h3>Тип события: {accident.category}</h3>
            <img
              src={`${REACT_APP_API_URL}/uploads/${accident.img}`}
              alt={accident.title}
              className={style.img}
            />
          </div>
        </div>
        <div className={style.comment}>
          <Comment id={id} accident={accident} />
        </div>
      </>
    </div>
  );
}

export default Incident;
