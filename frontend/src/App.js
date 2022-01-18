import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import MapAllPage from "./pages/MapAllPage/MapAllPage";
import MapSetPointPage from "./pages/MapSetPointPage/MapSetPointPage";
import SetCirclePage from "./pages/SetCirclePage/SetCirclePage";
import Incident from "./components/Incident/Incident";
import MapInCircle from "./components/MapInCircle/MapInCircle";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<MapAllPage />} />
        <Route path="/mapAllIncidents" element={<MapAllPage />} />
        <Route path="/mapSetPoint" element={<MapSetPointPage />} />
        <Route path="/mapSetCircle" element={<SetCirclePage />} />
        <Route path="/incident/:id" element={<Incident />} />
        <Route path="/mapCircle" element={<MapInCircle />} />
      </Routes>
    </>
  );
}

export default App;
