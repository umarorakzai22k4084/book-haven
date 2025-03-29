import { useRef, useState } from "react";
import Review from "../models/Review";
import { addReview } from "../database/reviewDB";

import "./AddReviewModal.css";

function AddReviewModal(props) {
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const dialogRef = useRef();

  if (props.isOpen) {
    dialogRef.current.showModal();
  }

  const handleClose = () => {
    dialogRef.current.close();
    props.setModalOpen(false);
    setReview("");
    setError("");
  };

  const handleFormAction = () => {
    if (review.trim().length === 0) {
      setError("Review should not be of length 0 or contain empty space");
      return;
    }

    const { setAllReviews, newId, bookId, username } = props;

    const newReview = new Review(Number(newId), Number(bookId), username, review.trim());
    addReview(newReview);


    setAllReviews((prevState) => {
      return [...prevState, newReview];
    });

    handleClose();
  };

  const inputOnChange = (evt) => {
    setReview(evt.target.value);
    setError("");
  };

  return (
    <dialog ref={dialogRef}>
      <h3>Add a Review</h3>
      <form id="add-review-form" action={handleFormAction}>
        <div className="add-review-input">
          <label htmlFor="review">Review</label>
          <textarea
            id="review"
            name="review"
            rows="5"
            placeholder="Enter book review"
            onChange={inputOnChange}
            value={review}
          />
        </div>
        {error && <p id="error">{error}</p>}
        <div id="buttons">
          <button type="submit" title="Add a review">
            Add
          </button>
          <button type="button" onClick={handleClose} title="Close the dialog">
            Close
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default AddReviewModal;
