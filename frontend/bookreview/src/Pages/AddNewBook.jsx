import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Card, CardContent, InputLabel } from '@mui/material';
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

    let bookImageUrl = 'a';

    try {
      if (bookImage) {
        // Create a FormData object and append the image
        const formData = new FormData();
        formData.append('image', bookImage);

        // Upload image and get URL
        const uploadResponse = await axios.post('http://localhost:4000/api/v1/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        bookImageUrl = uploadResponse.data.url;
        console.log("Upload successful:",bookImageUrl);
        console.log("Upload successful:",uploadResponse.data.urll);
      }

      // Get id using JWT token
      const JWT = localStorage.getItem('JWT');
      if (JWT) {
        const response = await axios.get(`http://localhost:4000/api/v1/verifyJwtToken/${JWT}`);
        const userId = response.data.message.id;

        const data = {
          title: bookTitle,
          author: author,
          coverImage: bookImageUrl, 
          reviewText: reviewText,
          rating: rating,
          userId: userId
        };

        console.log(JSON.stringify(data));
        const submitResponse = await axios.post('http://localhost:4000/api/v1/createNewBook', data);
        console.log('Submit response:', submitResponse.data);
        
        if (submitResponse.data.message === 'Review added successfully') {
          alert("Review added successfully");
          navigate('/');
        }
      } else {
        navigate('/login'); // Redirect to login if no token is found
      }
    } catch (error) {
      console.error('Error:', error);
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
