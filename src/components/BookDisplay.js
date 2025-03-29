import { Link } from "react-router";

import "./BookDisplay.css";
import { addFavorite, getIsFavorite, removeFavorite } from "../database/favoriteDB";
import Favorite from "../models/Favorite";
import { useEffect, useState } from "react";

function BookDisplay({ book, className, user, setChanged }) {
  const [isUserFav, setIsUserFav] = useState(false);

  useEffect(() => {
    if(user){
      setIsUserFav(getIsFavorite(user.username, book.id));
      return;
    }
    setIsUserFav(false);
  }, [user, book.id]);
  

  const addToFav = () => {
    addFavorite(new Favorite(user.username, book.id));
    setIsUserFav(true);
  }

  const removeFromFav = () => {
    removeFavorite(new Favorite(user.username, book.id));
    setIsUserFav(false);
    setChanged(true);
  }

  return (
    <div className={className + " book-card"}>
      <div>
        <h2>
          <Link to={`/book/${book.id}`}>{book.name}</Link>
        </h2>
        <p>
          by <strong>{book.author}</strong>
        </p>
      </div>
      {user && !isUserFav && <button onClick={addToFav}>Add to Favorite</button>}
      {user && isUserFav && <button onClick={removeFromFav}>Remove from Favorite</button>}
    </div>
  );
}

export default BookDisplay;
