import Review from "../models/Review";

var reviewDB = {}
if(localStorage.getItem('reviewDB')) {
    reviewDB = JSON.parse(localStorage.getItem('reviewDB'));
} else {
    reviewDB = {
        1: {
            bookId: 1,
            username: "skywalker22",
            review: "A beautifully written and enchanting story. The atmosphere of the circus is mesmerizing!",
        },
        2: {
            bookId: 3,
            username: "pixelninja",
            review: "An incredible sci-fi adventure with great humor and mind-blowing science. Highly recommended!",
        },
        3: {
            bookId: 5,
            username: "shadowwolf",
            review: "Very practical advice on building habits. A must-read for self-improvement!",
        },
        4: {
            bookId: 7,
            username: "neonphantom",
            review: "An amazing fantasy story with rich world-building and compelling characters.",
        },
        5: {
            bookId: 8,
            username: "cybereclipse",
            review: "A mind-bending and intelligent sci-fi novel. The concepts are fascinating!",
        },
    }
    localStorage.setItem('reviewDB', JSON.stringify(reviewDB));
}

/**
 * 
 * @param {Review} rev book class object
 */
export function addReview(rev){
    const {id, bookId, username, review} = rev;
    reviewDB[id] = {
        bookId: bookId,
        username: username,
        review: review,
    }
    localStorage.setItem('reviewDB', JSON.stringify(reviewDB));
}

export function getAllReviews(){
    const reviews = [];
    for (const id in reviewDB){
        const {bookId, username, review} = reviewDB[id];
        reviews.push(new Review(id, bookId, username, review))
    }

    return reviews;
}