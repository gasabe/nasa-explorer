import "./Skeleton.css";

const Skeleton = ({
  width = "100%",
  height = "1rem",
  radius = "var(--radius)",
}) => {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius: radius }}
      aria-hidden="true"
    />
  );
};

export default Skeleton;