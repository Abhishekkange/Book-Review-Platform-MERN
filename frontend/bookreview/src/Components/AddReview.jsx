import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';

const AddReview = ({ show, handleClose, handleSubmit }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ reviewText, rating });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Review</Modal.Title>
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
            <ReactStars
              count={5}
              size={40}
              value={rating}
              onChange={(newRating) => setRating(newRating)}
              activeColor="#ffd700"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Add Review
          </Button>
          <Button variant="secondary" onClick={handleClose} className="mt-3 ms-2">
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddReview;
