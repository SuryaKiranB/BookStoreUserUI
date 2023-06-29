import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import { CartContext } from '../Contexts/CartContext';
import axios from 'axios';
import '../CSS/Cart.css';
import MyNavbar from './MyNavBar';
import AuthContext from '../Contexts/AuthenticationContext';
import LoggedOutComp from '../AuthenticationComponents/LoggedOutComponent';
import { Alert } from 'react-bootstrap';

const Cart = () => {
  const { cart,clearCart,removeFromCart } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    customerName: '',
    customerEmail: '',
    customerAddress: '',
    phoneNumber: ''
  });
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const [orderStatus, setOrderStatus] = useState(null);
  const[error,setError]=useState(null);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };
  const handleRemoveFromCart = (bookId) => {
    removeFromCart(bookId);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const orderDetails = {
      bookIds: cartItems.map((item) => item.id),
      customerName: customerDetails.customerName,
      customerEmail: localStorage.getItem("Email"),
      customerAddress: customerDetails.customerAddress,
      phoneNumber: customerDetails.phoneNumber
    };
    console.log(orderDetails);
    try {
      const token = localStorage.getItem('jwtToken');
      console.log(token);
      const response= await axios.post("http://localhost:8082/order-store/order-details",orderDetails,{
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      setOrderStatus("Order Placed Successfully")
      clearCart();
      console.log(response.data);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  
  return (
    authenticated == 'true'?
    <div>
      <MyNavbar/>
    <div className="cart">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : null}
      <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <BookCard book={item} />
                <button className="remove-btn" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <h3>Customer Details</h3>
            <div>
              <label htmlFor="customerName"><b>Name:</b></label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={customerDetails.customerName}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* <div>
              <label htmlFor="customerEmail"><b>Email:</b></label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={customerDetails.customerEmail}
                onChange={handleInputChange}
                required
              />
            </div> */}
            <div>
              <label htmlFor="customerAddress"><b>Address:</b></label>
              <input
                type="text"
                id="customerAddress"
                name="customerAddress"
                value={customerDetails.customerAddress}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber"><b>Phone Number:</b></label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={customerDetails.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Place Order</button>
            {orderStatus&&<Alert variant='success'>{orderStatus}</Alert>}
            {error&&<Alert variant='danger'>{error}</Alert>}
            <div>
              
            </div>
          </form>
        </div>
    </div>
    </div>
    :<LoggedOutComp/>
  );
};

export default Cart;
