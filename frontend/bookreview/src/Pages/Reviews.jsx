import React from 'react'
import Navbar from '../Components/Navbar'
import BookGrid from '../Components/BooksGrid'
import { useEffect ,useState } from 'react';
import axios from 'axios';

function Reviews() {

  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/books');
        setBooks(response.data.message);
        console.log(JSON.stringify(books));
      } catch (error) {
        console.error('There was an error fetching the books!', error);
      }
    };

    fetchBooks();
    
  }, []);
  return (
    <div>
      <Navbar />
    
      <BookGrid books = {books} />
   
    </div>
  )
}

export default Reviews
