import { getAllBooks } from "../database/bookDB";
import { useState } from "react";
import BookDisplay from "../components/BookDisplay";

import "./HomePage.css";
import AddBookModal from "../components/AddBookModal";
import { getIsFavorite } from "../database/favoriteDB";

const HomePage = (props) => {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [allBooks, setAllBooks] = useState(getAllBooks());
  const [searchFav, setSearchFav] = useState(false);
  const [changed, setChanged] = useState(false);

  const handleInputOnChange = (evt) => {
    setSearch(evt.target.value);
  };

  const handleCheckboxOnChange = (evt) => {
    setSearchFav((prevState) => !prevState);
  };

  if(changed) {
    setChanged(false);
  }

  const highestId = allBooks.reduce((book1, book2) =>
    book1.id > book2.id ? book1 : book2
  ).id;

  var books = allBooks.filter((book) =>
    book.name.toLowerCase().includes(search.toLowerCase())
  );

  if (searchFav && props.user) {
    books = books.filter((book) => getIsFavorite(props.user.username, book.id));
  }

  return (
    <>
      {props.user && (
        <AddBookModal
          setAllBooks={setAllBooks}
          setModalOpen={setModalOpen}
          isOpen={modalOpen}
          newId={highestId + 1}
        />
      )}
      <main id="home-page">
        <div>
          <input
            id="search-query"
            placeholder="Search for Books"
            onChange={handleInputOnChange}
            value={search}
          />
          {props.user && (
            <div>
              <input
                id="search-favorite"
                type="checkbox"
                onChange={handleCheckboxOnChange}
              />
              <label htmlFor="search-favorite">Search Favorites Only</label>
            </div>
          )}
        </div>
        {props.user && (
          <button id="add-book" onClick={() => setModalOpen(true)}>
            Add a Book
          </button>
        )}
        {books.length === 0 && <p id="no-books">No books has been added</p>}
        {books.length !== 0 && (
          <ul>
            {books.map((book) => (
              <li key={book.id} className="book-list">
                <BookDisplay
                  book={book}
                  user={props.user}
                  className="book-item"
                  setChanged={setChanged}
                />
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
};

export default HomePage;
