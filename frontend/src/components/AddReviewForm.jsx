import React, { useState } from "react";
import { addReview } from "../api";

const AddReviewForm = ({ destinationId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please log in to submit a review.");

    try {
      await addReview(destinationId, {
        username: user.username,
        rating,
        comment,
      });
      setMessage("✅ Review submitted successfully");
      setComment("");
      setRating(5);
      onReviewAdded(); // Refresh reviews in parent
    } catch (err) {
      setMessage("❌ Failed to submit review");
    }
  };

  return (
    <div className="mt-3 border-top pt-3">
      <form onSubmit={handleSubmit}>
        <h6 className="fw-bold">Add Your Review</h6>

        <div className="mb-2">
          <label className="form-label">Rating</label>
          <select
            className="form-select"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} ⭐
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label className="form-label">Comment</label>
          <textarea
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="Write your thoughts..."
          />
        </div>

        <button type="submit" className="btn btn-success btn-sm">
          Submit Review
        </button>

        {message && (
          <p className="mt-2 small text-muted text-center">{message}</p>
        )}
      </form>
    </div>
  );
};

export default AddReviewForm;
