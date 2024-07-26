import React from 'react'
import Navbar from '../Components/Navbar'
import BookGrid from '../Components/BooksGrid'

function Reviews() {
  const books = [
    {
      cover: 'cover1.jpg',
      title: 'Book Title 1',
      author: 'Author 1',
    },
    {
      cover: 'cover2.jpg',
      title: 'Book Title 2',
      author: 'Author 2',
    },
    {
      cover: 'cover3.jpg',
      title: 'Book Title 3',
      author: 'Author 3',
    }
  ];
  return (
    <div>
      <Navbar />
      <BookGrid books = {books} />
    </div>
  )
}

export default Reviews
