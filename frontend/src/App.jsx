import { useContext, useEffect, useState } from "react";
import "./App.css";
import HomeBanner from "./components/HomeBanner";
import { Navbar } from "./components";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import UpcomingRace from "./components/UpcomingRace";
import RaceDetail from "./pages/RaceDetail/RaceDetail";
import Modal from "react-modal";
import "react-dropdown/style.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RapidAPIConnect from "./components/RapidAPIConnect";
import Integration from "./pages/Integration/Integration";
import local_storageService from "./services/local_storage.service";
import { setupAxiosInterceptors } from "./services/interceptor";
import { useDispatch } from "react-redux";
import { setToken, setUserData } from "./store/slices/auth";

Modal.setAppElement("#root");
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  setupAxiosInterceptors(() => {
    local_storageService.removeStorageData();
    dispatch(setUserData({}));
    dispatch(setToken(null));
    navigate("/");
  });

  const fetchInitialData = async () => {
    const user = await local_storageService.getUser();
    dispatch(setUserData(user));
    const token = await local_storageService.getAccessToken();
    dispatch(setToken(token));
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/race/:id" element={<RaceDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/integration" element={<Integration />} />

        {/* 👇️ MUST BE SPECIFIED LAST IN THE LIST OF ROUTE components 👇️ */}
        <Route path="*" element={<MatchAllRoute />} />
      </Routes>
    </>
  );
}

function Home() {
  return (
    <>
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <HomeBanner />
      </div>
      <RapidAPIConnect />
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
