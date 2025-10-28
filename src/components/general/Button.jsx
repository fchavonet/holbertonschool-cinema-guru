import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./general.css";

function Button({ label, className = "", onClick, icon, type = "button", disabled = false, }) {
  function handleClick(event) {
    if (onClick) {
      onClick(event);
    }
  }

  return (
    <button
      className={`button ${disabled ? "button-disabled" : ""} ${className}`}
      type={type}
      onClick={handleClick}
      disabled={disabled}
    >
      {icon && (
        <span className="button-icon" aria-hidden="true">
          <FontAwesomeIcon icon={icon} />
        </span>
      )}

      {label && <span className="button-label">{label}</span>}
    </button>
  );
}

export default Button;
