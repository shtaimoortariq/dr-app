// import React from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {  notification } from 'antd';


export default (type,title,description) => {
  notification[type]({
    message: title,
    description:description,
    placement:'bottomRight',
    duration: 0
  })
}
