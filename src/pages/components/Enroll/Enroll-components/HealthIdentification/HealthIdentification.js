import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';


import { Form, DropdownButton, Button } from 'react-bootstrap';

const HealthIdentification = (props) => {
  const initialState = {
    age: '',
    sex: '',
    isLoading: false,
    errorMessage: null,
    success: false,
  };

  const [data, setData] = useState(initialState);

  useEffect(() => {
    // debugger
    setData({
      ...data,
      age: props.setHealthIdentificationInformation
        ? props.setHealthIdentificationInformation.age
        : '',
      sex: props.setHealthIdentificationInformation
        ? props.setHealthIdentificationInformation.sex
        : '',
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.healthIdentificationInformation({
      age: data.age,
      sex: data.sex,
    });
  };

  const handleOnChange = (event, name) => {
    setData({
      ...data,
      [name]: event.target.value,
    });
  };

  const goBackPage = (val) => {
    props.goBack();
  };


  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className="healthIdentification">
      <fieldset>
        <h2> Health Record(Identification) </h2> <p className="desc"> About you </p>
        <div className="fieldset-content">
          <div className="Form-date">
            <Form.Label htmlFor="birth_date" className="Form-Form.Label">
              Age
            </Form.Label>
            <Form.Control
              type='text'
              name='age'
              value={data.age}
              onChange={handleInputChange}
            />
            {/* <div className="Form-date-group">
              <div className="Form-date-item">
                <DatePicker
                  value={data.date ? moment(data.date, 'YYYY-MM-  ') : ''}
                  onChange={onChange}
                  className="w-100 date-picker"
                />
              </div>
            </div> */}
          </div>
          <div className="Form-group">
            <Form.Label htmlFor="mobile" className="Form-Form.Label">
              Sex
            </Form.Label>
            <div className="Form-holder">
              <select
                style={{
                  fontFamily: 'inherit', fontSize: '1rem',
                  fontWeight: '400'
                }}
                className="browser-default custom-select"
                value={data.sex}
                onChange={(e) => {
                  handleOnChange(e, 'sex');
                }}
              >
                <option disabled selected value="">
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <i className="zmdi zmdi-caret-down"> </i>
            </div>
          </div>
          <div className="navigation-btn">
            <Button onClick={goBackPage}>Previous</Button>
            <Button onClick={handleSubmit}>Next</Button>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default HealthIdentification;
