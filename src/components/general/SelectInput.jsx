import "./general.css";

function SelectInput({ label, options = [], className = "", value, setValue }) {
  function handleSelect(e) {
    setValue(e.target.value);
  }

  return (
    <div className={`field ${className}`}>
      {label && <label className="select-label">{label}</label>}

      <div className="select-wrap">
        <select className="select" value={value} onChange={handleSelect}>
          {options.map((opt, idx) => {
            if (typeof opt === "string") {
              return (
                <option value={opt} key={`${opt}-${idx}`}>
                  {opt}
                </option>
              );
            }

            return (
              <option value={opt.value} key={`${opt.value}-${idx}`} disabled={Boolean(opt.disabled)}>
                {opt.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default SelectInput;