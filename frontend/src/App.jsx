import { useState } from "react";
import "./App.css";
import HomeBanner from "./components/HomeBanner";
import { Navbar } from "./components";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import UpcomingRace from "./components/UpcomingRace";
import RaceDetail from "./pages/RaceDetail/RaceDetail";

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="/race" element={<RaceDetail />} />

          {/* 👇️ MUST BE SPECIFIED LAST IN THE LIST OF ROUTE components 👇️ */}
          <Route path="*" element={<MatchAllRoute />} />
        </Routes>
      </div>
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
