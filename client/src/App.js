import "./App.css";
import AddFood from "./AddFood.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AddFood />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
