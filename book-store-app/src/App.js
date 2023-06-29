import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './Components/BookList';
import BookDetails from './Components/BookDetails';
import Cart from './Components/Cart';
import MyNavbar from './Components/MyNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './Contexts/CartContext';
import { AuthProvider } from './Contexts/AuthenticationContext';
import Login from './AuthenticationComponents/Login';
import Registration from './AuthenticationComponents/Registration';
import VerifyEmail from './AuthenticationComponents/VerifyEmail';
import ResendVerificationToken from './AuthenticationComponents/ResendVerificationToken';
import FpToken from './AuthenticationComponents/FpToken';
import ChangePassword from './AuthenticationComponents/ChangePassword';
import Demo from './AuthenticationComponents/SecuredApi';
import MyOrders from './Components/MyOrders';


const App = () => {
  return (
    <Router>
      <AuthProvider>
      <CartProvider>
        <div className="App">
              <Routes>
                <Route path="/" element={<Login />} />
                  <Route path="/registration" element={<Registration />} />
                  <Route path="/verify-email" element={<VerifyEmail />} />
                  <Route path="/resend-verification-token" element={<ResendVerificationToken />} />
                  <Route path="/fp-token" element={<FpToken />} />
                  <Route path="/change-password" element={<ChangePassword />} />
                  <Route path="/secured-api" element={<Demo />} />
                  <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
                  <Route exact path="/book-list" element={<BookList/>} />
                  <Route exact path="/book/:id" element={<BookDetails/>} />
                  <Route exact path="/cart" element={<Cart/>} />
                  <Route exact path="/my-orders" element={<MyOrders/>} />
              </Routes>
        </div>
      </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
