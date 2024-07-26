import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Card, CardContent, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddBookReview = () => {
  const navigate = useNavigate();
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [bookImage, setBookImage] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');

  const handleBookImageChange = (e) => {
    setBookImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get id using JWT token
    const JWT = localStorage.getItem('JWT');
    if (JWT) {
      console.log(JWT);

      try {
        const response = await axios.get(`http://localhost:4000/api/v1/verifyJwtToken/${JWT}`);
        console.log('Response:', response);

        const userId = response.data.message.id;
        console.log('User:', userId);
        const data = {
          title: bookTitle,
          author: author,
          cover: bookImage, // Note: You might need to handle file uploads differently
          reviewText: reviewText,
          rating: rating,
          userId: userId
        };

        try {
          const response = await axios.post('http://localhost:4000/api/v1/createNewBook', data);
          console.log('Response:', response.data);
          if (response.data.message === 'Review added successfully') {
            alert("Review added successfully");
            navigate('/');
          }
        } catch (error) {
          console.error('There was an error!', error);
        }
      } catch (error) {
        console.error('There was an error!', error);
        navigate('/login'); // Redirect to login if token verification fails
      }
    } else {
      navigate('/login'); // Redirect to login if no token is found
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Add New Book and Review
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Book Title"
                variant="outlined"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Author"
                variant="outlined"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
              <InputLabel htmlFor="bookImage" sx={{ mt: 2 }}>
                Book Image
              </InputLabel>
              <Button
                variant="contained"
                component="label"
                sx={{ mb: 2 }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  id="bookImage"
                  onChange={handleBookImageChange}
                  required
                />
              </Button>
              <TextField
                fullWidth
                margin="normal"
                label="Review Text"
                variant="outlined"
                multiline
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Review Rating (1 to 5)"
                variant="outlined"
                type="number"
                inputProps={{ min: 1, max: 5 }}
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AddBookReview;
