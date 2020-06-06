import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

const HealthAllergy = (props) => {
  const initialState = {
    food: '',
    medicinal: '',
    sensitivity: '',
    isLoading: false,
    errorMessage: null,
    success: false,
  };

  useEffect(() => {
    setData({
      ...data,
      food: props.setHealthAllergyInformation ? props.setHealthAllergyInformation.food : '',
      medicinal: props.setHealthAllergyInformation
        ? props.setHealthAllergyInformation.medicinal
        : '',
      sensitivity: props.setHealthAllergyInformation
        ? props.setHealthAllergyInformation.sensitivity
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
    props.healthAllergyInformation({
      food: data.food,
      medicinal: data.medicinal,
      sensitivity: data.sensitivity,
    });
  };

  const goBackPage = (val) => {
    props.goBack();
  };

  return (
    <div className="healthAllergy">
      <fieldset>
        <h2> Health Record(allergy) </h2> <p className="desc"> Tell us about your allergy </p>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="fieldset-content">
            <Form.Group>
              <Form.Label htmlFor="food">Food</Form.Label>
              <Form.Control
                as="textarea"
                required
                onChange={handleInputChange}
                name="food"
                value={data.food}
                rows="4"
                placeholder="Note about your food allergy"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="med">Medicinal</Form.Label>
              <Form.Control
                as="textarea"
                required
                onChange={handleInputChange}
                name="medicinal"
                value={data.medicinal}
                rows="4"
                placeholder="Note about your food allergy"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="ssn">Sensitivity</Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                required
                onChange={handleInputChange}
                name="sensitivity"
                value={data.sensitivity}
                placeholder="Note about your food allergy"
              />
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

export default HealthAllergy;
