import "./Input.css";

const Input = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
  disabled = false,
  name,
}) => {
  return (
    <div className="input-group">
      {label && (
        <label className="input-group__label" htmlFor={id}>
          {label}
        </label>
      )}

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`input-group__field ${error ? "input-group__field--error" : ""}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />

      {error && (
        <span id={`${id}-error`} className="input-group__error">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;