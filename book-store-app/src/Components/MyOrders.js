import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import MyNavbar from './MyNavBar';
import '../CSS/MyOrder.css'; 
import { Stack } from 'react-bootstrap';

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const email = localStorage.getItem('Email');
        const response = await axios.get(
          `http://localhost:8082/order-store/get-all-orders-by-user/${email}`,
          {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Stack gap={3}>
      <MyNavbar />
      
      <div className="container">
      {orders.map((order) => (
        <div key={order.id} className="order-box">
          <h2>Order ID: {order.id}</h2>
          <p><b>Customer Name:</b> {order.customerName}</p>
          <p><b>Customer Email:</b> {order.customerEmail}</p>
          <p><b>Customer Address:</b> {order.customerAddress}</p>
          <p><b>Phone Number:</b> {order.phoneNumber}</p>
          <p><b>Order Time:</b> {order.orderTime}</p>
          <p><b>Order Status:</b> {order.orderStatus}</p>
          <div className="books-container">
            <h3>Books:</h3>
            {order.books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      ))}
    </div>
      
    </Stack>

  );
}

export default MyOrders;
