import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import "./App.css";
import LoginForm from "./modules/auth/components/LoginForm";
import Home from "./modules/Home/Pages/Home";
import Register from "./modules/Home/Pages/Register";
import Nav from "./modules/auth/components/Nav";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        {/* <div className="App"></div> */}
      </Routes>
    </Router>
  );
}

export default App;
