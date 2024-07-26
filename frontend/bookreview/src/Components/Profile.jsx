import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './ProfilePage.css';  // Import the custom CSS file
import Navbar2 from './Navbar2';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [id,setId] = useState(null);
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
        console.log(JWT);

        try {
          const response = await axios.get(`http://localhost:4000/api/v1/verifyJwtToken/${JWT}`);
          console.log('Response:', response);
         
          setProfile({
            username: response.data.message.username,
            email: response.data.message.email
          });
            //call fetch reviews here
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


      if (id!=null) {
        console.log(id);
        try {
          const reviewsResponse = await axios.get(`http://localhost:4000/api/v1/reviews/${id}`); 
          console.log(reviewsResponse);
          console.log("aboved review");
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
      console.log(JWT);

      try {
        const response = await axios.get(`http://localhost:4000/api/v1/verifyJwtToken/${JWT}`);
        console.log('Response:', response);

        const userId = response.data.message.id;   
        
       
       
        try {
         const response = await axios.put(`http://localhost:4000/api/v1/updateProfile/${userId}`, profile); // Replace with your API endpoint
          setEditMode(false);
          console.log(response);
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
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-primary text-white">
                <h3>Profile Information</h3>
              </div>
              <div className="card-body d-flex flex-column">
                {editMode ? (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={profile.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="d-flex justify-content-between">
                      <button type="submit" className="btn btn-primary">Save</button>
                      <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit Profile</button>
                      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-header bg-secondary text-white">
                <h3>User's Reviews</h3>
              </div>
              <div className="card-body">
                {reviews.length === 0 ? (
                  <p>No reviews found</p>
                ) : (
                  <ul className="list-group">
                    {reviews.map((review, index) => (
                      <li key={index} className="list-group-item mb-2">
                        <h5>{review.bookTitle}</h5>
                        <p>{review.reviewText}</p>
                        <small className="text-muted">Rating: {review.rating}</small>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
