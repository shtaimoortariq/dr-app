import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Container, Row, Button } from 'react-bootstrap';
import { signup } from './../../../store/actions/auth';
import { useHistory } from 'react-router-dom';
import Validation from '../Validtae/Validation'
import Notification from '../shared/Notification/Notification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

import './signUp.scss';

const SignUp = () => {
  const initialState = {
    firstName: '',
    lastName: '',
    mobile: '',
    isLoading: false,
    errorMessage: { message: 'test' },
    success: false,
    validated: false,
    isSubmit:false,
  };

  const [data, setData] = useState(initialState);

  const handeleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const history = useHistory();
  useSelector((state) => {
    if (state && state.auth.signup.data && data.isSubmit) {
     debugger
      setData({
        ...data,
        isSubmit:false
      })
      Notification(
        'success',
        'Congratulations!',
        'Welcome to doctor board, now you can login successfully!'
      )
      history.push('/login');
    }
  });

  const errorMessage = useSelector((state) => state.auth.signup.error);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (data.firstName && data.lastName && data.mobile && data.address) {
      setData({
        ...data,
        isLoading: true,
        errorMessage: null,
        validated: false,
        isSubmit:true
      });
      dispatch(signup({ firstName: data.firstName, lastName: data.lastName, mobile: data.mobile, address: data.address }));
    } else {
      setData({
        ...data,
        validated: true
      });
    }

  };

  return (
    <div className="SignUp">
      <Container className="container-height">
        <Row>
          
          <div className="col-md-6 sign-up-col-6">
            <div className="middle">
              <h3 className="pb-3">Get your স্বাস্থ্যবই account</h3>
            </div>
            {errorMessage ? (
            <div className="alert alert-danger input100 alert-dismissible  show">
              <h4 className="alert-heading">
              <FontAwesomeIcon icon={faExclamationTriangle} /> Error!
              </h4>
              <p>{errorMessage && errorMessage.message ? errorMessage.message : 'signup Failed'}</p>
              <button type="button" className="close" data-dismiss="alert">
                &times;
              </button>
            </div>
          ) : (
              <div></div>
            )}
            <Form noValidate validated={data.validated} onSubmit={handleSubmit} >
              <Form.Group controlId="validationCustom01">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  name="firstName"
                  type="text"
                  onChange={handeleInputChange}
                />
                <Validation errMsg="First name is empty" />
              </Form.Group>

              <Form.Group controlId="validationCustom02">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  name="lastName"
                  type="text"
                  onChange={handeleInputChange}
                />
                <Validation errMsg="Last name is empty" />
              </Form.Group>

              <Form.Group controlId="validationCustom03">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  required
                  name="mobile"
                  type="number"
                  onChange={handeleInputChange}
                />
                <Validation errMsg="Mobile field is empty" />
              </Form.Group>

              <Form.Group controlId="validationCustom04">
                <Form.Label>address</Form.Label>
                <Form.Control
                  required
                  name="address"
                  as="textarea"
                  rows="3"
                  onChange={handeleInputChange}
                />
                <Validation errMsg="Address field is empty" />
              </Form.Group>

              <div className="signUpBtn">
                <Button type="submit"
                  // disabled={!data.firstName && !data.lastName && !data.mobile && !data.address}
                  className="btn btn-primary w-100">
                  Sign up
                </Button>
              </div>

              <div className="registerLink">
                <span>Have an account?</span> <Link to="/Login" >Login</Link>
              </div>
            </Form>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
