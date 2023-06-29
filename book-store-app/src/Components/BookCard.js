import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/BookCard.css';

const BookCard = ({ book }) => {
  const { id, title, author, price } = book;

  return (
    <div className="book-card">
      <h3>{title}</h3>
      <p><b>Author: {author}</b></p>
      <p><b>Price: {price}</b></p>
      <Link to={`/book/${id}`} className="details-link">View Details</Link>
    </div>
  );
};

export default BookCard;