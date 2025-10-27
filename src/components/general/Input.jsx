import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Input({ label, type = "text", className = "", value, setValue, icon, inputAttributes = {} }) {
  function handleInput(event) {
    setValue(event.target.value);
  }

  return (
    <div className={`field ${className}`}>
      <div className="label-wrap">
        {icon && (
          <span className="input-icon" aria-hidden="true">
            <FontAwesomeIcon icon={icon} />
          </span>
        )}

        {label && <label className="label">{label}</label>}
      </div>

      <input className="input" type={type} value={value} onChange={handleInput} {...inputAttributes} />
    </div>
  );
}

export default Input;