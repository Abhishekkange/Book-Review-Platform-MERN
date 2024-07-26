import React, { useState, useEffect } from 'react';
import BookReview from '../Components/BookReview';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BookPage() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:4000/api/v1/book/${id}`);
                setBook(response.data.message); 
                console.log('Fetched book details:', response.data.message);
            } catch (err) {
                setError('Failed to fetch book details: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    

    return (
        <div >
           
            {book ? (
                <>
                    <BookReview book={book} reviews={book.reviews} />
                </>
            ) : (
                <p>No book details available.</p>
            )}
        </div>
    );
}

export default BookPage;
