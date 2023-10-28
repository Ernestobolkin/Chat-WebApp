// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/nav-bar-component/NavBar";
import './App.css'
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import RegisterComponent from "./components/register-component/RegisterComponent";
import Login from "./components/login-component/Login";
import PostListComponent from "./components/posts/post";


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<PostListComponent/>} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App
