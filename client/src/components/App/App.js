import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage'
import AuthorizationPage from '../../pages/AuthorizationPage/AuthorizationPage'
import { useEffect } from 'react'
import { loadUser } from '../../redux/actions/authActions'
import Navbar from "../Navbar/Navbar";
import MapAllPage from "../../pages/MapAllPage/MapAllPage";
import MapSetPointPage from "../../pages/MapSetPointPage/MapSetPointPage";
import SetCirclePage from "../../pages/SetCirclePage/SetCirclePage";
import Incident from "../Incident/Incident";
import MapInCircle from "../MapInCircle/MapInCircle";
import style from './style.module.css'
import { getIncidents } from '../../redux/actions/incidentActions'
import { getRadiusFromBack } from '../../redux/actions/radiusActions'

function App() {
  const userID = useSelector((state) => state.auth.id)
  const dispatch = useDispatch()
   
    useEffect(() => {
    if (userID) {
      console.log('Падает сюда')
      dispatch(getRadiusFromBack(userID))
    }   
    }, [userID])
  
  

  useEffect(() => {
    dispatch(getIncidents())
  }, [])

	useEffect(() => {
    
		dispatch(loadUser())
	}, [dispatch])

	return (

	<div className={style.abc}>
	<Navbar />
      <Routes>
        <Route path="/mapAllIncidents" element={<MapAllPage />} />
        <Route path="/mapSetPoint" element={<MapSetPointPage />} />
        <Route path="/mapSetCircle" element={<SetCirclePage />} />
        <Route path="/incident/:id" element={<Incident />} />
        <Route path="/mapCircle" element={<MapInCircle />} />
				<Route path='/signin' element={<AuthorizationPage />} />
				<Route path='/signup' element={<RegistrationPage />} />
				<Route path='/signout' />
      </Routes>
			</div>
  );
}

export default App;
