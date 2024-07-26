import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import './AddNewBook.css'; 
import {useNavigate} from 'react-router-dom';
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

  const handleSubmit = async(e) => {
    e.preventDefault();
   
    //get id using JWT token 
    const JWT = localStorage.getItem('JWT');
    if (JWT) {
      console.log(JWT);

      try {
        const response = await axios.get(`http://localhost:4000/api/v1/verifyJwtToken/${JWT}`);
        console.log('Response:', response);

        const userId = response.data.message.id;
        console.log('User:', userId);
        const data = {
          "title":bookTitle,
          "author":author,
          "cover":"bookImage",
          "reviewText":reviewText,
          "rating":rating,
          "userId":userId
        }
    
        try {
          const response = await axios.post('http://localhost:4000/api/v1/createNewBook', data);
          console.log('Response:', response.data);
          if(response.data.message === 'Review added successfully')
          {
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
    <Container fluid className="p-0">
      <Row className="h-100">
        <Col md={12} className="d-flex align-items-center justify-content-center">
          <Card className="w-100 h-80 p-4">
            <Card.Body className="d-flex flex-column">
              <h3 className="mb-4">Add New Book and Review</h3>
              <Form onSubmit={handleSubmit} className="d-flex flex-column justify-content-between">
                <Form.Group controlId="formBookTitle" className="mb-3">
                  <Form.Label>Book Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter book title"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formAuthor" className="mb-3">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter author name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBookImage" className="mb-3">
                  <Form.Label>Book Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleBookImageChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formReviewText" className="mb-3">
                  <Form.Label>Review Text</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter review text"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formRating" className="mb-3">
                  <Form.Label>Review Rating (1 to 5)</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Enter rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-auto">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddBookReview;
