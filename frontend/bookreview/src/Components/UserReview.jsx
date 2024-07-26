import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './UserReview.css';

const UserReview = ({ username, reviewText, onEdit, onDelete }) => {
  return (
    <div className="user-review card mb-3">
      <div className="card-body">
        <h5 className="card-title">{username}</h5>
        <p className="card-text">{reviewText}</p>
        <div className="d-flex justify-content-end">
          <FaEdit className="mx-2 text-primary" onClick={onEdit} />
          <FaTrashAlt className="mx-2 text-danger" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default UserReview;
