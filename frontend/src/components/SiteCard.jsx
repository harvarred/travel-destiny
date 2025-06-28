import React, { useEffect, useState } from "react";
import { getReviews, addReview } from "../api";
import StarDisplay from "./StarDisplay";

const SiteCard = ({ site, destinationName, destinationId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchReviews = async () => {
    try {
      const res = await getReviews(destinationId, site.name);
      setReviews(res.data || []);
    } catch (err) {
      console.error("Error fetching reviews", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Login required to submit review");

    try {
      await addReview(destinationId, {
        username: user.username,
        comment,
        rating,
        siteName: site.name,
      });
      setComment("");
      setRating(5);
      setMessage("✅ Review submitted");
      fetchReviews();
    } catch (err) {
      setMessage("❌ Failed to submit review");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="card m-3" style={{ width: "22rem", boxShadow: "0 0 10px rgba(0,0,0,0.15)" }}>
      <img
        src={site.image}
        alt={site.name}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{site.name}</h5>
        <p className="card-text">
          <strong>Destination:</strong> {destinationName}
        </p>

        <div className="mb-2">
          <StarDisplay rating={average} />
          <span className="ms-2 text-muted small">({average.toFixed(1)})</span>
        </div>

        <button
          className="btn btn-sm btn-outline-secondary mb-2"
          onClick={() => setShowReviewForm((prev) => !prev)}
        >
          {showReviewForm ? "Hide Reviews" : "Show Reviews"}
        </button>

        {showReviewForm && (
          <>
            <div className="border-top pt-2">
              <h6>All Reviews:</h6>
              {reviews.map((r, i) => (
                <div key={i} className="mb-2 border-bottom pb-2 small">
                  <strong>{r.username}</strong> ⭐{r.rating}
                  <div>{r.comment}</div>
                </div>
              ))}
            </div>

            <form className="mt-3" onSubmit={handleSubmit}>
              <h6>Add a Review</h6>
              <select
                className="form-select form-select-sm mb-2"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>{n} ⭐</option>
                ))}
              </select>
              <textarea
                className="form-control form-control-sm mb-2"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Your comment"
                required
              />
              <button className="btn btn-sm btn-success" type="submit">
                Submit
              </button>
              {message && <div className="text-muted mt-1 small">{message}</div>}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SiteCard;
