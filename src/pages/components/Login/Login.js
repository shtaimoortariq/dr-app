import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './../../../store/actions/auth';
import { Form, Button } from 'react-bootstrap';
import logo from './../../../assets/img/Shasthoboi.svg';
import { useHistory, Link } from 'react-router-dom';
import Validation from '../Validtae/Validation'
import './login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const initialState = {
    mobile: '',
    passcode: '',
    isLoading: false,
    errorMessage: null,
    success: false,
    validated: false
  };

  const [data, setData] = React.useState(initialState);

  const history = useHistory();

  useSelector((state) => {
    if (state && state.auth.login.data) {
      history.push('/patient');
    }
  });

  const errorMessage = useSelector((state) => state.auth.login.error);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (data.mobile && data.passcode) {
      setData({
        ...data,
        isLoading: true,
        errorMessage: null,
        validated: false
      });
      dispatch(login({ mobile: data.mobile, passcode: data.passcode }));
    } else {
      setData({
        ...data,
        validated: true
      })
    }

  };
  return (
    <>
      <div className="Login">
        <div className='logo'>
          <div className='logoBox'>
            <img src={logo} width="100" alt="" />
          </div>
        </div>
        <Form noValidate validated={data.validated} onSubmit={handleSubmit}>
          <span className='formTitle'>Login to your account</span>
          {errorMessage ? (
            <div className="alert alert-danger input100 alert-dismissible  show">
              <h4 className="alert-heading">
              <FontAwesomeIcon icon={faExclamationTriangle} /> Error!
              </h4>
              <p>{errorMessage && errorMessage.message ? errorMessage.message : 'Login Failed'}</p>
              <button type="button" className="close" data-dismiss="alert">
                &times;
              </button>
            </div>
          ) : (
              <div></div>
            )}
          <div className="loginForm">
            <Form.Group controlId="mobile">
              <label>Enter your mobile number eg. 0171100888</label>
              <Form.Control
                required
                type="text"
                name="mobile"
                onChange={handleInputChange}
                value={data.mobile}
              />
              <Validation errMsg="Mobile field is empty" />
            </Form.Group>

            <Form.Group controlId="passcode">
              <div className="pt-2">
                <label>Enter your access code (sent via SMS)</label>
              </div>
              <Form.Control
                required
                type="password"
                name="passcode"
                onChange={handleInputChange}
                value={data.passcode}
              />
              <Validation errMsg="Passcode filed is empty" />
            </Form.Group>

            <Form.Group className="my-4">
              <Form.Check type="checkbox" label="Keep me logged in for one week" name="remember-me" />
            </Form.Group>

            <div className="loingBtn">
              <Button
                className="btn btn-primary w-100"
                // disabled={!data.mobile && !data.passcode}
                onClick={handleSubmit}
              >
                {/* <Link to="/Health" style={{ color: '#ffff' }}> */}
                LogIn
              {/* </Link> */}
              </Button>
            </div>
            <div className="registerLink">
              <span>Don't have an account?</span> <Link to="/signup">Register</Link>
            </div>

          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
