import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./general.css";

function Button({ label, className = "", onClick, icon, type = "button", disabled = false }) {
  function handleClick(event) {
    if (onClick) {
      onClick(event);
    }
  }

  return (
    <button type={type} className={`button ${disabled ? "button-disabled" : ""} ${className}`} onClick={handleClick} disabled={disabled}>
      {icon && (
        <span className="button-icon" aria-hidden="true">
          <FontAwesomeIcon icon={icon} />
        </span>
      )}

      <span>{label}</span>
    </button>
  );
}

export default Button;
