import { useRef, useState } from "react";
import "./AddBookModal.css";
import { addBook } from "../database/bookDB";
import Book from "../models/Book";

function AddBookModal(props) {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const dialogRef = useRef();

  if (props.isOpen) {
    dialogRef.current.showModal();
  }

  const handleClose = () => {
    dialogRef.current.close();
    props.setModalOpen(false);
    setBookName('');
    setAuthorName('');
    setDescription('');
    setError('');
  };

  const handleFormAction = () => {
    if(bookName.trim().length === 0){
      setError("Book name should not be of length 0 or contain empty space");
      return;
    }

    if(authorName.trim().length === 0){
      setError("Author name should not be of length 0 or contain empty space");
      return;
    }
    if(description.trim().length === 0){
      setError("Description should not be of length 0 or contain empty space");
      return;
    }

    if(bookName.trim().length > 60){
      setError("Book name should not be of length greater than 60");
      return;
    }

    if(authorName.trim().length > 60){
      setError("Author name should not be of length greater than 60");
      return;
    }

    const {setAllBooks, newId} = props;

    const newBook = new Book(newId, bookName.trim(), description.trim(), authorName.trim());
    addBook(newBook);

    setAllBooks((prevState) => {
      return [...prevState, newBook];
    });

    handleClose();
  };

  const inputOnChange = (evt) => {
    if(evt.target.id === "book-name"){
      setBookName(evt.target.value);
    }

    if(evt.target.id === "author-name"){
      setAuthorName(evt.target.value);
    }

    if(evt.target.id === "description"){
      setDescription(evt.target.value);
    }

    setError('');
  }

  return (
    <dialog ref={dialogRef}>
      <h3>Add a book</h3>
      <form id="add-book-form" action={handleFormAction}>
        <div className="add-book-input">
          <label htmlFor="book-name">Book Name</label>
          <input
            id="book-name"
            name="book-name"
            placeholder="Enter book name"
            onChange={inputOnChange}
            value={bookName}
          />
        </div>
        <div className="add-book-input">
          <label htmlFor="author-name">Author Name</label>
          <input
            id="author-name"
            name="author-name"
            placeholder="Enter author name"
            onChange={inputOnChange}
            value={authorName}
          />
        </div>
        <div className="add-book-input">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            placeholder="Enter book description"
            onChange={inputOnChange}
            value={description}
          />
        </div>
        {error && (
          <p id="error">{error}</p>
        )}
        <div id="buttons">
          <button type="submit" title="Add a book">
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

export default AddBookModal;
