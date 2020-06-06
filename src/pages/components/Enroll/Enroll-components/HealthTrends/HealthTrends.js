import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'

const HealthTrends = props => {
  const initialState = {
    health_trends: '',
    isLoading: false,
    errorMessage: null,
    success: false
  }

  useEffect(() => {
    setData({
      ...data,
      health_trends: props.setHealthTrendsInformation ? props.setHealthTrendsInformation.health_trends : ''
    })
  }, [props])

  const [data, setData] = React.useState(initialState)

  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const [validated, setValidated] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    props.healthTrendsInformation({
      health_trends: data.health_trends,
    })
  }

  const goBackPage = val => {
    props.goBack()
  }

  return (
    <div className="healthTrends">
      <fieldset>
        <h2>Health Record ( Health Trends )</h2>
        <p className="desc">Do you have any habbits and change of health</p>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="active">Trends</Form.Label>
            <Form.Control
              as="textarea"
              required
              onChange={handleInputChange}
              name='health_trends'
              value={data.health_trends}
              rows="4"
              placeholder="Note about your habbits and change of health eg."
            />
          </Form.Group>
          <div className='navigation-btn'>
            <Button onClick={goBackPage}>Previous</Button>
            <Button type='submit'>Next</Button>
          </div>
        </Form>
      </fieldset>
    </div>
  );
};

export default HealthTrends;
