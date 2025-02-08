import { BrowserRouter, Route, Routes } from "react-router-dom"; // Fixed import
import HomePage from "../src/pages/HomePage/HomePage"; // Correct import for HomePage
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
