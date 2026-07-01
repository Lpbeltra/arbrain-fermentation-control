import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Beer from "./pages/Beer/Beer";
import Tank from "./pages/Tank/Tank";
import Fermentation from "./pages/Fermentation/Fermentation";
import BatchHistory from "./pages/BatchHistory/BatchHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/beers" element={<Beer />} />
          <Route path="/tanks" element={<Tank />} />
          <Route path="/fermentation" element={<Fermentation />} />
          <Route path="/batch-history" element={<BatchHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;