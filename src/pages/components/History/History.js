import React, { useEffect, useState } from 'react';

import './History.scss';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { getHistory } from './../../../store/actions/history';
import Header from '../../layout/Header/Header';
import { Table } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Notification from '../shared/Notification/Notification'



export const History = () => {

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      width: '10%',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      width: '10%',
      sorter: {
        compare: (a, b) => new Date(a.date) - new Date(b.date),
      },
    },
    {
      title: 'Remarks',
      dataIndex: 'report',
      width: '60%',
    },
    {
      title: 'File',
      width: '10%',
      render: (records) => (
        <a target="_blank" rel="noopener noreferrer" href={records.filepath}>
          Open Link
        </a>
      ),
    },
    {
      title: 'Action',
      width: '10%',
      dataIndex: 'actions',
      key: 'actions',
      // render: (records) => (
      //   <div className="table-action-btn">
      //     <div onClick={() =>this.editPatientHealth(records.id)}>
      //       <FontAwesomeIcon icon={faEdit} />
      //     </div>
      //     <FontAwesomeIcon icon={faTrash} />
      //   </div>
      // ),
    },
  ];

  const usehistory = useHistory();
  const dispatch = useDispatch();
  const [val, setVal] = useState('');
  const [filterdata, setFilterdata] = useState();
  let { historyId } = useParams();

  useEffect(() => {
    dispatch(getHistory({ id: historyId }));
  }, []);

  const history = useSelector((state) => {
    if (state && state.history.history.data) {
      let array = state.history.history.data;
      array.forEach((val, i) => {
        array[i]['countId'] = i + 1;
        array[i]['actions'] = (
          <div className="table-action-btn">
            <div onClick={() => editPatientHealth(val)}>
              <FontAwesomeIcon icon={faEdit} />
            </div>
            <div>
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        )
      })
      return array
    }
  });

  const editPatientHealth = val => {
    let obj = JSON.stringify({ type: val.type, date: val.date, report: val.report, filepath: val.filepath })
    localStorage.setItem('patientHistory', obj);
    usehistory.push(`/editPatientHistory/${historyId}/${val.id}`);
  }


  const SearchFilter = (e) => {
    setVal(e.target.value)
    let value = e.target.value.toLowerCase();
    if (value) {
      let filterdHistory = history && history.filter(val => val.report.toLowerCase().indexOf(value) !== -1);
      let filterHistory = history && history.filter(val => val.type.toLowerCase().indexOf(value) !== -1);
      let newArray = filterHistory && filterHistory.length && filterHistory.filter(o1 => !filterdHistory.some(o2 => o1.countId === o2.countId));
      if (newArray.length) {
        if (filterdHistory.length) newArray.push(filterdHistory);
      }
      else {
        newArray = filterdHistory;
      }
      setFilterdata(newArray);
    } else {
      setFilterdata(history);
    }
  }

  const data = filterdata ? filterdata : history;

  const historyError = useSelector((state) => {
    if (
      state &&
      state.history.history.error !== null &&
      state.history.history.error !== undefined
    ) {
      Notification(
        'error',
        'Error!',
        state.history.history.error.message ? state.history.history.error.message : ''
      )
      return state.history.history.error;
    }
  });

  const loading = (history !== null && history !== undefined) || historyError;
  return (
    <div className="History">
      <Header />
      <div className="container container-height">
        <div className="pt-5">
          <div className="input">
            <Form.Control value={val} onChange={SearchFilter} type="text" placeholder="Search" />
          </div>
          <Table loading={!loading} columns={columns} dataSource={data} size="middle" />
        </div>
      </div>
    </div>
  );
};

export default History;
