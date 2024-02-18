import { useState } from "react";
import "./App.css";
import HomeBanner from "./components/HomeBanner";
import { Navbar } from "./components";
import {
  BrowserRouter as Router,
  Route,
  useLocation,
  Routes,
} from "react-router-dom";
import UpcomingRace from "./components/UpcomingRace";
import RaceDetail from "./pages/RaceDetail/RaceDetail";
import Modal from "react-modal";
import "react-dropdown/style.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

Modal.setAppElement("#root");
function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/race" element={<RaceDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 👇️ MUST BE SPECIFIED LAST IN THE LIST OF ROUTE components 👇️ */}
        <Route path="*" element={<MatchAllRoute />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <>
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <HomeBanner />
      </div>

      <UpcomingRace />
    </>
  );
}

function About() {
  return <h2 className="mt-20">About</h2>;
}

function MatchAllRoute() {
  return <h2>The requested page does not exist</h2>;
}

export default App;
