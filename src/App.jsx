import { BrowserRouter, Route, Routes } from "react-router-dom"; // Fixed import
import HomePage from "../src/pages/HomePage/HomePage"; // Correct import for HomePage
import ClassListPage from "./pages/ClassListPage/ClassListPage";
import ClassPage from "./pages/ClassPage/ClassPage";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/classes" element={<ClassListPage />} />
        <Route path="/classes/:id" element={<ClassPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
