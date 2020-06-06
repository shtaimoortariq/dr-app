import React from 'react';

import './Header.css';
import logo from './../../../assets/img/Shasthoboi.svg';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { LogOut } from './../../../store/actions/auth';

const Header = (props) => {
  const History = useHistory();
  const dispatch = useDispatch();
  const Log_Out = () => {
    dispatch(LogOut());
    History.push('/login');
  };

  return (
    <header>
      <Navbar className="header-fixed" bg="dark" expand="lg" variant="dark" fixed="top">
        <Navbar.Brand>
          <Link to="/patient">
            <img src={logo} width="100" alt="" />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/patient">Patients</Link>
            <Link to="/enroll">Enroll patient</Link>
          </Nav>

          <NavDropdown title={<FontAwesomeIcon icon={faCog} />} id="basic-nav-dropdown">
            <div className="dropDown--item" href="#">
              <Link to="/profile"> <FontAwesomeIcon icon={faUser} /> View Profile</Link>
            </div>

            <div tabIndex="-1" className="dropdown-divider"></div>

            <NavDropdown.Item onClick={Log_Out}>
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
              <div>Logout</div>
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
