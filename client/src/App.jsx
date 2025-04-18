import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Students from "./pages/Students";

function App() {
  return (
    <>
      <div className="bg-[#f8f8fd] flex flex-col md:flex-row">
        {/* <Sidebar />
        <Home /> */}
        <Students />
      </div>
    </>
  );
}

export default App;
