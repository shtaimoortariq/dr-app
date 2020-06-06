import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'


const HealthImaging = (props) => {
  const initialState = {
    imaging: '',
    isLoading: false,
    errorMessage: null,
    success: false
  }


  useEffect(() => {
    setData({
      ...data,
      imaging: props.setHealthImagingInformation ? props.setHealthImagingInformation.imaging : ''
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
    props.healthImagingInformation({
      imaging: data.imaging,

    })
  }

  const goBackPage = val => {
    props.goBack()
  }

  return (
    <div className="healthimaging">
      <fieldset>
        <h2>Health Record ( Imaging )</h2>
        <p className="desc">Imaging inFormation</p>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="med">Imaging</Form.Label>
            <Form.Control
              as="textarea"
              required
              onChange={handleInputChange}
              name='imaging'
              value={data.imaging}
              rows="4"
              placeholder="Note about your Imaging inFormation eg."
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

export default HealthImaging;
