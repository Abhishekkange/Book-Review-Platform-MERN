import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookDetails from './BookDetails';
import UserReview from './UserReview';


const BookReview = ({ book, reviews }) => {

    reviews.map((review, index) => (
        console.log(review.reviewText)
      ));
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <BookDetails 
            cover={book.cover} 
            title={book.title} 
            author={book.author} 
            description={book.description} 
            id={ book._id }
          />
        </div>
        <div className="col-md-8">
          <h3>User Reviews</h3>
          {reviews.map((review, index) => (
            <UserReview
              key={index}
              username={review.user}
              reviewText={review.reviewText}
            //   onEdit={() => onEditReview(index)}
            //   onDelete={() => onDeleteReview(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookReview;
