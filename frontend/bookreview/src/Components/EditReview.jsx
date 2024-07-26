import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

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
    handleClose(); // Close the dialog after updating
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>Edit Review</DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <TextField
            autoFocus
            margin="dense"
            label="Review Text"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Rating"
            type="number"
            fullWidth
            inputProps={{ min: 1, max: 5 }}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              Update Review
            </Button>
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditReview;
