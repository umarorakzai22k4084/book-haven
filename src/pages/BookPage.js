import { useParams } from "react-router";
import { getBook } from "../database/bookDB";
import { getAllReviews } from "../database/reviewDB";

import "./BookPage.css";
import BookReview from "../components/BookReview";
import { useEffect, useState } from "react";
import AddReviewModal from "../components/AddReviewModal";
import { addFavorite, getIsFavorite, removeFavorite } from "../database/favoriteDB";
import Favorite from "../models/Favorite";

function BookPage(props) {
  let params = useParams();
  const [allReviews, setAllReviews] = useState(getAllReviews());
  const [modalOpen, setModalOpen] = useState(false);
  const [isUserFav, setIsUserFav] = useState(false);

  const book = getBook(params.id);

  useEffect(() => {
    if (props.user) {
      setIsUserFav(getIsFavorite(props.user.username, book.id));
      return;
    }
    setIsUserFav(false);
  }, [props.user, book.id]);

  const highestId = allReviews.reduce((review1, review2) =>
    review1.id > review2.id ? review1 : review2
  ).id;

  const reviews = allReviews.filter(
    (review) => review.bookId === Number(params.id)
  );

  const addToFav = () => {
    addFavorite(new Favorite(props.user.username, book.id));
    setIsUserFav(true);
  }

  const removeFromFav = () => {
    removeFavorite(new Favorite(props.user.username, book.id))
    setIsUserFav(false);
  }

  return (
    <>
      {props.user && (
        <AddReviewModal
          setAllReviews={setAllReviews}
          setModalOpen={setModalOpen}
          isOpen={modalOpen}
          bookId={params.id}
          username={props.user.username}
          newId={highestId + 1}
        />
      )}
      <main>
        <section>
          <div id="book-details">
            <div id="book-heading">
              <h2>{book.name}</h2>
              <p>
                by <strong>{book.author}</strong>
              </p>
              {props.user && !isUserFav && <button onClick={addToFav}>Add to Favorite</button>}
              {props.user && isUserFav && <button onClick={removeFromFav}>Remove from Favorite</button>}
            </div>
            <div>
              <h4>Description</h4>
              <p id="description">{book.description}</p>
            </div>
          </div>
        </section>
        <hr />
        <section>
          <div id="review-section">
            <div>
              <h2>Reviews</h2>
              {props.user && (
                <button id="add-review" onClick={() => setModalOpen(true)}>
                  Add a Review
                </button>
              )}
            </div>
            {reviews.length !== 0 && (
              <ul>
                {reviews.map((review) => (
                  <li key={review.id}>
                    <BookReview review={review} />
                  </li>
                ))}
              </ul>
            )}
            {reviews.length === 0 && <p>No review for this book.</p>}
          </div>
        </section>
      </main>
    </>
  );
}

export default BookPage;
