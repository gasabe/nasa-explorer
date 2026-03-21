import "./Snackbar.css";

const Snackbar = ({ message, type = "info", isVisible = false }) => {
  if (!isVisible || !message) return null;

  return (
    <div className={`snackbar snackbar--${type}`} role="alert" aria-live="assertive">
      {message}
    </div>
  );
};

export default Snackbar;