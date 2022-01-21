import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./style.module.css";
import { addNewIncident } from "../../redux/actions/incidentActions";
import { getIncidents } from "../../redux/actions/incidentActions";
import { useNavigate } from "react-router-dom"

function FormAddIncident() {
  const currentPoint = useSelector((state) => state.cords);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  dispatch(getIncidents());
  const upload = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const newIncident = {
      // userId: id.id,
      title: inputTitle,
      description: inputDescription,
      category,
      address: currentPoint.textAddress,
      coords: currentPoint.coords,
      img: upload.current.value,
    };
    dispatch(addNewIncident(newIncident, upload.current.files[0]));
    dispatch(getIncidents());
    navigate('/mapAllIncidents') 
  }

  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [category, setCategory] = useState("1");
  const [image, setImage] = useState(null);
  const [reader] = useState(new FileReader());

  function handleTitle(e) {
    setInputTitle(e.target.value);
  }

  function handleDescription(e) {
    setInputDescription(e.target.value);
  }

  function handleCategory(e) {
    setCategory(e.target.value);
  }

  function imageHandler() {
    reader.readAsDataURL(upload.current.files[0]);
    reader.addEventListener("load", function () {
      setImage(reader.result);
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={style.form}>
        <h2>Название события</h2>
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
        <label htmlFor="file">Добавить фото</label>
        <input
          type="file"
          name="file"
          id="file"
          ref={upload}
          onChange={imageHandler}
        />
        {image && <img src={image} className={style.img} />}

        <br />
        <button className={style.mt} type="submit">
          Отправить
        </button>
      </form>
    </div>
  );
}

export default FormAddIncident;
