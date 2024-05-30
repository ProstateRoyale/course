import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar, Nav, Button, Form, FormControl, Dropdown } from 'react-bootstrap';
import { ThemeContext } from '../context/themeContext';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (token) {
        try {
          const response = await axios.get('/api/auth/check', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsAdmin(response.data.isAdmin);
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
      }
    };

    checkAdminStatus();
  }, [token]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">{t('Home')}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {isAuthenticated && <Nav.Link as={Link} to="/user">{t('Your Collections')}</Nav.Link>}
          {isAuthenticated && isAdmin && <Nav.Link as={Link} to="/admin">{t('User Management')}</Nav.Link>}
        </Nav>
        <Form className="d-flex ml-auto" onSubmit={handleSearchSubmit}>
          <FormControl 
            type="text"
            placeholder={t('Search')}
            className="mr-sm-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" variant="outline-light" className="mr-2">{t('Search')}</Button>
        </Form>
        <Nav className="ml-auto">
          <Dropdown>
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
              {t('Language')}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => changeLanguage('en')}>English</Dropdown.Item>
              <Dropdown.Item onClick={() => changeLanguage('pl')}>Polski</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="outline-light" className="mr-2" onClick={toggleTheme}>
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
          {!isAuthenticated && <Button as={Link} to="/login" variant="outline-light" className="mr-2">{t('Login')}</Button>}
          {!isAuthenticated && <Button as={Link} to="/register" variant="outline-light" className="mr-2">{t('Register')}</Button>}
          {isAuthenticated && <Button onClick={handleLogout} variant="outline-light">{t('Logout')}</Button>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
