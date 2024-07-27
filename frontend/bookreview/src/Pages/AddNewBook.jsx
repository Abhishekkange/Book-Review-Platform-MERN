import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Card, CardContent, InputLabel, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar2 from '../Components/Navbar2';

const AddBookReview = () => {
  const navigate = useNavigate();
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [bookImage, setBookImage] = useState(null);
  const [bookImageUrl, setBookImageUrl] = useState(null); // State to store image URL
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBookImageChange = (e) => {
    const file = e.target.files[0];
    setBookImage(file);
    setBookImageUrl(URL.createObjectURL(file)); // Create a temporary URL for the uploaded image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let uploadedImageUrl = '';

    try {
      if (bookImage) {
        const formData = new FormData();
        formData.append('image', bookImage);

        const uploadResponse = await axios.post('http://localhost:4000/api/v1/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        uploadedImageUrl = uploadResponse.data.url;
       
      }

      const JWT = localStorage.getItem('JWT');
      if (JWT) {
        const response = await axios.get(`http://localhost:4000/api/v1/verifyJwtToken/${JWT}`);
        const userId = response.data.message.id;

        const data = {
          title: bookTitle,
          author: author,
          coverImage: uploadedImageUrl,
          reviewText: reviewText,
          rating: rating,
          userId: userId
        };

        const submitResponse = await axios.post('http://localhost:4000/api/v1/createNewBook', data);
        

        if (submitResponse.data.message === 'Review added successfully') {
          alert("Review added successfully");
          navigate('/');
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar2 />
      <Container maxWidth="sm">
        <Box my={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Add New Book and Review
              </Typography>
              {loading && <LinearProgress />}
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
                {bookImageUrl && (
                  <Box my={2}>
                    <img src={bookImageUrl} alt="Book Cover" style={{ width: '50%', height: '50%' }} />
                  </Box>
                )}
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
                  disabled={loading}
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default AddBookReview;
