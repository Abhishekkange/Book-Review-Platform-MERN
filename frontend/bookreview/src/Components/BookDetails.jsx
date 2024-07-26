import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddReview from './AddReview';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditReview from './EditReview';
import DeleteReview from './DeleteConfirmationBox';



const BookDetails = ({ cover, title, author, description, id }) => {

    const [showModal, setShowModal] = useState(false);
    const [showEditReviewModal, setShowEditReviewModal] = useState(false);
    const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const navigate = useNavigate();

    

    const data = {

        "author":author,
        "title":title,
        "reviewText":""
    }
    
    const handleSubmitReview = async(data) => {

        const reviewText = data.reviewText;
        const rating = data.rating;

        //get id from JWT
        const JWT = localStorage.getItem('JWT');
        if(JWT)
        {

            const addReviewData = {


                title: title,
                author: author,
                reviewText: reviewText,
                rating: rating,
                userId:"Abhishek"
            }

            try {
                const response = await axios.post('http://localhost:4000/api/v1/addReview', addReviewData);
                console.log('Response:', response.data);
                if(response.data.type =="JWT")
                {
                    localStorage.setItem('JWT', JSON.stringify(response.data.message));
                    console.log('stored in localStorage');
                }
              } catch (error) {
                console.error('There was an error!', error);
              }
        }
        
        else{

            navigate('/login');

        }
       


    }
    const handleAddReview = () => {

        setShowModal(true);

    };
    const handleCloseReview = () => {

        setShowModal(false);

    };
   

  




  return (
    <div className="book-details card mb-3">
      <img src={cover} className="card-img-top" alt={title} />
      <div className="card-body">
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
    <AddReview
        show={showModal} 
        handleClose={handleCloseReview} 
        handleSubmit={handleSubmitReview} 
    />
  
                
    </div>
  );
};

export default BookDetails;
