const StarDisplay = ({ rating }) => {
  const filled = Math.round(rating);
  return (
    <span>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ color: i < filled ? "#ffc107" : "#e4e5e9" }}>★</span>
      ))}
    </span>
  );
};

export default StarDisplay;
