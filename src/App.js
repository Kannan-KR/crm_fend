import "./App.css";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Users from "./components/Users";
import EditUsers from "./components/EditUsers";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/edit-users/:userId" element={<EditUsers />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
