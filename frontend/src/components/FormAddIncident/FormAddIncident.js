import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./style.module.css";
import { addNewIncident } from "../../redux/actions/incidentActions";
import { getIncidents } from "../../redux/actions/incidentActions";

function FormAddIncident() {
  const currentPoint = useSelector((state) => state.cords);
  const dispatch = useDispatch();
  dispatch(getIncidents());

  function handleSubmit(e) {
    e.preventDefault();
    const newIncident = {
      id: 10,
      title: inputTitle,
      description: inputDescription,
      category,
      address: currentPoint.textAddress,
      coords: currentPoint.coords,
    };

    dispatch(addNewIncident(newIncident));
  }

  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [category, setCategory] = useState("1");

  function handleTitle(e) {
    setInputTitle(e.target.value);
  }

  function handleDescription(e) {
    setInputDescription(e.target.value);
  }

  function handleCategory(e) {
    setCategory(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={style.form}>
        <h2>Тема</h2>
        <input
          onChange={handleTitle}
          type="text"
          value={inputTitle}
          name="theme"
          aria-describedby="text"
        />

        <h2 className={style.mt}>Описание</h2>

        <input
          onChange={handleDescription}
          type="text"
          value={inputDescription}
          name="desc"
          aria-describedby="text"
        />
        <br />
        <select value={category} onChange={handleCategory} className={style.mt}>
          <option selected>Выберите категорию</option>
          <option value="criminal">Криминал</option>
          <option value="nature">Природа</option>
          <option value="tech">Техногенные происшествия</option>
        </select>
        <br />
        <br />
        <div className="mb-3">
          <h5 className="card-title">Выберите файл для загрузки</h5>
          <label forhtml="upload" className="form-label">
            Выбрать файл
          </label>
          <input
            type="file"
            className="form-control"
            id="upload"
            name="upload"
          />
        </div>

        <br />
        <button className={style.mt} type="submit">
          Отправить
        </button>
      </form>
    </div>
  );
}

export default FormAddIncident;
