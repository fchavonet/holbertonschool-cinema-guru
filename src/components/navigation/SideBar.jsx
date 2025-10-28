import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faFolder, faStar, faClock } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

import Button from "../../components/general/Button";
import Activity from "../Activity";

import "./navigation.css";

function SideBar({ userUsername }) {
  const [selected, setSelected] = useState("home");
  const [expanded, setExpanded] = useState(false);
  const [activities, setActivities] = useState([]);
  const [showActivities, setShowActivities] = useState(false);

  const navigate = useNavigate();

  function setPage(pageName) {
    setSelected(pageName);

    if (pageName === "home") navigate("/home");
    else if (pageName === "favorites") navigate("/favorites");
    else if (pageName === "watchlater") navigate("/watchlater");
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    axios
      .get("http://localhost:8000/api/activity", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const filtered = res.data.filter(
          (a) => a.user?.username === userUsername
        );
        setActivities(filtered);
      })
      .catch((error) => console.error(error));
  }, [userUsername]);

  useEffect(() => {
    let timer;

    if (expanded) {
      timer = setTimeout(() => setShowActivities(true), 300);
    } else {
      setShowActivities(false);
    }

    return () => clearTimeout(timer);
  }, [expanded]);

  return (
    <nav className={`sidebar ${expanded ? "expanded" : ""}`} onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)}>
      <ul className="sidebar-nav">
        <li>
          <Button
            className={`sidebar-btn ${selected === "home" ? "active" : ""}`}
            label="Home"
            icon={faFolder}
            onClick={() => setPage("home")}
          />
        </li>

        <li>
          <Button
            className={`sidebar-btn ${selected === "favorites" ? "active" : ""}`}
            label="Favorites"
            icon={faStar}
            onClick={() => setPage("favorites")}
          />
        </li>
        
        <li>
          <Button
            className={`sidebar-btn ${selected === "watchlater" ? "active" : ""}`}
            label="Watch Later"
            icon={faClock}
            onClick={() => setPage("watchlater")}
          />
        </li>
      </ul>

      {showActivities && activities.length > 0 && (
        <ul className="sidebar-activities fade-in">
          <li className="activities-title">
            Latest Activities
          </li>

          {activities.slice(0, 10).map((a) => (
            <Activity key={a.id} activity={a} />
          ))}
        </ul>
      )}
    </nav>
  );
}

export default SideBar;
