import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Book.css';
import { useNavigate } from 'react-router-dom';

const Book = ({ cover, title, author, id }) => {
  const navigate = useNavigate();

  const handleOnBookClick = () => {
    navigate(`/book/${id}`);
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card" onClick={handleOnBookClick}>
        <img src={cover} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{author}</p>
        </div>
      </div>
    </div>
  );
};

export default Book;
