import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Form, Button } from 'react-bootstrap'
import Header from '../../layout/Header/Header'
import './profile.scss'
import { getUserProfile, updateCurrentUserProfile } from './../../../store/actions/user';
import Notification from '../shared/Notification/Notification';
import Validation from '../Validtae/Validation'

export const Profile = () => {

  const initialState = {
    firstname: '',
    lastname: '',
    mobile: '',
    address: '',
    isProfileLoading: false,
    isUpdating: false,
    validated: false
  }

  const [data, setData] = React.useState(initialState);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfile(JSON.parse(localStorage.getItem('PAU'))));
    setData({
      ...data,
      isProfileLoading: true
    })
  }, []);

  useSelector(state => {
    if (state && state.user.currentUser.data && data.isProfileLoading) {
      setData({
        ...data,
        firstname: state.user.currentUser.data.firstname,
        lastname: state.user.currentUser.data.lastname,
        mobile: state.user.currentUser.data.mobile,
        address: state.user.currentUser.data.address,
        isProfileLoading: false
      })
    }

    if (state && state.user.currentUser.error && data.isProfileLoading) {
      Notification(
        'error',
      'Error!',
       state.user.currentUser.error ?state.user.currentUser.error.message :'');
      setData({
        ...data,
        isProfileLoading: false
      })
    }

    if (state && state.user.currentUser.data && data.isUpdating) {
      Notification(
        'success',
      'Success!',
        'Profile Update Successfully');
      setData({
        ...data,
        isUpdating: false
      })
    }

    if (state && state.user.currentUser.error && data.isUpdating) {
      Notification(
        'error',
      'Error!',
       state.user.currentUser.error ? state.user.currentUser.error.message : '');
      setData({
        ...data,
        isUpdating: false
      })
    }
  })

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (data.firstname && data.lastname && data.mobile && data.address) {
      setData({
        ...data,
        isUpdating: true,
        validated: false
      });
      dispatch(updateCurrentUserProfile({ firstname: data.firstname, lastname: data.lastname, mobile: data.mobile, address: data.address, id: JSON.parse(localStorage.getItem('PAU')).id }));
    } else {
      setData({
        ...data,
        validated: true
      });
    }
  };

  return (
    <React.Fragment>
      <Header />
      <div className="profile">
        <Container className="container-height">
          <Form noValidate validated={data.validated} onSubmit={handleSubmit}>
            <div className='Form-row'>

              <Form.Group >
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='text'
                  required
                  name='firstname'
                  onChange={handleInputChange}
                  value={data.firstname}
                />
                <Validation errMsg="Fist Name is requried." />
              </Form.Group>

              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type='text'
                  name='lastname'
                  onChange={handleInputChange}
                  value={data.lastname}
                />
                <Validation errMsg="Last Name is requried." />
              </Form.Group>
            </div>
            <Form.Group >
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type='text'
                required
                name='mobile'
                onChange={handleInputChange}
                value={data.mobile}
              />
              <Validation errMsg="Phone number is requried." />
            </Form.Group>
            <Form.Group >
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                required
                name='address'
                onChange={handleInputChange}
                value={data.address}
              />
              <Validation errMsg="Address is requried." />
            </Form.Group>
            <div className="save-btn">
              <Button type="submit">Save</Button>
            </div>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Profile;
