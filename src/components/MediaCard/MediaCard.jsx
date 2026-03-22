import "./MediaCard.css";

function MediaCard({ title, date, description, mediaUrl, mediaType }) {
  const isMp4 = mediaUrl?.toLowerCase().includes(".mp4");

  return (
    <article className="media-card">
      <header className="media-card__header">
        <div className="media-card__badge">🚀</div>
        <p className="media-card__eyebrow">Astronomy Picture of the Day</p>
      </header>

      <div className="media-card__body">
        <h2 className="media-card__title">{title}</h2>

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

        <p className="media-card__date">Fecha: {date}</p>

        {description && (
          <p className="media-card__description">{description}</p>
        )}
      </div>
    </article>
  );
}

export default MediaCard;