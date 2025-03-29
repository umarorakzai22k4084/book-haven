import "./BookReview.css";

/**
 * 
 * @param {object} props 
 * @param {Review} props.review
 * @returns 
 */
function BookReview(props) {
    const review = props.review;
    return (
        <div className="review-info">
            <h3>{review.username}</h3>
            <p>{review.review}</p>
        </div>
    );
}

export default BookReview;