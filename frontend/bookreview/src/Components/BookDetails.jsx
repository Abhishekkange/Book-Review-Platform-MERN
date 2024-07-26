import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookDetails = ({ cover, title, author, description }) => {
  return (
    <div className="book-details card mb-3">
      <img src={cover} className="card-img-top" alt={title} />
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <h5 className="card-subtitle mb-2 text-muted">{author}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};

export default BookDetails;
