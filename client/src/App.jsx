import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <div className="bg-[#f8f8fd] flex flex-col md:flex-row">
        <Sidebar />
        <Home />
      </div>
    </>
  );
}

export default App;
