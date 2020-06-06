import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const HealthDiseases = (props) => {
  const initialState = {
    active: '',
    past: '',
    event: '',
    deformity: '',
    isLoading: false,
    errorMessage: null,
    success: false,
  };

  useEffect(() => {
    setData({
      ...data,
      active: props.setHealthDiseasesInformation ? props.setHealthDiseasesInformation.active : '',
      past: props.setHealthDiseasesInformation ? props.setHealthDiseasesInformation.past : '',
      event: props.setHealthDiseasesInformation ? props.setHealthDiseasesInformation.event : '',
      deformity: props.setHealthDiseasesInformation
        ? props.setHealthDiseasesInformation.deformity
        : '',
    });
  }, [props]);

  // const dispatch = useDispatch()

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
    props.healthDiseasesInformation({
      active: data.active,
      past: data.past,
      event: data.event,
      deformity: data.deformity,
    });
  };

  const goBackPage = (val) => {
    props.goBack();
  };

  return (
    <div className="disease">
      <fieldset>
        <h2> Health Record(Active and Past Diseases) </h2>
        <p className="desc"> Do you have any active or past disease ? </p>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="fieldset-content">
            <Form.Group>
              <Form.Label htmlFor="active">Active</Form.Label>
              <Form.Control
                as="textarea"
                required
                onChange={handleInputChange}
                name="active"
                value={data.active}
                rows="4"
                placeholder="Note about your Active disease eg."
              />
              <Form.Control.Feedback type="invalid">Active is requried.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="med">Past</Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                required
                onChange={handleInputChange}
                name="past"
                value={data.past}
                placeholder="Note about Past disease eg."
              />
              <Form.Control.Feedback type="invalid">Past is requried.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="ssn">Events</Form.Label>
              <Form.Control
                as="textarea"
                required
                onChange={handleInputChange}
                name="event"
                value={data.event}
                rows="4"
                placeholder="Note about your Events eg."
              />
              <Form.Control.Feedback type="invalid">Events is requried.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="ssn">DeFormity</Form.Label>
              <Form.Control
                as="textarea"
                required
                onChange={handleInputChange}
                name="deformity"
                value={data.deformity}
                rows="4"
                placeholder="Note about your Deformity eg."
              />
              <Form.Control.Feedback type="invalid">DeFormity is requried.</Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="navigation-btn">
            <Button onClick={goBackPage}>Previous</Button>
            <Button type="submit">Next</Button>
          </div>
        </Form>
      </fieldset>
    </div>
  );
};

export default HealthDiseases;
