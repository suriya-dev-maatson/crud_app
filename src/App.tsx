import React from "react";
import "../index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import ListUser from "./pages/ListUser";
import ViewUser from "./pages/ViewUser";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/update/:id" element={<CreateUser />} />
        <Route path="/listuser" element={<ListUser />} />
        <Route path="/viewuser/:id" element={<ViewUser />} />
      </Routes>
    </Router>
  );
};

export default App;
