import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './UserReview.css';
import profileimage from '../images/user.png';

const UserReview = ({ username, reviewText, rating, onEdit, onDelete }) => {
  return (
    <div className="user-review card mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <img  src={profileimage} alt="icon" className="profile-img mr-3 " />
          <h5 className="card-title mb-0">{username}</h5>
        </div>
        <p className="card-text mb-3">{reviewText}</p>
        <div className="rating mb-3">
          <strong>Rating:</strong> {rating} / 5
        </div>
        <div className="d-flex justify-content-end">
          <FaEdit onClick={onEdit} className="mx-2 text-primary cursor-pointer" />
          <FaTrashAlt onClick={onDelete} className="mx-2 text-danger cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default UserReview;
