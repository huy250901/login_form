import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import LoginForm from "./modules/auth/components/LoginForm";
import Home from "./modules/Home/Pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        {/* <div className="App"></div> */}
      </Routes>
    </Router>
  );
}

export default App;
