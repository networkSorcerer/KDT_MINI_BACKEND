import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Login from "./pages/signup/Login";
import Signup from "./pages/signup/Signup";
import AdminHome from "./pages/admin/AdminHome";
import Address from "./pages/signup/address";
import DragAndDropExample from "./pages/admin/HtmlDrag.js";
import DragAndDropWithReactDnd from "./pages/admin/DragReact.js";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/address" element={<Address />} />
          <Route path="/drag" element={<DragAndDropExample />} />
          <Route path="/drop" element={<DragAndDropWithReactDnd />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
