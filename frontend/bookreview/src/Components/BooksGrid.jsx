import React from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BookGrid = ({ books = [], currentPage, totalPages, setCurrentPage }) => {
  const navigate = useNavigate();

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
 

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {books.length === 0 ? (
          <Typography variant="h6" sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
            No books available
          </Typography>
        ) : (
          books.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={book.coverImage} // Use `book.cover` from the API response
                  alt={book.title}
                  
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {book.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {book.author}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleBookClick(book._id)}
                    sx={{ mt: 2 }}
                  >
                    See Reviews
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination 
          count={totalPages} 
          page={currentPage} 
          onChange={handlePageChange} 
          color="primary" // Optionally set pagination color
        />
      </Box>
    </Container>
  );
};

export default BookGrid;
