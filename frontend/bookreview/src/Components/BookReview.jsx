import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Card, CardContent, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import Navbar2 from './Navbar2';

const BookReview = ({ book, reviews }) => {
    const [selectedReview, setSelectedReview] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editReviewId, setEditReviewId] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState('');
    const navigate = useNavigate();

    const handleEditReview = (review) => {
        setSelectedReview(review);
        setReviewText(review.reviewText);
        setRating(review.rating);
        setEditReviewId(review._id);
        setShowEditModal(true);
    };

    const handleUpdateReview = async () => {
        const JWT = localStorage.getItem('JWT');
        if (JWT) {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/verifyJwtToken/${JWT}`);
                const userId = response.data.message.id;

                try {
                    await axios.put(
                        `http://localhost:4000/api/v1/editReview/${book._id}/${editReviewId}`,
                        {
                            userId: userId,
                            reviewText: reviewText,
                            rating: rating
                        }
                    );
                    setShowEditModal(false);
                    window.location.reload(); // Refresh to see updated review
                } catch (error) {
                    console.error('Error updating review:', error);
                    alert('You can update only your review');
                }

            } catch (error) {
                console.error('Error verifying JWT:', error);
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    };

    const handleDeleteReview = (review) => {
        setSelectedReview(review);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        const JWT = localStorage.getItem('JWT');
        if (JWT) {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/verifyJwtToken/${JWT}`);
                const userId = response.data.message.id;

                try {
                    await axios.delete(
                        `http://localhost:4000/api/v1/deleteReview/${book._id}/${selectedReview._id}`,
                        { data: { userId: userId } }
                    );
                    setShowDeleteModal(false);
                    window.location.reload(); // Refresh to see updated reviews
                } catch (error) {
                    console.error('Error deleting review:', error);
                    alert('Failed to delete review: ' + error.message);
                }

            } catch (error) {
                console.error('Error verifying JWT:', error);
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    };

    const handleAddReview = () => {
        setReviewText('');
        setRating('');
        setShowAddModal(true);
    };

    const handleSaveNewReview = async () => {
        const JWT = localStorage.getItem('JWT');
        if (JWT) {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/verifyJwtToken/${JWT}`);
                const userId = response.data.message.id;

                try {
                    await axios.post(
                        `http://localhost:4000/api/v1/addReview/${book._id}`,
                        {
                            userId: userId,
                            reviewText: reviewText,
                            rating: rating
                        }
                    );
                    setShowAddModal(false);
                    window.location.reload(); // Refresh to see new review
                } catch (error) {
                    console.error('Error adding review:', error);
                    alert('Failed to add review: ' + error.message);
                }

            } catch (error) {
                console.error('Error verifying JWT:', error);
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <Navbar2 />
            <Container sx={{ mt: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Box
                                    component="img"
                                    sx={{
                                        height: 233,
                                        display: 'block',
                                        maxWidth: 300,
                                        overflow: 'hidden',
                                        width: '100%',
                                        mb: 2,
                                    }}
                                    src={book.coverImage}
                                    alt={book.title}
                                />
                                <Typography variant="h5">{book.title}</Typography>
                                <Typography variant="subtitle1">{book.author}</Typography>
                                <Typography variant="body2">{book.description}</Typography>
                            </CardContent>
                        </Card>
                        <Button variant="contained" color="primary" onClick={handleAddReview} sx={{ mt: 2 }}>Add Review</Button>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h6" sx={{ mb: 2 }}>User Reviews</Typography>
                        {reviews.map((review) => (
                            <Card key={review._id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="body1"><strong>{review.user}</strong></Typography>
                                    <Typography variant="body2">{review.reviewText}</Typography>
                                    <Box sx={{ mt: 2 }}>
                                        <IconButton onClick={() => handleEditReview(review)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteReview(review)}>
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Grid>
                </Grid>

                {/* Edit Review Modal */}
                <Dialog open={showEditModal} onClose={() => setShowEditModal(false)}>
                    <DialogTitle>Edit Review</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Review Text"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Rating"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            inputProps={{ min: 1, max: 5 }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowEditModal(false)}>Cancel</Button>
                        <Button onClick={handleUpdateReview}>Update</Button>
                    </DialogActions>
                </Dialog>

                {/* Delete Review Modal */}
                <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <Typography>Are you sure you want to delete this review?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                        <Button onClick={handleConfirmDelete}>Delete</Button>
                    </DialogActions>
                </Dialog>

                {/* Add Review Modal */}
                <Dialog open={showAddModal} onClose={() => setShowAddModal(false)}>
                    <DialogTitle>Add Review</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Review Text"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Rating"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            inputProps={{ min: 1, max: 5 }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
                        <Button onClick={handleSaveNewReview}>Save</Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
};

export default BookReview;
