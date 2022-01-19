import FormAddIncident from "../../components/FormAddIncident/FormAddIncident";
import MapSetPoint from "../../components/MapSetPoint/MapSetPoint";
import style from "./style.module.css";

function MapSetPointPage() {
  return (
    <div >
      <h1 className={style.text}>Создайте свой пост с происшествием</h1>
      <div className={style.pageForm}>
        <FormAddIncident />
        <MapSetPoint />
      </div>
    </div>
  );
}

export default MapSetPointPage;
