import "./MediaCard.css";

function MediaCard({ title, date, description, mediaUrl, mediaType }) {
  const isMp4 = mediaUrl?.toLowerCase().includes(".mp4");

  return (
    <article className="media-card">
      <div className="media-card__body">
        <header className="media-card__header">
          <p className="media-card__eyebrow">Astronomy Picture of the Day <img src="https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg" alt="NASA Logo" /></p>
        </header>

        {!mediaUrl ? (
          <p className="media-card__fallback">Sin contenido disponible</p>
        ) : mediaType === "image" ? (
          <img
            src={mediaUrl}
            alt={title}
            className="media-card__media"
          />
        ) : mediaType === "video" && isMp4 ? (
          <video className="media-card__media" controls>
            <source src={mediaUrl} type="video/mp4" />
            Tu navegador no soporta video.
          </video>
        ) : mediaType === "video" ? (
          <iframe
            src={mediaUrl}
            title={title}
            className="media-card__media media-card__media--video"
            allowFullScreen
          />
        ) : (
          <p className="media-card__fallback">Formato no soportado</p>
        )}

        <div className="media-card__content">
          <p className="media-card__date">{date}</p>

          <h2 className="media-card__title">{title}</h2>

          {description && (
            <p className="media-card__description">{description}</p>
          )}
        </div>
      </div>
    </article>
  );
}

export default MediaCard;