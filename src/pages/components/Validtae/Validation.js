import React from 'react'
import { Form } from 'react-bootstrap'

const Validation = ({ errMsg }) => {
    return <Form.Control.Feedback type="invalid">{errMsg}</Form.Control.Feedback>
}

export default Validation
