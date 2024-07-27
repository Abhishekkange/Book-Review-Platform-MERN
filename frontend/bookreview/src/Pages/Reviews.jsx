import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import BookGrid from '../Components/BooksGrid';

const Reviews = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async (page = 1) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/books?page=${page}&limit=6`);
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error('There was an error fetching the books!', error);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const handleSearch = async (keyword) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/searchBook/${keyword}`);
      setBooks(response.data.books);
      setTotalPages(1); // Assuming search results do not need pagination
      setCurrentPage(1);
    } catch (error) {
      console.error('There was an error searching the books!', error);
    }
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <BookGrid books={books} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Reviews;
