import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBook, BooksDispatch } from '../../store/slices/books/booksSlice';

const AddBookPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: BooksDispatch = useDispatch();
  const [book, setBook] = useState({
    title: '',
    author: '',
    image_url: '',
    synopsis: '',
    price: 0,
  });

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(addBook(book))
      .unwrap()
      .then((data) => {
        console.log('ADD PROCESS SUCCEED:', data);
        navigate('/books');
      })
      .catch((error) => {
        console.log('ADD PROCESS FAILED', error);
      });
  };

  return (
    <>
      <h1>Add Book</h1>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          id="title"
          name="title"
          type="text"
          value={book.title}
          onChange={onChangeHandler}
        />
        <br />
        <label htmlFor="author">Author</label>
        <br />
        <input
          id="author"
          name="author"
          type="text"
          value={book.author}
          onChange={onChangeHandler}
        />
        <br />
        <label htmlFor="imageUrl">Image URL</label>
        <br />
        <input
          id="image_url"
          name="image_url"
          type="text"
          value={book.image_url}
          onChange={onChangeHandler}
        />
        <br />
        <label htmlFor="synopsis">Synopsis</label>
        <br />
        <textarea
          id="synopsis"
          name="synopsis"
          rows={4}
          cols={50}
          value={book.synopsis}
          onChange={onChangeHandler}
        />
        <br />
        <label htmlFor="price">Price</label> <br />
        <input
          id="price"
          name="price"
          type="number"
          value={book.price}
          onChange={onChangeHandler}
        />{' '}
        <br />
        <br />
        <input type="submit" value="Add" />
      </form>
    </>
  );
};

export default AddBookPage;
