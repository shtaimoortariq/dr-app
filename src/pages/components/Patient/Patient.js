import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'antd';
import { getPatients } from './../../../store/actions/patient';
import { Link } from 'react-router-dom';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Notification from '../shared/Notification/Notification'

import Header from '../../layout/Header/Header';
import './paitent.scss';

const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstname',
    key: 'firstname',
    sorter: {
      compare: (a, b) => a.firstname.length - b.firstname.length,
    },
  },
  {
    title: 'Last Name',
    dataIndex: 'lastname',
    key: 'lastname',
    sorter: {
      compare: (a, b) => a.lastname.length - b.lastname.length,
    },
  },
  {
    title: 'Date of birth',
    dataIndex: 'dateofbirth',
    key: 'dateofbirth',
    sorter: {
      compare: (a, b) => new Date(a.dateofbirth) - new Date(b.dateofbirth),
    },
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },

  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
  },
  {
    title: 'Medical History',
    dataIndex: 'medicalAction',
    key: 'medicalActions'
  }
];


export const Patient = () => {
  const [val, setVal] = useState('');
  const [filterdata, setFilterdata] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatients());
  }, []);

   useSelector((state) => {
    if (
      state &&
      state.patient.patients.error !== null &&
      state.patient.patients.error !== undefined
    ) {
      Notification(
        'error',
        'Error!',
        state.patient.patients.error.message ? state.patient.patients.error.message : ''
      )
      // return state.patient.patients.error;
    }
  });

  const patientsData = useSelector(state => {
    if (state && state.patient && state.patient.patients.data) {
      let array = state.patient.patients.data;
      array.forEach((val, i) => {
        array[i]['countId'] = i + 1
      })
      return array
    }
  })

  const SearchFilter = (e) => {
    setVal(e.target.value)
    let value = e.target.value.toLowerCase()
    if (value) {
      let filterdHistory = paitents && paitents.filter(val => { 
        if( val.firstname.props.children.toLowerCase().indexOf(value) !== -1 || val.lastname.toLowerCase().indexOf(value) !== -1 ) return val
        });
      setFilterdata(filterdHistory)
    } else {
      setFilterdata(paitents)
    }
  }

  const paitents = useSelector((state) => {
    if (state && state.patient && state.patient.patients.data) {
      let dataSource = []
      let array = state.patient.patients.data ? state.patient.patients.data : [];
      if (array.length) {
        array.map((val, i) => {
          let obj = {
            key: i + 1,
            firstname: (<Link to={`/health/${val.id}`}>{val.firstname}</Link>),
            lastname: val.lastname,
            dateofbirth: val.date_of_birth,
            phone: val.mobile,
            actions: (
              <div className="table-action-btn">
                <Link to={`/update-patient/${val.id}`}><FontAwesomeIcon icon={faEdit} /></Link>
                <div> <FontAwesomeIcon icon={faTrash} /></div>
              </div>
            ),
            medicalAction: (
              <div>
                <Link to={`/history/${val.id}`}>View</Link> |
              <Link to={`/addPatientHistory/${val.id}`}> Add New</Link>
              </div>
            )
          }
          dataSource.push(obj)
        })
      }
      return dataSource
    }
  });

  const data = filterdata ? filterdata : paitents;


  return (
    <div className="Patient">
      <Header />
      <div className="container container-height">
        {/* {patientError ? (
          <div className="alert alert-warning input100 alert-dismissible  show">
            <h4 className="alert-heading">
              <FontAwesomeIcon icon={faExclamationTriangle} /> Warning!{' '}
            </h4>
            <p style={{ marginBottom: '0px' }}>
              {patientError ? patientError.message : 'matching records found'}
            </p>
            <button type="button" className="close pdg-set-2" data-dismiss="alert">
              &times;
            </button>
          </div>
        ) : (
            <div></div>
          )} */}
        <div className="pt-5">
          <div className="input">
            <Form.Control value={val} onChange={SearchFilter} type="text" placeholder="Search patient name" />
          </div>
          <Table
            columns={columns}
            dataSource={data ? data : []}
            size="middle" />
        </div>
      </div>
    </div>
  );
};

export default Patient;
