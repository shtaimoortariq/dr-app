import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'

const HealthRiskFactors = props => {
  const initialState = {
    family_history: '',
    lifestyle: '',
    isLoading: false,
    errorMessage: null,
    success: false
  }

  useEffect(() => {
    setData({
      ...data,
      family_history: props.setHealthRiskFactorsInformation ? props.setHealthRiskFactorsInformation.family_history : '',
      lifestyle: props.setHealthRiskFactorsInformation ? props.setHealthRiskFactorsInformation.lifestyle : ''
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
    props.healthRiskFactorsInformation({
      family_history: data.family_history,
      lifestyle: data.lifestyle
    })
  }

  const goBackPage = val => {
    props.goBack()
  }

  return (
    <div className="healthRisk">
      <fieldset>
        <h2>Health Record ( Risk Factors )</h2>
        <p className='desc'>Set up your money limit to reach the future plan</p>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className='fieldset-content'>
            <div className='form-group'>
              <Form.Label htmlFor='food'>Family history</Form.Label>
              <Form.Control
                as='textarea'
                required
                onChange={handleInputChange}
                name='family_history'
                value={data.family_history}
                rows='4'
                placeholder='Note about your Family history eg.'
              />
            </div>
            <div className='form-group'>
              <Form.Label htmlFor='med'>Lifestyle</Form.Label>
              <Form.Control
                as='textarea'
                required
                onChange={handleInputChange}
                name='lifestyle'
                value={data.lifestyle}
                rows='4'
                placeholder='Note about your Lifestyle eg.'
              />
            </div>
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

export default HealthRiskFactors
