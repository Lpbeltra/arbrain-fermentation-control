import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";

function PlaceholderPage({ title }: { title: string }) {
  return <h1>{title}</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/beers" element={<PlaceholderPage title="Beers" />} />
          <Route path="/tanks" element={<PlaceholderPage title="Tanks" />} />
          <Route path="/fermentation" element={<PlaceholderPage title="Fermentation" />} />
          <Route path="/batch-history" element={<PlaceholderPage title="Batch History" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;