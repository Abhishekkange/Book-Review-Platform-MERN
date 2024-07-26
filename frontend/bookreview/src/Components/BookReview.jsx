import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookDetails from './BookDetails';
import UserReview from './UserReview';
import axios from 'axios';
import EditReviewModal from './EditReview';
import DeleteReviewModal from './DeleteConfirmationBox';
import Navbar2 from './Navbar2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const BookReview = ({ book, reviews }) => {
    const [selectedReview, setSelectedReview] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editReviewId, setEditReviewId] = useState(null);
    const [userId, setUserId] = useState(''); // Add state for userId if needed
    const navigate = useNavigate(); // Initialize useNavigate

    const handleEditReview = (review) => {
        setSelectedReview(review);
        setShowEditModal(true);
        setEditReviewId(review._id);
        setUserId(review.user); // Set userId for the review
    };

    const handleUpdateReview = async (updatedReview) => {
         // Get user Id from JWT
         const JWT = localStorage.getItem('JWT');
         if (JWT) {
             console.log(JWT);
 
             try {
                 const response = await axios.get(`http://localhost:4000/api/v1/verifyJwtToken/${JWT}`);
                 console.log('Response:', response);
 
                 const userId = response.data.message.id;
                 try {
                    const response = await axios.put(
                        `http://localhost:4000/api/v1/editReview/${book._id}/${editReviewId}`,
                        {
                            userId: userId,
                            reviewText: updatedReview.reviewText,
                            rating: updatedReview.rating
                        }
                    );
                    console.log('Updated review response:', response);
                   
                } catch (error) {
                    console.error('Error updating review:', error);
                    alert('You can update only your review');
                }
 
                
             } catch (error) {
                 console.error('There was an error!', error);
                 navigate('/login');
             }
         } else {
             navigate('/login'); 
         }
       
    };

    const handleDeleteReview = (review) => {
        setSelectedReview(review);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        // Get user Id from JWT
        const JWT = localStorage.getItem('JWT');
        if (JWT) {
            console.log(JWT);

            try {
                const response = await axios.get(`http://localhost:4000/api/v1/verifyJwtToken/${JWT}`);
                console.log('Response:', response);

                const userId = response.data.message.id;

                try {
                    await axios.delete(
                        `http://localhost:4000/api/v1/deleteReview/${book._id}/${selectedReview._id}`,
                        {
                            data: { userId: userId } 
                        }
                    );
                    console.log('Review deleted successfully');
                   
                    setShowDeleteModal(false);
                } catch (error) {
                    console.error('Error deleting review:', error);
                    alert('Failed to delete review: ' + error.message);
                }
            } catch (error) {
                console.error('There was an error!', error);
                navigate('/login');
            }
        } else {
            navigate('/login'); 
        }
    };

    return (
        <>
            <Navbar2 />
            <div className="container mt-4">
                <div className="row" style={{ minHeight: '100vh' }}>
                    <div className="col-md-4 book-details-container">
                        <BookDetails 
                            cover={book.cover} 
                            title={book.title} 
                            author={book.author} 
                            description={book.description} 
                            id={book._id}
                        />
                    </div>
                    <div className="col-md-8 reviews-container">
                        <h3 className="mb-4">User Reviews</h3>
                        {reviews.map((review, index) => (
                            <UserReview
                                key={index}
                                username={review.user}
                                reviewText={review.reviewText}
                                onEdit={() => handleEditReview(review)}
                                onDelete={() => handleDeleteReview(review)}
                            />
                        ))}
                    </div>
                </div>
                <EditReviewModal
                    show={showEditModal} 
                    handleClose={() => setShowEditModal(false)} 
                    review={selectedReview} 
                    handleUpdate={handleUpdateReview} 
                />
                <DeleteReviewModal 
                    show={showDeleteModal} 
                    handleClose={() => setShowDeleteModal(false)} 
                    handleDelete={handleConfirmDelete} 
                />
            </div>
        </>
    );
};

export default BookReview;
