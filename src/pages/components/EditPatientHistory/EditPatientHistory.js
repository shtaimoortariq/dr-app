import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Container, Row, Col, Button } from 'react-bootstrap'
import Header from '../../layout/Header/Header'
import { useHistory, useParams } from 'react-router-dom'
import './editPatientHistory.scss'
import {
  uploadPatientHistory, addPatientHistory
} from './../../../store/actions/history'
import Notification from '../shared/Notification/Notification'
import 'antd/dist/antd.css';
import Validation from '../Validtae/Validation'

const EditPatientHistory = props => {
  const initialState = {
    type: '',
    report: '',
    file: null,
    documentId: '',
    isFileUploading: false,
    isLoading: false,
    errorMessage: null,
    previousPath: '',
    isEditPatient: false,
    validated: false
  }

  const history = useHistory()

  const dispatch = useDispatch()

  let { editPatientId } = useParams();

  let { patientId } = useParams();


  const [state, setState] = React.useState(initialState)

  const handleInputChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  useSelector(stateValue => {
    let patientHistory = JSON.parse(localStorage.getItem('patientHistory'));

    if (patientHistory && editPatientId && !state.isEditPatient) {
      let obj = { name: patientHistory.filepath }
      setState({
        ...state,
        isEditPatient: true,
        type: patientHistory.type,
        report: patientHistory.report,
        file: obj
      })
    }

    if (stateValue && stateValue.history.uploadHistory.data && state.isLoading) {
      setState(initialState)
      history.goBack()
    }

    if (stateValue && stateValue.history.addHistory.data && state.isLoading) {
      setState(initialState)
      history.goBack()
    }

    if (
      stateValue &&
      stateValue.history.uploadHistory.error &&
      state.isLoading
    ) {
      
      Notification(
        'error',
        'Error!',
        stateValue.history.uploadHistory.error ? stateValue.history.uploadHistory.error.message : '' 
      )
      setState({
        ...state,
        isLoading: false
      })
    }

    if (stateValue && stateValue.history.addHistory.error && state.isLoading) {
      setState({
        ...state,
        isLoading: false
      })
      Notification(
        'error',
        'Error!',
        stateValue.history.addHistory && stateValue.history.addHistory.error ? stateValue.history.addHistory.error.message : 'Error ocured'
      )
    }
  })


  const handleFileChnage = event => {
    setState({
      ...state,
      file: event.target.files[0]
    })
  }

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    if (!state.isFileUploading && state.type && state.report && state.file) {
      setState({
        ...state,
        isLoading: true,
      })
      if (editPatientId && state.isEditPatient) {
        updatePatientHistory();
      } else {
        addNewPatientHistory();
      }
    } else {
      setState({
        ...state,
        validated: true
      })
    }
  }

  const addNewPatientHistory = () => {
    var formData = new FormData();
    formData.append('file', state.file);
    formData.append('type', state.type);
    formData.append('report', state.report);
    formData.append('id', JSON.parse(localStorage.getItem('PAU')).id)
    dispatch(addPatientHistory(formData,patientId));
  }

  const updatePatientHistory = () => {
    var formData = new FormData();
    formData.append('file', state.file);
    formData.append('type', state.type);
    formData.append('document_id', editPatientId);
    formData.append('report', state.report);
    formData.append('id', JSON.parse(localStorage.getItem('PAU')).id)
    dispatch(uploadPatientHistory(formData,patientId,editPatientId));
    localStorage.removeItem('patientHistory');
  }

  const guid = () => {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }
    return (
      s4() +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      '-' +
      s4() +
      s4() +
      s4()
    )
  }

  return (
    <React.Fragment>
      <Header />
      <div className='editPatientHistory'>
        <Container className="container-height">
          <Row>
            <Col md={10} className='mx-auto'>

              <Form noValidate validated={state.validated} onSubmit={handleSubmit}>
                <h2>Patient History</h2>
                <div className='fieldset-content'>
                  <Form.Group controlId="type">
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      required
                      type='text'
                      name='type'
                      onChange={handleInputChange}
                      value={state.type}
                    />
                    <Validation errMsg="Type filed is empty" />
                  </Form.Group>

                  <Form.Group controlId="report">
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control
                      required
                      as='textarea'
                      rows='4'
                      name='report'
                      onChange={handleInputChange}
                      value={state.report}
                    />
                    <Validation errMsg="Remarks filed is empty" />
                  </Form.Group>
                  <Form.Group controlId="file">
                    <Form.Label>File</Form.Label>
                    <Form.File
                      required
                      id="custom-file"
                      name="file"
                      label={state.file ? state.file.name : ''}
                      onChange={handleFileChnage}
                      custom
                    />
                    <Validation errMsg="File is empty" />
                  </Form.Group>
                </div>
                <Button type='submit'>Submit</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default EditPatientHistory
