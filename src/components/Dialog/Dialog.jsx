import "./Dialog.css";

const Dialog = ({ open = false, title, children, onClose }) => {
  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="dialog__header">
          <h2 id="dialog-title" className="dialog__title">
            {title}
          </h2>

          <button
            type="button"
            className="dialog__close"
            onClick={onClose}
            aria-label="Cerrar diálogo"
          >
            ×
          </button>
        </div>

        <div className="dialog__content">{children}</div>
      </div>
    </div>
  );
};

export default Dialog;