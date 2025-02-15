import "./App.css";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Nabar";
import Hiring from "./components/Hiring";
import Client from "./components/Client"; 
import About from "./components/About";
import ForgetPassword from "./components/ForgetPassword";
import PasswordValidation from "./components/PasswordValidation";
import FrelancerDashBorad from "./components/Freelancer/Freelancerdashborad";
import ClientDashboard from "./components/Clientdash/ClientDashboard";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />{" "}
        {/* Home route goes to Login */}
        <Route path="/RegisterForm" element={<Register />} />{" "}
        {/* freelancer route */}
        <Route path="/hiring" element={<Hiring />}></Route>
        <Route path="/client" element={<Client />}></Route>
        <Route path="/about" element={<About />} />
        <Route path="/freelancerdashboard" element={<FrelancerDashBorad />} />
        <Route path="/clientdashboard" element={<ClientDashboard />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/PasswordValidation" element={<PasswordValidation />} />
      </Routes>
    </Router>
  );
}

export default App;
