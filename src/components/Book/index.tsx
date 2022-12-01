import React from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteBook,
  fetchBooks,
  BooksDispatch,
  IBook,
} from '../../store/slices/books/booksSlice';

type BookProps = {
  book: IBook;
};

const Book: React.FC<BookProps> = ({ book }: BookProps) => {
  const dispatch: BooksDispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(deleteBook(book.id!))
      .unwrap()
      .then((data) => {
        console.log('DELETE PROCESS SUCCEED:', data);
        dispatch(fetchBooks());
      })
      .catch((error) => {
        console.log('DELETE PROCESS FAILED:', error);
      });
  };

  return (
    <div>
      <h2>{book.title}</h2>
      <img src={book.image_url} alt={book.title} height="300" />
      <p>ID: {book.id}</p>
      <p>Author: {book.author}</p>
      <p>Synopsis: {book.synopsis}</p>
      <button onClick={handleOnClick}>Delete</button>
    </div>
  );
};

export default Book;
