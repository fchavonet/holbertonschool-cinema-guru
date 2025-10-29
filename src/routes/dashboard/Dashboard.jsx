import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../../components/navigation/Header";
import SideBar from "../../components/navigation/SideBar";

import HomePage from "./HomePage";
import Favorites from "./Favorites";
import WatchLater from "./WatchLater";

import "./dashboard.css";

function Dashboard({ userUsername, setIsLoggedIn }) {
  return (
    <div className="dashboard-container">
      <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />

      <main className="dashboard-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watchlater" element={<WatchLater />} />
        </Routes>
      </main>

      <SideBar userUsername={userUsername} />
    </div>
  );
}

export default Dashboard;
