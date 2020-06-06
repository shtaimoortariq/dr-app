import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Spin } from 'antd';

const HealthFamilyDoctor = (props) => {
  const initialState = {
    family_doctor: '',
    isLoading: false,
    errorMessage: null,
    success: false,
  };

  useEffect(() => {
    setData({
      ...data,
      family_doctor: props.setFamilyDoctorInformation
        ? props.setFamilyDoctorInformation.family_doctor
        : '',
      isLoading: props.loader,
    });
  }, [props]);

  const [data, setData] = React.useState(initialState);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    props.familyDoctorInformation({
      family_doctor: data.family_doctor,
    });
  };

  const goBackPage = (val) => {
    props.goBack();
  };

  return (
    <div className="familyDoc">
      <fieldset>
        <h2>Health Record ( Family Doctor )</h2>
        <p className="desc">Who is your Family Doctor</p>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="med">Family Doctor</Form.Label>
            <Form.Control
              as="textarea"
              required
              onChange={handleInputChange}
              name="family_doctor"
              value={data.family_doctor}
              rows="4"
              placeholder="Note about your Family Doctor eg.."
            />
          </Form.Group>
          <div className="navigation-btn">
            <Button onClick={props.goBack}>Previous</Button>
            <Spin spinning={data.isLoading}>
              <Button type="submit">Submit</Button>
            </Spin>
          </div>
        </Form>
      </fieldset>
    </div>
  );
};

export default HealthFamilyDoctor;
