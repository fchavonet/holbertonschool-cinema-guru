import Button from "../../components/general/Button";

function Dashboard({ userUsername, setIsLoggedIn }) {
  function handleLogout() {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        {userUsername}

        <Button
          label="Logout"
          className="logout-btn"
          onClick={handleLogout}
        />
      </header>
    </div>
  );
}

export default Dashboard;
