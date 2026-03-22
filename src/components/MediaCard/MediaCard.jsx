import { useMemo, useState } from "react";
import "./MediaCard.css";

function MediaCard({ title, subtitle, description, mediaUrl, mediaType }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shortDescription = useMemo(() => {
    if (!description) return "";
    if (description.length <= 180) return description;
    return `${description.slice(0, 180)}...`;
  }, [description]);

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
              ? "media-card__media media-card__media--video media-card__media--expanded"
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

  const openExpandedView = () => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    setIsExpanded(true);
  };

  const closeExpandedView = () => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    setIsExpanded(false);
  };

  return (
    <>
      <article className="media-card">
        <header className="media-card__header">
          <div className="media-card__badge">*</div>
          <p className="media-card__eyebrow">Astronomy Picture of the Day</p>
        </header>

        <div className="media-card__body">
          <h2 className="media-card__title">{title}</h2>

          <button
            type="button"
            className="media-card__visual"
            onClick={openExpandedView}
            aria-label={`Expandir contenido de ${title}`}
          >
            {renderMedia()}
            <span className="media-card__overlay">Expandir</span>
          </button>

          {shortDescription && (
            <p className="media-card__description">{shortDescription}</p>
          )}
        </div>

        <footer className="media-card__footer">
          <span className="media-card__date">Fecha: {subtitle}</span>
          <button
            type="button"
            className="media-card__action"
            onClick={openExpandedView}
          >
            Ver mas
          </button>
        </footer>
      </article>

      {isExpanded && (
        <div className="media-card-modal" onClick={closeExpandedView}>
          <button
            type="button"
            className="media-card-modal__close"
            onClick={closeExpandedView}
            aria-label="Cerrar vista ampliada"
          >
            &times;
          </button>

          <div
            className="media-card-modal__content"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="media-card-modal__media">{renderMedia(true)}</div>

            <div className="media-card-modal__info">
              <p className="media-card__eyebrow">Astronomy Picture of the Day</p>
              <h2 className="media-card__title">{title}</h2>
              <p className="media-card__date">Fecha: {subtitle}</p>

              {description && (
                <p className="media-card__description media-card__description--full">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MediaCard;
