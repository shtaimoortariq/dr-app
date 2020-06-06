import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'

const HealthTreatments = props => {
  const initialState = {
    active: '',
    past: '',
    repeat_prescription: '',
    change_of_drug: '',
    other: '',
    isLoading: false,
    errorMessage: null,
    success: false
  }

  useEffect(() => {
    setData({
      ...data,
      active: props.setHealthTreatmentsInformation ? props.setHealthTreatmentsInformation.active : '',
      past: props.setHealthTreatmentsInformation ? props.setHealthTreatmentsInformation.past : '',
      repeat_prescription: props.setHealthTreatmentsInformation ? props.setHealthTreatmentsInformation.repeat_prescription : '',
      change_of_drug: props.setHealthTreatmentsInformation ? props.setHealthTreatmentsInformation.change_of_drug : '',
      other: props.setHealthTreatmentsInformation ? props.setHealthTreatmentsInformation.other : ''
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
    props.healthTreatmentsInformation({
      active: data.active,
      past: data.past,
      repeat_prescription: data.repeat_prescription,
      change_of_drug: data.change_of_drug,
      other: data.other
    })
  }

  const goBackPage = val => {
    props.goBack()
  }

  return (
    <div className="healthTreatment">
      <fieldset>
        <h2>Health Record ( Active and Discontinued Treatments )</h2>
        <p className='desc'>Tell us about your active or past treatments</p>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className='fieldset-content'>
            <Form.Group>
              <Form.Label htmlFor='active'>Active</Form.Label>
              <Form.Control
                as='textarea'
                required
                onChange={handleInputChange}
                name='active'
                value={data.active}
                rows='4'
                placeholder='Note about your Active treatment eg.'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor='med'>Past</Form.Label>
              <Form.Control
                as='textarea'
                required
                onChange={handleInputChange}
                name='past'
                value={data.past}
                rows='4'
                placeholder='Note about Past treatment eg.'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor='ssn'>Repeat prescription</Form.Label>
              <Form.Control
                as='textarea'
                required
                onChange={handleInputChange}
                name='repeat_prescription'
                value={data.repeat_prescription}
                rows='4'
                placeholder='Note about your Repeat prescription eg.'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor='ssn'>Recent Change of Drugs</Form.Label>
              <Form.Control
                as='textarea'
                required
                onChange={handleInputChange}
                name='change_of_drug'
                value={data.change_of_drug}
                rows='4'
                placeholder='Note about your Recent Change of Drugs eg.'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor='ssn'>Other</Form.Label>
              <Form.Control
                as='textarea'
                required
                onChange={handleInputChange}
                name='other'
                value={data.other}
                rows='4'
                placeholder='Note about your Other health conditions eg.'
              />
            </Form.Group>
          </div>
          <div className='navigation-btn'>
            <Button onClick={goBackPage}>Previous</Button>
            <Button type='submit'>Next</Button>
          </div>
        </Form>
      </fieldset>
    </div>
  )
}

export default HealthTreatments
