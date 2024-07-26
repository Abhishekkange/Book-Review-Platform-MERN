import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const Book = ({ cover, title, author, id }) => {
  const navigate = useNavigate();

  const handleOnBookClick = () => {
    navigate(`/book/${id}`);
  };

  return (
    <Box sx={{ mb: 3, flexBasis: { xs: '100%', sm: '50%', md: '25%' } }}>
      <Card
        sx={{ cursor: 'pointer', height: '100%' }}
        onClick={handleOnBookClick}
      >
        <CardMedia
          component="img"
          height="200"
          image={cover}
          alt={title}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {author}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Book;
