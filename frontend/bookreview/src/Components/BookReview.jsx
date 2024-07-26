import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookDetails from './BookDetails';
import UserReview from './UserReview';
import axios from 'axios';
import EditReviewModal from './EditReview';
import DeleteReviewModal from './DeleteConfirmationBox';

const BookReview = ({ book, reviews }) => {
    const [selectedReview, setSelectedReview] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editReviewId, setEditReviewId] = useState(null);
    const [userId, setUserId] = useState(''); // Add state for userId if needed

    const handleEditReview = (review) => {
        setSelectedReview(review);
        setShowEditModal(true);
        setEditReviewId(review._id);
        setUserId(review.user); // Set userId for the review
    };

    const handleUpdateReview = async (updatedReview) => {

      console.log(book._id);
      console.log(editReviewId);
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
            // Handle successful update (e.g., refresh reviews or show a success message)
        } catch (error) {
            console.error('Error updating review:', error);
            alert('Failed to update review: ' + error.message);
        }
    };

    const handleDeleteReview = (review) => {
        setSelectedReview(review);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {

   console.log(selectedReview._id);
        try {
            await axios.delete(
                `http://localhost:4000/api/v1/deleteReview/${book._id}/${selectedReview._id}`
            );
            console.log('Review deleted successfully');
            // Handle successful delete (e.g., refresh reviews or show a success message)
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('Failed to delete review: ' + error.message);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4">
                    <BookDetails 
                        cover={book.cover} 
                        title={book.title} 
                        author={book.author} 
                        description={book.description} 
                        id={book._id}
                    />
                </div>
                <div className="col-md-8">
                    <h3>User Reviews</h3>
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
    );
};

export default BookReview;
