import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BooksDispatch, fetchBooks } from '../../store/slices/books/booksSlice';
import { RootState } from '../../store';
import Book from '../../components/Book';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

const BooksPage: React.FC = () => {
  const { books, booksLoading, booksError } = useSelector(
    (state: RootState) => state.books,
  );
  const dispatch: BooksDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <>
      <h1>Books</h1>
      {booksLoading && <Loading />}
      {!booksLoading && booksError && <Error />}
      {!booksLoading &&
        !booksError &&
        books.map((book, index) => {
          return <Book key={index} book={book} />;
        })}
    </>
  );
};

export default BooksPage;
