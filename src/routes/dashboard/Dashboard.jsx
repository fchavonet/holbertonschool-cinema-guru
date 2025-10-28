import SideBar from "../../components/navigation/SideBar";
import Header from "../../components/navigation/Header";

import "./dashboard.css";

function Dashboard({ userUsername, setIsLoggedIn }) {
  return (
    <div className="dashboard-container">
      <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
      <SideBar userUsername={userUsername} />
    </div>
  );
}

export default Dashboard;
