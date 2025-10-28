import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/general/Button";

import "./navigation.css";

function Header({ userUsername, setIsLoggedIn }) {
    function handleLogout() {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
    }

    return (
        <header>
            <h1 className="header-title">Cinema Guru</h1>

            <nav className="header-nav">
                <img className="user-avatar" src="https://picsum.photos/100/100" alt="User avatar" />
                <p>Welcome, {userUsername}!</p>

                <div className="logout-container">
                    <FontAwesomeIcon icon={faRightFromBracket} />

                    <Button
                        label="Logout"
                        className="logout-btn"
                        onClick={handleLogout}
                    />
                </div>
            </nav>
        </header>
    );
}

export default Header;
