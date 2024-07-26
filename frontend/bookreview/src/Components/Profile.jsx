import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Card, CardContent, CardHeader, TextField, Button, Grid } from '@mui/material';
import Navbar2 from './Navbar2';

const Profile = () => {
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username: '',
    email: ''
  });
  const [reviews, setReviews] = useState([]);
  const [editMode, setEditMode] = useState(false);

  // Fetch profile and reviews data
  useEffect(() => {
    const fetchProfile = async () => {
      const JWT = localStorage.getItem('JWT');
      if (JWT) {
        try {
          const response = await axios.get(`http://localhost:4000/api/v1/verifyJwtToken/${JWT}`);
          setProfile({
            username: response.data.message.username,
            email: response.data.message.email
          });
          // Call fetch reviews here
          fetchReviews(response.data.message.id);
        } catch (error) {
          console.error('There was an error!', error);
          navigate('/login'); // Redirect to login if token verification fails
        }
      } else {
        navigate('/login'); // Redirect to login if no token is found
      }
    };

    const fetchReviews = async (id) => {
      if (id != null) {
        try {
          const reviewsResponse = await axios.get(`http://localhost:4000/api/v1/reviews/${id}`);
          setReviews(reviewsResponse.data);
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const JWT = localStorage.getItem('JWT');
    if (JWT) {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/verifyJwtToken/${JWT}`);
        const userId = response.data.message.id;

        try {
          await axios.put(`http://localhost:4000/api/v1/updateProfile/${userId}`, profile);
          setEditMode(false);
          alert('Profile updated successfully');
        } catch (error) {
          console.error('Error updating profile:', error);
          alert('Failed to update profile');
        }
      } catch (error) {
        console.error('There was an error!', error);
        navigate('/login'); // Redirect to login if token verification fails
      }
    } else {
      navigate('/login'); // Redirect to login if no token is found
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('JWT');
    alert('Logged out successfully');
    navigate('/login');
  };

  return (
    <>
      <Navbar2 />
      <div style={{ padding: 20 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader title="Profile Information" style={{ backgroundColor: '#3f51b5', color: 'white' }} />
              <CardContent>
                {editMode ? (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={profile.username}
                      onChange={handleChange}
                      margin="normal"
                      required
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      margin="normal"
                      required
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                      <Button variant="contained" color="primary" type="submit">
                        Save
                      </Button>
                      <Button variant="outlined" color="secondary" onClick={() => setEditMode(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <Typography variant="body1"><strong>Username:</strong> {profile.username}</Typography>
                    <Typography variant="body1"><strong>Email:</strong> {profile.email}</Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                      <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>
                        Edit Profile
                      </Button>
                      <Button variant="contained" color="error" onClick={handleLogout}>
                        Logout
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader title="User's Reviews" style={{ backgroundColor: '#f50057', color: 'white' }} />
              <CardContent>
                {reviews.length === 0 ? (
                  <Typography>No reviews found</Typography>
                ) : (
                  reviews.map((review, index) => (
                    <Card key={index} style={{ marginBottom: 10 }}>
                      <CardContent>
                        <Typography variant="h6">{review.bookTitle}</Typography>
                        <Typography variant="body2">{review.reviewText}</Typography>
                        <Typography variant="caption" color="textSecondary">Rating: {review.rating}</Typography>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Profile;
