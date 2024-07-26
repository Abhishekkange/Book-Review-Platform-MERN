import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Book from './Book';

const BookGrid = ({ books }) => {

  return (
    <div className="container mt-4">
      <div className="row">
        {books.map((book, index) => (
          <Book
            key={index}
            cover={book.cover}
            title={book.title}
            author={book.author}
            id ={book._id}
          />
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
