import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./style.module.css";
import { setRadius } from "../../redux/actions/radiusActions";
import { setRadiusAndSendOnServer} from "../../redux/actions/radiusActions";

function FormRadius() {
  const currentPoint = useSelector((state) => state.cords);
  // const id = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [inputTitle, setInputTitle] = useState("");
  const [inputRadius, setInputRadius] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    let radiusMetr = Number(inputRadius) * 1000
    const newZone = {inputTitle, radiusMetr, currentPoint};
    
    console.log(newZone, 'handleSubmit');
    dispatch(setRadius(newZone));

    dispatch(setRadiusAndSendOnServer(newZone));
   
  }


  function handleTitle(e) {
    setInputTitle(e.target.value);
  }

  function handleRadius(e) {
    setInputRadius(e.target.value);
    const newZone = {inputTitle, inputRadius, currentPoint};
    dispatch(setRadius(newZone));
  }

  

  return (
    <div className={style.form}>

      <form onSubmit={handleSubmit} className={style.form}>
        <h2>Название зоны</h2>
        <input 
          onChange={handleTitle}
          type="text"
          value={inputTitle}
          name='zone'
          aria-describedby="text"
        />
       
        <h2 className={style.mt}>Установите радиус</h2>
        


<input type="range" onChange={handleRadius} value={inputRadius} name='radius' className="form-range" min="1" max="15" id="customRange2"/>
        <br/>
        
        <button className={style.mt} type="submit">Отправить</button>
      </form>
    </div>
  );
}

export default FormRadius;
