import { useWebSocket } from "./hooks/useWebSocket";
import DriverList from "./components/DriverList/DriverList";
import MapView from "./components/MapView/MapView";

const App = () => {
  // load websocket on app start, it will dispatch actions to update the store
  useWebSocket();

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "25%",
          borderRight: "1px solid #ddd",
          overflowY: "auto",
          flexShrink: 0,
        }}
      >
        <DriverList />
      </div>
      <div style={{ flex: 1, height: "100%" }}>
        <MapView />
      </div>
    </div>
  );
};

export default App;
