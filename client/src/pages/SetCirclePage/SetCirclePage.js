import FormRadius from '../../components/FormRadius/FormRadius'
import MapSetCircle from '../../components/MapSetCircle/MapSetCircle'
import style from './style.module.css'

function SetCirclePage() {
  return (
    <div className={style.formRadiusWrapper}>
      <MapSetCircle />
      <FormRadius/>
    </div>
  )
}

export default SetCirclePage

