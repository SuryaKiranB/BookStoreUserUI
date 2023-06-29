import axios from 'axios';
import React from 'react';
import { Navbar, Container, Nav, Image, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const MyNavbar = () => {
  const navigate=useNavigate();
  async function logoutUser() {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.get("http://localhost:8082/api/v1/auth/logout", {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      localStorage.removeItem('jwtToken');
      localStorage.setItem('auth', 'false');
      localStorage.removeItem('Email');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Navbar className="navbar navbar-expand-lg bg-info d-none d-lg-flex noprint justify-content-between">
      <Container fluid>
        <Image
          src="https://img.freepik.com/free-vector/hand-drawn-flat-design-bookstore-logo_23-2149350212.jpg?w=740&t=st=1687537754~exp=1687538354~hmac=f059868349386c97949f5a512ed5c534b1df49c3f13dc242e8933b800f446ae5"
          width="120"
          height="80"
          className="mx-5"
        />
        <Navbar.Brand href="/book-list">
          <h4>
            <b>Home</b>
          </h4>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-3 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link className="me-auto mx-5 my-lg-0" href="/cart">
              <h4>
                <b>Cart</b>
              </h4>
            </Nav.Link>
            <Nav.Link className="me-auto mx-5 my-lg-0" href="/my-orders">
              <h4>
                <b>Orders</b>
              </h4>
            </Nav.Link>
          </Nav>
          <Link to="/logout">
            <Button variant="outline-light" className="me-auto mx-2 my-lg-0" size="lg" onClick={logoutUser}>
              Logout
            </Button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
