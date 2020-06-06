import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../../enroll.scss';

const BillingInfo = (props) => {
  const initialState = {
    payment_method: '',
    payment_status: '',
    isLoading: false,
    errorMessage: null,
    success: false,
  };

  useEffect(() => {
    setData({
      ...data,
      payment_method: props.setBillingInfo ? props.setBillingInfo.payment_method : '',
      payment_status: props.setBillingInfo ? props.setBillingInfo.payment_status : '',
    });
  }, [props]);

  const [data, setData] = useState(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.billingInformation({
      payment_method: data.payment_method,
      payment_status: data.payment_status,
    });
  };

  const handleOnChange = (event, name) => {
    setData({
      ...data,
      [name]: event.target.value,
    });
  };

  return (
    <div className="billing">
      <fieldset>
        <h2>Billing Information</h2>
        <p className="desc">Please enter your infomation and proceed to next step</p>
        <div className="fieldset-content">
          <div className="Form-group">
            <Form.Label htmlFor="mobile">Payment Method</Form.Label>
            <div className="Form-holder">
              <select
                style={{
                  fontFamily: 'inherit', fontSize: '1rem',
                  fontWeight: '400'
                }}
                className="browser-default custom-select"
                value={data.payment_method}
                onChange={(e) => {
                  handleOnChange(e, 'payment_method');
                }}
              >
                <option selected disabled value="">
                  select your payment method
                </option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="bkash">Bkash</option>
              </select>

              <i className="fas fa-sort-down"></i>
            </div>
          </div>
          <div className="Form-group">
            <Form.Label htmlFor="mobile">Payment Status</Form.Label>
            <div className="Form-holder">
              <select
                style={{
                  fontFamily: 'inherit', fontSize: '1rem',
                  fontWeight: '400'
                }}
                className="browser-default custom-select"
                value={data.payment_status}
                onChange={(e) => {
                  handleOnChange(e, 'payment_status');
                }}
              >
                <option selected disabled value="">
                  select your payment status
                </option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
              <i className="fas fa-sort-down"></i>
            </div>
          </div>
          <div className="navigation-btn">
            <Button onClick={handleSubmit}>Next</Button>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default BillingInfo;
