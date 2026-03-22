import { useState } from "react";
import "./MediaCard.css";

function MediaCard({ title, subtitle, description, mediaUrl, mediaType }) {
  const [isOpen, setIsOpen] = useState(false);

  const renderMedia = (expanded = false) => {
    if (!mediaUrl) {
      return (
        <div className="media-card__fallback">
          <p>Sin contenido disponible</p>
        </div>
      );
    }

    if (mediaType === "video") {
      return (
        <iframe
          src={mediaUrl}
          title={title}
          className={
            expanded
              ? "media-card__media media-card__media--expanded media-card__media--video"
              : "media-card__media media-card__media--video"
          }
          allowFullScreen
        />
      );
    }

    return (
      <img
        src={mediaUrl}
        alt={title}
        className={
          expanded
            ? "media-card__media media-card__media--expanded"
            : "media-card__media"
        }
      />
    );
  };

  return (
    <>
      <article className="media-card">
        <button
          type="button"
          className="media-card__visual"
          onClick={() => setIsOpen(true)}
          aria-label={`Expandir contenido de ${title}`}
        >
          {renderMedia()}
          <span className="media-card__overlay">Click para expandir</span>
        </button>

        <div className="media-card__content">
          {subtitle && <p className="media-card__subtitle">{subtitle}</p>}
          <h2 className="media-card__title">{title}</h2>
          {description && (
            <p className="media-card__description">{description}</p>
          )}
        </div>
      </article>

      {isOpen && (
        <div className="media-card-modal" onClick={() => setIsOpen(false)}>
          <div
            className="media-card-modal__content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="media-card-modal__close"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>

            <div className="media-card-modal__media">
              {renderMedia(true)}
            </div>

            <div className="media-card-modal__info">
              {subtitle && <p className="media-card__subtitle">{subtitle}</p>}
              <h2 className="media-card__title">{title}</h2>
              {description && (
                <p className="media-card__description">{description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MediaCard;