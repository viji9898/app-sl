import "./App.css";
import MapView from "./MapView";

function App() {
  return (
    <div className="page">
      {/* LEFT: MAP */}
      <div className="map-wrapper">
        {/* Swap this iframe for a proper map component later if you want */}
        <div className="map-wrapper">
          <MapView />
        </div>
      </div>
    </div>
  );
}

export default App;
