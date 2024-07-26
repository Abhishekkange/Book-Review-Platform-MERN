import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditReview = ({ show, handleClose, review, handleUpdate }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    if (review) {
      setReviewText(review.reviewText);
      setRating(review.rating);
    }
  }, [review]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleUpdate({ reviewText, rating });
    handleClose(); // Close the modal after updating
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="reviewText">
            <Form.Label>Review Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="rating" className="mt-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Update Review
          </Button>
          <Button variant="secondary" onClick={handleClose} className="mt-3 ms-2">
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditReview;
