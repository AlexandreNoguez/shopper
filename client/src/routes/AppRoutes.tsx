import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import GoogleMapView from "../pages/GoogleMapView";
import RidesHistory from "../pages/RidesHistory";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/viagens" element={<GoogleMapView />} />
      <Route path="/busca" element={<RidesHistory />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
