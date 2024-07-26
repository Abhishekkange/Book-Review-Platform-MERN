import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookDetails from './BookDetails';
import UserReview from './UserReview';


const BookReview = ({ book, reviews, onEditReview, onDeleteReview }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <BookDetails 
            cover={book.cover} 
            title={book.title} 
            author={book.author} 
            description={book.description} 
          />
        </div>
        <div className="col-md-8">
          <h3>User Reviews</h3>
          {reviews.map((review, index) => (
            <UserReview
              key={index}
              username={review.username}
              reviewText={review.text}
              onEdit={() => onEditReview(index)}
              onDelete={() => onDeleteReview(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookReview;
