import React, { useEffect, useState, useContext  } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../CSS/BookDetails.css';
import { CartContext } from '../Contexts/CartContext';
import MyNavbar from './MyNavBar';
import AuthContext from '../Contexts/AuthenticationContext';
import LoggedOutComp from '../AuthenticationComponents/LoggedOutComponent';
import { Alert } from 'react-bootstrap';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { cart,addToCart } = useContext(CartContext);
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const [status,setStatus]=useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        console.log(token);
        console.log('Fetching book details for id:', id);
        const response = await axios.get(`http://localhost:8082/book-store/get-book-by-id/${id}`,{
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        console.log('Received book details:', response.data);
        setBook(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookDetails();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(book);
    console.log('Added to cart:', book);
    setStatus('Added to Cart');
    console.log(cart);
  };

  if (!book) {
    return <p>Loading...</p>;
  }

  const { title, author, price, pages, inventoryCount } = book;

  return (
    authenticated== 'true'?
    <div>
      <MyNavbar/>
        <div className="book-details">
          <h2>{title}</h2>
          <p className="details-label">Author:</p>
          <p className="details-value">{author}</p>

          <p className="details-label">Price:</p>
          <p className="details-value">{price}</p>

          <p className="details-label">Pages:</p>
          <p className="details-value">{pages}</p>

          <p className="details-label">Inventory Count:</p>
          <p className="details-value">{inventoryCount}</p>
          <button onClick={handleAddToCart} disabled={inventoryCount === 0}>Add to Cart</button>
          {status&&<Alert variant='success'>{status}</Alert>}
        </div>
    </div>
    :
    <LoggedOutComp/>
  );
};

export default BookDetails;
