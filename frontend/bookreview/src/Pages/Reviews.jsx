import React from 'react'
import Navbar from '../Components/Navbar'
import BookGrid from '../Components/BooksGrid'
import BookReview from '../Components/BookReview';
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

  
  // const books = [
  //   {
  //     cover: 'cover1.jpg',
  //     title: 'Book Title 1',
  //     author: 'Author 1',
  //   },
  //   {
  //     cover: 'cover2.jpg',
  //     title: 'Book Title 2',
  //     author: 'Author 2',
  //   },
  //   {
  //     cover: 'cover3.jpg',
  //     title: 'Book Title 3',
  //     author: 'Author 3',
  //   }
  // ];
  return (
    <div>
      <Navbar />
      <BookGrid books = {books} />
   
    </div>
  )
}

export default Reviews
