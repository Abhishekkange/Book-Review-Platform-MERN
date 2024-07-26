import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Book.css';


const Book = ({ cover, title, author }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={cover} className="card-img-top" alt={title} />
        <div className="card-body text-center">
          <h5 className="card-title">{title}</h5>
          <p className="card-text text-muted">{author}</p>
        </div>
      </div>
    </div>
  );
};

export default Book;
