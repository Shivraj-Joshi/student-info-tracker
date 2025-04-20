import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import Events from "./pages/Events";
import Home from "./pages/Home";
import Rank from "./pages/Rank";
import Students from "./pages/Students";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/events" element={<Events />} />
          <Route path="/classranking" element={<Rank />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
