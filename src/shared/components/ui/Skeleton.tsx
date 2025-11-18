import "./Skeleton.css";

export const Skeleton = ({
  count = 1,
  className = "",
}: {
  count?: number;
  className?: string;
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`skeleton ${className}`} />
      ))}
    </>
  );
};
