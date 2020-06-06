import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { Spin } from 'antd'
import { setPatientPersonalInfo } from './../../../../../store/actions/enroll'
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import './personalInfo.scss'
import moment from 'moment';
import Notification from '../../../shared/Notification/Notification';

const PersonalInfo = props => {
  const initialState = {
    firstname: '',
    lastname: '',
    mobile: '',
    address: '',
    dateofbirth: '',
    passcode: '',
    isLoading: false,
    errorMessage: null,
    success: false,
    isEdit:false,
  }

  const dispatch = useDispatch()

  const [data, setData] = React.useState(initialState)

  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  useSelector(state => {
    if (state && state.enroll.addPatientInfo.data && data.isLoading) {
      props.changeCurrentTabNumber(10)
      props.userInfo(state.enroll.addPatientInfo.data)
      props.changeTab('BillingInfo')
      setData({
        ...data,
        isLoading: false
      })
    }
    if (state && state.enroll.addPatientInfo.error && data.isLoading) {
      Notification('error','Error!', state.enroll.addPatientInfo.error ? state.enroll.addPatientInfo.error.message:'');
      setData({
        ...data,
        isLoading: false
      })
    }
  })

  useEffect(() => {
    setData({
      ...data,
      firstname: props.user_info && props.user_info.firstname ? props.user_info.firstname : '',
      lastname: props.user_info && props.user_info.lastname ? props.user_info.lastname : '',
      mobile: props.user_info && props.user_info.mobile ? props.user_info.mobile : '',
      address: props.user_info && props.user_info.address ? props.user_info.address : '',
      dateofbirth: props.user_info && props.user_info.date_of_birth ? new Date(props.user_info.date_of_birth) : '',
      isEdit : props.user_info ? true : false
    })
  }, [props])

  const [validated, setValidated] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    if (data.firstname && data.lastname && data.mobile && data.address && data.dateofbirth) {
      dispatch(
        setPatientPersonalInfo({
          firstname: data.firstname,
          lastname: data.lastname,
          mobile: data.mobile,
          address: data.address,
          dateofbirth: data.dateofbirth
        })
      )

      setData({
        ...data,
        isLoading: true
      })
    }
  }

  const onChange = (date, dateString) => {
    setData({
      ...data,
      dateofbirth: dateString,
    });
  };

  return (
    <div className='personal-info'>
      <fieldset>
        <h2>Personal Information</h2>
        <p className='desc'>
          Please enter your infomation and proceed to next step so we can build
          your account
        </p>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className='fieldset-content'>
            <div className='Form-row'>
              <Form.Label>First Name</Form.Label>
              <Form.Group >
                <Form.Control
                  type='text'
                  required
                  onChange={handleInputChange}
                  name='firstname'
                  value={data.firstname}
                  disabled={data.isEdit}


                />
                <Form.Control.Feedback type='invalid'>
                  Fist Name is requried.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Group >
                <Form.Control
                  required
                  type='text'
                  name='lastname'
                  value={data.lastname}
                  onChange={handleInputChange}
                  disabled={data.isEdit}

                />
                <Form.Control.Feedback type='invalid'>
                  Last Name is requried.
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <Form.Group >
              <Form.Label htmlFor='mobile'>Mobile</Form.Label>
              <Form.Control
                required
                type='text'
                name='mobile'
                value={data.mobile}
                onChange={handleInputChange}
                disabled={data.isEdit}
              />
              <Form.Control.Feedback type='invalid'>
                Mobile number is requried.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group >
              <Form.Label htmlFor='mobile'>Address</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows="3"
                name='address'
                value={data.address}
                onChange={handleInputChange}
                disabled={data.isEdit}

              />
              <Form.Control.Feedback type='invalid'>
                Address is requried.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group >
              <Form.Label htmlFor='mobile'>Date Of Birth</Form.Label>
              <DatePicker
                value={data.dateofbirth ? moment(data.dateofbirth, 'YYYY-MM-DD') : ''}
                onChange={onChange}
                className={validated && !data.dateofbirth ? ' invalid-date-picker' : 'date-picker'}
                disabled={data.isEdit}
              />
              {
                validated && !data.dateofbirth ?
                  <div>
                    <p className="invalid-date">Date is required</p>
                  </div>
                  :
                  <div></div>
              }
            </Form.Group>
          </div>
          <div className='navigation-btn'>
            <Button>Previous</Button>
            <Spin spinning={data.isLoading}>
              <Button type="submit">
                Next
              </Button>
            </Spin>
          </div>
        </Form>
      </fieldset>
    </div>
  )
}

export default PersonalInfo
