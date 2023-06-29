import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import '../CSS/BookList.css';
import MyNavbar from './MyNavBar';
import AuthContext from '../Contexts/AuthenticationContext';
import LoggedOutComp from '../AuthenticationComponents/LoggedOutComponent';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const booksPerPage = 15;
  const totalPages = Math.ceil(books.length / booksPerPage);

  useEffect(() => {
    // Make API call to retrieve the list of books
    // Update the books state with the retrieved data
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        console.log(token);
        const response = await axios.get('http://localhost:8082/book-store/get-all-books',{
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        setBooks(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
  }, []);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = books.slice(startIndex, endIndex);

  return (
    authenticated=='true'?
    <div>
      <MyNavbar/>
      <div className="book-list book-grid">
        {currentBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <div className="pagination">
      <button disabled={currentPage === 1} onClick={handlePreviousPage}>
        Previous
      </button>
      <button disabled={currentPage === totalPages} onClick={handleNextPage}>
        Next
      </button>
    </div>
  </div>
  :<LoggedOutComp/>
 );
};

export default BookList;
