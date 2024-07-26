import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookDetails.css'; // Import the custom CSS
import AddReview from './AddReview';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookDetails = ({ cover, title, author, description, id }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleAddReview = () => {
    setShowModal(true);
  };

  const handleCloseReview = () => {
    setShowModal(false);
  };

  const handleSubmitReview = async (data) => {
    const reviewText = data.reviewText;
    const rating = data.rating;

    const JWT = localStorage.getItem('JWT');
    if (JWT) {

      //GET ID FROM JWT

      try {
        const response = await axios.get(`http://localhost:4000/api/v1/verifyJwtToken/${JWT}`);
        console.log('Response:', response);

        const userId = response.data.message.id;     
        const addReviewData = {
          title: title,
          author: author,
          reviewText: reviewText,
          rating: rating,
          userId: userId
        };
  
        try {
          const response = await axios.post('http://localhost:4000/api/v1/addReview', addReviewData);
          console.log('Response:', response.data);
          if (response.data.type === "JWT") {
            localStorage.setItem('JWT', JSON.stringify(response.data.message));
            console.log('stored in localStorage');
          }
        } catch (error) {
          console.error('There was an error!', error);
        }
       

      } catch (error) {
        console.error('There was an error!', error);
        navigate('/login'); // Redirect to login if token verification fails
      }
     
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="book-details card h-80">
      <div className="book-image-container">
        <img src={cover} className="card-img-top book-image" alt={title} />
      </div>
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h4 className="card-title">{title}</h4>
          <h5 className="card-subtitle mb-2 text-muted">{author}</h5>
          <p className="card-text">{description}</p>
        </div>
        <button 
          type="button" 
          className="btn btn-primary mt-3" 
          onClick={handleAddReview}
        >
          Add Review
        </button>
      </div>
      <AddReview
        show={showModal} 
        handleClose={handleCloseReview} 
        handleSubmit={handleSubmitReview} 
      />
    </div>
  );
};

export default BookDetails;
